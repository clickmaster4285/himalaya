export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wrapEmailHtml(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f0ea;font-family:Georgia,'Times New Roman',serif;color:#2c2419;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f0ea;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(44,36,25,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a3d2e 0%,#2d5a45 100%);padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:#c9b896;">Himalaya Villas</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:normal;color:#ffffff;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-size:16px;line-height:1.65;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #ebe6df;font-size:13px;color:#6b5d4f;line-height:1.5;">
              <strong>Himalaya Villas</strong> · Bhurban, Murree Hills, Pakistan<br />
              Questions? Reply to this email or contact us at
              <a href="mailto:himalayavillas@gmail.com" style="color:#1a3d2e;">himalayavillas@gmail.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
