/**
 * One-time Gmail OAuth2 setup (when App Password keeps failing with 535).
 *
 * Before running:
 * 1. https://console.cloud.google.com → New project
 * 2. APIs & Services → Enable "Gmail API"
 * 3. OAuth consent screen → External → add your Gmail as Test user
 * 4. Credentials → Create OAuth client ID → Desktop app
 * 5. Add to frontend/.env.local:
 *    GMAIL_CLIENT_ID=....apps.googleusercontent.com
 *    GMAIL_CLIENT_SECRET=....
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });
const http = require("http");
const { exec } = require("child_process");

const clientId = process.env.GMAIL_CLIENT_ID?.trim();
const clientSecret = process.env.GMAIL_CLIENT_SECRET?.trim();
const redirectUri = "http://localhost:3333/oauth2callback";
const scope = "https://mail.google.com/";

if (!clientId || !clientSecret) {
  console.error("Add GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET to frontend/.env.local first.");
  console.error("Create them at: https://console.cloud.google.com/apis/credentials");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "consent",
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const url = new URL(req.url, "http://localhost:3333");
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");

  if (err || !code) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h1>Failed</h1><p>${err || "No code"}</p>`);
    server.close();
    process.exit(1);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.refresh_token) {
      throw new Error(tokens.error_description || tokens.error || "No refresh_token");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Success</h1><p>Check the terminal for GMAIL_REFRESH_TOKEN. You can close this tab.</p>");

    console.log("\n=== Add this line to frontend/.env.local ===\n");
    console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("\nAlso set (if missing):");
    console.log(`SMTP_USER=himalayavillas@gmail.com`);
    console.log("\nThen run: npm run test:smtp\n");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h1>Error</h1><pre>${e.message}</pre>`);
    console.error(e.message);
  }

  server.close();
  process.exit(0);
});

server.listen(3333, () => {
  console.log("\n1. Opening browser — sign in as himalayavillas@gmail.com");
  console.log("2. Allow access to Gmail");
  console.log("\nIf browser does not open, visit:\n");
  console.log(authUrl);
  console.log("\nWaiting for callback on http://localhost:3333 ...\n");

  const cmd =
    process.platform === "win32"
      ? `start "" "${authUrl}"`
      : process.platform === "darwin"
        ? `open "${authUrl}"`
        : `xdg-open "${authUrl}"`;
  exec(cmd, () => {});
});
