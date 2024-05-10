import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/posts.Models.js";
import { User } from "../models/user.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {deleteImageFromCloudinary} from "../utils/deleteImageFromCloudinary.js";

// GET ALL POSTS

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

// PUBLISH A POST

const publishAPost = asyncHandler(async (req, res) => {
  const { description, tags } = req.body;
  if ([description, tags].some((field) => field?.trim() === "")) {
    throw new ApiErrors(400, "All fields are required");
  }
  const contentLocalPath = req.files?.content[0]?.path;
  if (!contentLocalPath) {
    throw new ApiErrors(400, "Content file is required");
  }

  const contentURL = await uploadOnCloudinary(contentLocalPath);

  const processedTags = parseTags(tags);

  const post = await Post.create({
    userId: req.user._id,
    content: contentURL.url,
    description,
    tags: processedTags, 
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

// GET POST BY ID

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const postDetails = await Post.findOne({ _id: postId }); 
  if (!postDetails) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }
  // console.log("Details of a single post");
  // console.log(postDetails);
  return res
    .status(200)
    .json(
      new ApiResponse(200, postDetails, "Post Details Fetched Successfully")
    );
});

// DELETE POST

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }
  deleteImageFromCloudinary(post.content);
  const deletedPost = await Post.findByIdAndDelete(postId);
  console.log("Details of a deleted post");
  console.log(deletedPost);
  if (!deletedPost) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Details of Deleted Post"));
});


// EDIT POST
const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { description, tags } = req.body;

  // Find the post by postId
  const post = await Post.findById(postId);

  // Check if the post exists
  if (!post) {
    return res.status(404).json(ApiResponse("No post found with this ID"));
  }

  // Check if the logged-in user is the author of the post
  if (post.userId.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json(new ApiResponse("You are not authorized to update this post"));
  }

  // Construct the update object
  const updateObject = {};
  if (description) updateObject.description = description;
  if (tags) updateObject.tags = tags;

  // Update the post
  const updatedPost = await Post.findByIdAndUpdate(postId, updateObject, {
    new: true,
  });

  // Check if the post was updated
  if (!updatedPost) {
    return res.status(500).json(new ApiResponse("Failed to update the post"));
  }

  // Return the updated post
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Details of Updated Post"));
});



export { getAllPosts, getPostById, publishAPost, deletePost, updatePost };
