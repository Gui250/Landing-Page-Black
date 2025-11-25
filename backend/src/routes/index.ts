import { Router } from "express";
import googlesheetsRoutes from "./googlesheets";
const routes = Router();

routes.use("/googlesheets", googlesheetsRoutes);
export default routes;
