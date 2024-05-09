import { Comment } from "../models/comments.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET ALL COMMENTS
const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, comments, "Post comments retrieved successfully")
    );
});

// ADD A COMMENT

const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const owner = req.user._id; 

  const newComment = await Comment.create({ postId, owner, comment });

  return res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment added successfully"));
});

// UPDATE A COMMENT 

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  const existingComment = await Comment.findById(commentId);

  if (!existingComment) {
    throw new ApiErrors(404, "Comment not found");
  }

  if (existingComment.owner.toString() !== req.user._id.toString()) {
    throw new ApiErrors(403, "You are not authorized to update this comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiErrors(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

// DELETE COMMENT

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const existingComment = await Comment.findById(commentId);
  if (!existingComment) {
    throw new ApiErrors(404, "Comment not found");
  }
  const isPostOwner =
    existingComment.postId &&
    existingComment.postId.owner &&
    existingComment.postId.owner.toString() === req.user._id.toString();
  const isCommentOwner =
    existingComment.owner &&
    existingComment.owner.toString() === req.user._id.toString();

  if (isPostOwner || isCommentOwner) {
    await Comment.findByIdAndDelete(commentId);
  } else {
    throw new ApiErrors(403, "You are not authorized to delete this comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});



export { getPostComments, addComment, updateComment, deleteComment };
