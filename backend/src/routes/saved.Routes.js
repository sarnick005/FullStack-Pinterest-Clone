import { Router } from "express";
import {
  addPostToFolder,
  removePostFromFolder,
  getSavedPostsByFolder,
} from "../controllers/saved.Controller.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/add/:postId/:folderId").patch(addPostToFolder);
router.route("/remove/:postId/:folderId").patch(removePostFromFolder);
router.route("/folder/:folderId/saved-posts").get(getSavedPostsByFolder);

export default router;
