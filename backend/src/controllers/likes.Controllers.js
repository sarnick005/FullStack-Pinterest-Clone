import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.Models.js";
import { User } from "../models/user.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// LIKE OR DISLIKE COMMENTS
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  const existingLike = await Like.findOne({ commentId, userId });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res.json(new ApiResponse(200, {}, "Comment like removed"));
  } else {
    const newLike = await Like.create({ commentId, userId });
    return res.json(new ApiResponse(201, newLike, "Comment liked"));
  }
});

// LIKE OR DISLIKE POSTS

const togglePostLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const existingLike = await Like.findOne({ postId, userId });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res.json(new ApiResponse(200, {}, "Post like removed"));
  } else {
    const newLike = await Like.create({ postId, userId });
    return res.json(new ApiResponse(201, newLike, "Post liked"));
  }
});

// ALL LIKED USERS
const postLikedUsers = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const likes = await Like.find({ postId });
  const likedUsers = [...new Set(likes.map((like) => like.userId))];

  const likedUsersWithDetails = await Promise.all(
    likedUsers.map(async (userId) => {
      const userDetails = await User.findById(userId);
      return userDetails;
    })
  );

  const filteredLikedUsers = likedUsersWithDetails.filter((user) => user);

  return res.json(
    new ApiResponse(
      200,
      {
        totalLikes: filteredLikedUsers.length,
        likedUsers: filteredLikedUsers.map((user) => ({
          userId: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        })),
      },
      "List of users who liked the post"
    )
  );
});

// ALL COMMENT LIKED USERS
const commentLikedUsers = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const likes = await Like.find({ commentId });

  const likedUsers = [...new Set(likes.map((like) => like.userId))];
  const likedUsersWithDetails = await Promise.all(
    likedUsers.map(async (userId) => {
      const userDetails = await User.findById(userId);
      return userDetails;
    })
  );

  const filteredLikedUsers = likedUsersWithDetails.filter((user) => user);

  return res.json(
    new ApiResponse(
      200,
      {
        totalLikes: filteredLikedUsers.length,
        likedUsers: filteredLikedUsers.map((user) => ({
          userId: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        })),
      },
      "List of users who liked the comment"
    )
  );
});



export { toggleCommentLike, togglePostLike, postLikedUsers, commentLikedUsers };
