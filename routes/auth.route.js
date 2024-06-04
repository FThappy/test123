import express from "express";
import { browserOTP, forgotPassword, login, logout, register, rePassword, sendOTPRegister } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.delete("/logout", verifyToken ,logout);

router.post("/otp", sendOTPRegister);

router.post("/forgotPassword", forgotPassword)

router.post("/browser-otp",browserOTP)

router.post("/re-password", rePassword)



export default router;