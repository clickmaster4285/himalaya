require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const nodemailer = require("nodemailer");

const user = (process.env.SMTP_USER || process.env.GMAIL_USER || "").trim();
const pass = (process.env.SMTP_PASS || "").trim();
const to = (process.env.INQUIRY_TO_EMAIL || user).trim();
const hasOAuth =
  process.env.GMAIL_CLIENT_ID?.trim() &&
  process.env.GMAIL_CLIENT_SECRET?.trim() &&
  process.env.GMAIL_REFRESH_TOKEN?.trim();

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID.trim(),
      client_secret: process.env.GMAIL_CLIENT_SECRET.trim(),
      refresh_token: process.env.GMAIL_REFRESH_TOKEN.trim(),
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "OAuth failed");
  }
  return data.access_token;
}

async function testOAuth() {
  const accessToken = await getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId: process.env.GMAIL_CLIENT_ID.trim(),
      clientSecret: process.env.GMAIL_CLIENT_SECRET.trim(),
      refreshToken: process.env.GMAIL_REFRESH_TOKEN.trim(),
      accessToken,
    },
  });
  await transport.verify();
  const info = await transport.sendMail({
    from: `"Himalaya Villas" <${user}>`,
    to,
    subject: "SMTP test (OAuth2) — Himalaya Villas",
    text: "If you received this, inquiry emails will work.",
  });
  console.log("SUCCESS (Gmail OAuth2) — email sent to", to);
  console.log("Message ID:", info.messageId);
}

async function testAppPassword() {
  if (!user || !pass) {
    throw new Error("Missing SMTP_USER or SMTP_PASS");
  }
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
  await transport.verify();
  const info = await transport.sendMail({
    from: `"Himalaya Villas" <${user}>`,
    to,
    subject: "SMTP test (App Password) — Himalaya Villas",
    text: "If you received this, inquiry emails will work.",
  });
  console.log("SUCCESS (App Password) — email sent to", to);
  console.log("Message ID:", info.messageId);
}

(async () => {
  if (hasOAuth) {
    try {
      await testOAuth();
      return;
    } catch (e) {
      console.error("OAuth failed:", e.message);
      if (!pass) process.exit(1);
      console.log("Trying App Password...\n");
    }
  }

  try {
    await testAppPassword();
  } catch (err) {
    console.error("FAILED — Gmail rejected login");
    console.error(err.message);
    if (String(err.message).includes("535")) {
      console.error("\nApp Password is NOT working for this Google account.");
      console.error("Use Gmail OAuth2 instead (one-time setup):");
      console.error("  1. Add GMAIL_CLIENT_ID + GMAIL_CLIENT_SECRET to Backend/.env");
      console.error("  2. Run: npm run gmail:setup");
      console.error("  3. Add GMAIL_REFRESH_TOKEN to Backend/.env");
      console.error("  4. Run: npm run test:smtp");
    }
    process.exit(1);
  }
})();
