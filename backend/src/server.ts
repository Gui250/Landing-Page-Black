import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// CORS configuration - permite requisições do frontend na Vercel
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Em produção, defina a URL do frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(routes);

// Exporta o app para uso como serverless function na Vercel
export default app;
