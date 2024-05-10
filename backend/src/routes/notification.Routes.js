import express from "express";
import { sendFollowNotification } from "../controllers/notificationController.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = express.Router();
router.use(verifyJWT);


router.route("/follow").post(sendFollowNotification);

export default router;
