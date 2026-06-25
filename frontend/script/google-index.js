const { google } = require("googleapis");
const path = require("path");

const KEY_FILE = path.join(__dirname, "service-account.json");

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

async function indexURL(url) {
  const client = await auth.getClient();

  const indexing = google.indexing({
    version: "v3",
    auth: client,
  });

  const response = await indexing.urlNotifications.publish({
    requestBody: {
      url: url,
      type: "URL_UPDATED",
    },
  });

  console.log(response.data);
}

indexURL("https://himalayavillas.com/");