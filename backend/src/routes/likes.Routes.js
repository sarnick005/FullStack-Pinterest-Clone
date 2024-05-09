import { Router } from "express";
import {
  toggleCommentLike,
  togglePostLike,
  postLikedUsers,
  commentLikedUsers,
} from "../controllers/likes.Controllers.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/toggle/p/:postId").post(togglePostLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/likedUsers/p/:postId").get(postLikedUsers);
router.route("/likedUsers/c/:commentId").get(commentLikedUsers);

export default router;
