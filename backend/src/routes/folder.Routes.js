import { Router } from "express";
import {
  updateFolder,
  createFolder,
  deleteFolder,
  getFolderById,
  getUserFolder,
} from "../controllers/folder.Controller.js";
import { verifyJWT } from "../middleware/auth.Middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createFolder).get(getUserFolder);

router
  .route("/:folderId")
  .get(getFolderById)
  .patch(updateFolder)
  .delete(deleteFolder);



export default router;
