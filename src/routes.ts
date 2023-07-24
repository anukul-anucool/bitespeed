import express from "express";
import { identifyHandler } from "./identifyController";

const router = express.Router();

router.post("/identify", identifyHandler);

export default router;
