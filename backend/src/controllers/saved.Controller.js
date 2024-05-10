import mongoose, { isValidObjectId } from "mongoose";
import { Folder } from "../models/folder.Models.js";
import { Saved } from "../models/saved.Models.js";
import { Post } from "../models/posts.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// GET SAVED POST
const getSavedPostsByFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  if (!isValidObjectId(folderId)) {
    throw new ApiErrors(400, "Invalid folder ID");
  }
  const savedPosts = await Saved.find({ folderId }).populate({
    path: "postId",
  });
  let detailedSavedPosts = [];
  for (const savedPost of savedPosts) {

    const postDetails = await Post.findById(savedPost.postId);

    if (postDetails) {
      detailedSavedPosts.push({
        postDetails,
      });
    }
  }

  return res.json(
    new ApiResponse(
      200,
      detailedSavedPosts,
      "All saved posts in folder retrieved successfully"
    )
  );
});


// ADD POST TO FOLDER 

const addPostToFolder = asyncHandler(async (req, res) => {
  const { folderId, postId } = req.params;
  if (!isValidObjectId(folderId) || !isValidObjectId(postId)) {
    throw new ApiErrors(400, "Invalid folder or post ID");
  }
  const folder = await Folder.findById(folderId);
  if (!folder) {
    throw new ApiErrors(404, "Folder not found");
  }
  const saved = new Saved({
    postId,
    folderId,
  });

  await saved.save();
  return res.json(
    new ApiResponse(200, saved, "Post added to folder successfully")
  );
});

//  DELETE POST FROM FOLDER

const removePostFromFolder = asyncHandler(async (req, res) => {
  const { folderId, postId } = req.params;
  if (!isValidObjectId(folderId) || !isValidObjectId(postId)) {
    throw new ApiErrors(400, "Invalid folder or post ID");
  }
  const deletedSaved = await Saved.findOneAndDelete({ folderId, postId });
  if (!deletedSaved) {
    throw new ApiErrors(404, "Saved document not found");
  }
  return res.json(
    new ApiResponse(200, null, "Post removed from folder successfully")
  );
});

export { addPostToFolder, removePostFromFolder, getSavedPostsByFolder };
