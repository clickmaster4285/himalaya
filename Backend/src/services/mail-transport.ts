import nodemailer from "nodemailer";
import {
  getGmailAccessToken,
  getGmailOAuthUser,
  isGmailOAuthConfigured,
} from "./gmail-oauth";

export type MailTransportMethod = "gmail-oauth" | "smtp-gmail" | "smtp";

function smtpPasswordCandidates(raw: string) {
  const trimmed = raw.trim();
  const noSpaces = trimmed.replace(/\s+/g, "");
  return [...new Set([noSpaces, trimmed].filter(Boolean))];
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

export async function createVerifiedTransporter(): Promise<{
  transporter: nodemailer.Transporter;
  method: MailTransportMethod;
  fromUser: string;
}> {
  if (isGmailOAuthConfigured()) {
    const user = getGmailOAuthUser();
    const accessToken = await getGmailAccessToken();
    const transporter = nodemailer.createTransport({
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
    await transporter.verify();
    return { transporter, method: "gmail-oauth", fromUser: user };
  }

  const user = process.env.SMTP_USER?.trim();
  const passRaw = process.env.SMTP_PASS ?? "";
  if (!user || !passRaw.trim()) {
    throw new Error("SMTP_NOT_CONFIGURED — set SMTP_USER and SMTP_PASS in backend/.env");
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const passwords = smtpPasswordCandidates(passRaw);

  const transportConfigs: Array<{ method: MailTransportMethod; options: nodemailer.TransportOptions }> = [];

  if (host === "smtp.gmail.com" || user.endsWith("@gmail.com")) {
    for (const pass of passwords) {
      transportConfigs.push({
        method: "smtp-gmail",
        options: { service: "gmail", auth: { user, pass } } as nodemailer.TransportOptions,
      });
    }
  }

  for (const pass of passwords) {
    transportConfigs.push({
      method: "smtp",
      options: {
        host,
        port,
        secure: port === 465,
        requireTLS: port === 587,
        auth: { user, pass },
      } as nodemailer.TransportOptions,
    });
  }

  let lastError: Error | null = null;
  for (const { method, options } of transportConfigs) {
    try {
      const transporter = nodemailer.createTransport(options);
      await transporter.verify();
      return { transporter, method, fromUser: user };
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  throw lastError ?? new Error("SMTP authentication failed");
}

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendMailMessage(input: SendMailInput): Promise<MailTransportMethod> {
  const { transporter, method, fromUser } = await createVerifiedTransporter();
  const fromName = getMailFromName();
  const fromEmail = getMailFromAddress() || fromUser;

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: input.to,
    replyTo: input.replyTo ?? fromEmail,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  return method;
}
