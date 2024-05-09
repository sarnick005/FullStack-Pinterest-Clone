import { Router } from "express";
import {
  toggleFollower,
  getUserFollowings,
  getUserFollowers,
} from "../controllers/followers.Controller.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getUserFollowings);
router.route("/:followingUserId").post(toggleFollower);
router.route("/user-followers").get(getUserFollowers);


export default router;
