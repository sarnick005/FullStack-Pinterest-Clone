import { Router } from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comments.Controller.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = Router();

router.use(verifyJWT);
router.route("/:postId").get(getPostComments).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;
