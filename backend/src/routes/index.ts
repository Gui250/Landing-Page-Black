import { Router } from "express";
import googlesheetsRoutes from "./googlesheets.js";
const routes = Router();

routes.use("/googlesheets", googlesheetsRoutes);
export default routes;
