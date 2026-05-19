import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import {
  getGmailAccessToken,
  getGmailOAuthUser,
  isGmailOAuthConfigured,
} from "./gmail-oauth";

export type MailTransportMethod = "gmail-oauth" | "smtp-gmail" | "smtp";

type CachedTransport = {
  transporter: nodemailer.Transporter;
  method: MailTransportMethod;
  fromUser: string;
};

let transportPromise: Promise<CachedTransport> | null = null;

function smtpPassword(raw: string) {
  return raw.trim().replace(/\s+/g, "");
}

export function getMailFromAddress(): string {
  return (
    process.env.SMTP_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "himalayavillas@gmail.com"
  );
}

export function getMailFromName(): string {
  return process.env.SMTP_FROM_NAME?.trim() || "Himalaya Villas";
}

/** Build transporter once per process — no verify() on every send (that doubled latency). */
async function createTransporter(): Promise<CachedTransport> {
  if (isGmailOAuthConfigured()) {
    const user = getGmailOAuthUser();
    const accessToken = await getGmailAccessToken();
    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 2,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId: process.env.GMAIL_CLIENT_ID!.trim(),
        clientSecret: process.env.GMAIL_CLIENT_SECRET!.trim(),
        refreshToken: process.env.GMAIL_REFRESH_TOKEN!.trim(),
        accessToken,
      },
    });
    return { transporter, method: "gmail-oauth", fromUser: user };
  }

  const user = process.env.SMTP_USER?.trim();
  const pass = smtpPassword(process.env.SMTP_PASS ?? "");
  if (!user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED — set SMTP_USER and SMTP_PASS in .env.local");
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const useGmailService = host === "smtp.gmail.com" || user.endsWith("@gmail.com");

  const transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 2,
    ...(useGmailService
      ? { service: "gmail" as const, auth: { user, pass } }
      : {
          host,
          port,
          secure: port === 465,
          requireTLS: port === 587,
          auth: { user, pass },
        }),
  });

  return {
    transporter,
    method: useGmailService ? "smtp-gmail" : "smtp",
    fromUser: user,
  };
}

export async function getMailTransporter(): Promise<CachedTransport> {
  if (!transportPromise) {
    transportPromise = createTransporter().catch((err) => {
      transportPromise = null;
      throw err;
    });
  }
  return transportPromise;
}

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendMailMessage(input: SendMailInput): Promise<MailTransportMethod> {
  const { transporter, method, fromUser } = await getMailTransporter();
  const fromName = getMailFromName();
  const fromEmail = getMailFromAddress() || fromUser;

  const message: Mail.Options = {
    from: `"${fromName}" <${fromEmail}>`,
    to: input.to,
    replyTo: input.replyTo ?? fromEmail,
    subject: input.subject,
    text: input.text,
    html: input.html,
  };

  await transporter.sendMail(message);
  return method;
}
