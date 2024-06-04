import express from "express";
import { browserOTP, forgotPassword, login, logout, register, rePassword, sendOTPRegister } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


// const storage = multer.memoryStorage();
// const upload_image = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       req.multerError = true;
//       cb(null, false, req.multerError);
//     }
//   },
// });
router.post("/register", register);

router.post("/login", login);

router.delete("/logout", verifyToken ,logout);

router.post("/otp", sendOTPRegister);

router.post("/forgotPassword", forgotPassword)

router.post("/browser-otp",browserOTP)

router.post("/re-password", rePassword)



export default router;