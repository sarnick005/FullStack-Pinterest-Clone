import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/posts.Models.js";
import { User } from "../models/user.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const getAllPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const posts = await Post.find({ userId });

  if (posts.length === 0) {
    return res.status(404).json(ApiResponse("No posts found for this user"));
  }

  return res
    .status(201)
    .json(new ApiResponse(200, posts, "Post Fetched Successfully"));
});

const publishAPost = asyncHandler(async (req, res) => {
  const { description, tags } = req.body;
  if ([description, tags].some((field) => field?.trim() === "")) {
    throw new ApiErrors(400, "All fields are required");
  }
  const contentLocalPath = req.files?.content[0]?.path;
  if (!contentLocalPath) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  const contentURL = await uploadOnCloudinary(contentLocalPath);

  // Parse tags
  const processedTags = parseTags(tags);

  const post = await Post.create({
    userId: req.user._id,
    content: contentURL.url,
    description,
    tags: processedTags, // Use parsed tags
  });
  const createdPost = await Post.findById(post._id);
  if (!createdPost) {
    throw new ApiErrors(500, "Something went wrong while creating the post");
  }

  console.log(`POST CREATED`);

  return res
    .status(201)
    .json(new ApiResponse(200, createdPost, "Post Created Successfully"));
});

function parseTags(tagsString) {
  const regex = /#(\w+)/g;
  const tagsArray = [];
  let match;
  while ((match = regex.exec(tagsString)) !== null) {
    tagsArray.push(match[1]);
  }
  return tagsArray;
}

const getPostById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get photo, video by id
});
const deletePost = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete photo, video
});

export { getAllPosts, getPostById, publishAPost, deletePost };
