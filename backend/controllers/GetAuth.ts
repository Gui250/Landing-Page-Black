import { google } from "../node_modules/googleapis/build/src/index";
import type { Request, Response } from "express";
class GetAuthGoogleSheets {
  async getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
      keyfile: "credentials.json",
      scope: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const spreadsheetId = "1XpZ1LZG8AD14aT2F7KVdsOGrUU7gJ6iqaKpcL9FCGHg";

    return { auth, client, googleSheets, spreadsheetId };
  }

  async metaData(req: Request, res: Response) {
    const { googleSheets, auth, spreadsheetId } = await this.getAuthSheets();
    const metaData = await googleSheets.spreadsheets.get({
      spreadsheetId,
      auth,
    });

    return res.send(metaData);
  }
}

export { GetAuthGoogleSheets };
