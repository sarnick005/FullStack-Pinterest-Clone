import { Router } from "express";
import {
  getAllPosts,
  publishAPost,
  getPostById,
  deletePost,
  updatePost,
} from "../controllers/post.Controllers.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";
import { upload } from "../middleware/multer.Middleware.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/")
  .get(getAllPosts)
  .post(
    upload.fields([
      {
        name: "content",
        maxCount: 1,
      },
    ]),
    publishAPost
  );

router.route("/:postId").get(getPostById).delete(deletePost).patch(updatePost);


export default router;
