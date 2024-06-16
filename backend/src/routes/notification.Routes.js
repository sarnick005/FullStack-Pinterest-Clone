import express from "express";
import { getFollowNotification } from "../controllers/notification.Controller.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = express.Router();
router.use(verifyJWT);


router.route("/all").get(getFollowNotification);

export default router;
