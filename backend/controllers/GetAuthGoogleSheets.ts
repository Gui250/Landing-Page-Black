import { google } from "../node_modules/googleapis/build/src/index";
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class GetAuthGoogleSheets {
  async getAuthSheets() {
    // Resolve to backend root directory (one level up from controllers)
    const backendRoot = path.resolve(__dirname, "..");
    const credentialsPath = path.join(backendRoot, "credentials.json");

    if (!existsSync(credentialsPath)) {
      throw new Error(
        `Arquivo de credenciais não encontrado em: ${credentialsPath}\n` +
          "Por favor, adicione o arquivo credentials.json na raiz do diretório backend."
      );
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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
    try {
      const { googleSheets, spreadsheetId } = await this.getAuthSheets();
      const metaData = await googleSheets.spreadsheets.get({
        spreadsheetId,
      });

      return res.send(metaData);
    } catch (error) {
      console.error("Erro ao buscar metadata:", error);
      return res.status(500).json({
        error: "Erro ao buscar metadata do Google Sheets",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }

  async getSheets(req: Request, res: Response) {
    try {
      const { googleSheets, spreadsheetId, auth } = await this.getAuthSheets();
      const getRows = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: "Página1",
      });
      return res.send(getRows);
    } catch (error) {
      console.error("Erro ao buscar sheets:", error);
      return res.status(500).json({
        error: "Erro ao buscar sheets do Google Sheets",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }

  async addRow(req: Request, res: Response) {
    try {
      const { googleSheets, spreadsheetId, auth } = await this.getAuthSheets();

      const { email, phone } = req.body;
      const row = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Página1",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[req.body.email, req.body.phone]],
        },
      });
      return res.send(row);
    } catch (error) {
      console.error("Erro ao adicionar row:", error);
      return res.status(500).json({
        error: "Erro ao adicionar row do Google Sheets",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }
}

export { GetAuthGoogleSheets };
