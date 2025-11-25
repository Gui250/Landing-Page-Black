import { Router } from "express";
import { GetAuthGoogleSheets } from "../../controllers/GetAuthGoogleSheets";

const router = Router();

const getAuthGoogleSheets = new GetAuthGoogleSheets();

router.get("/metadata", getAuthGoogleSheets.metaData.bind(getAuthGoogleSheets));
router.get("/sheets", getAuthGoogleSheets.getSheets.bind(getAuthGoogleSheets));
router.post("/add-row", getAuthGoogleSheets.addRow.bind(getAuthGoogleSheets));
export default router;
