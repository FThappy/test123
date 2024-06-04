import { testControler } from "../controllers/test.controller.js";
import express from "express";

const router = express.Router();

router.post("", testControler);

export default router;
