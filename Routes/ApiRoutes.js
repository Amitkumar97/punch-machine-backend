import express from "express";
import PunchApiController from "../Modules/Api/PunchApiController.js";
const ApiRoutes = express.Router();

ApiRoutes.get("/save-punch", PunchApiController.savePunch);
ApiRoutes.get("/get-last-status", PunchApiController.getLastStatus);

export default ApiRoutes;