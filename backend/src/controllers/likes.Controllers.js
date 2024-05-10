import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/likes.Models.js";
import { User } from "../models/user.Models.js";
import { Post } from "../models/posts.Models.js";
import { Notification } from "../models/notifications.Models.js";
import { Comment } from "../models/comments.Models.js";
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
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new ApiErrors(404, "Comment not found");
    }
    const userWhoLiked = await User.findById(userId, "username profilePicture");
    if (!userWhoLiked) {
      throw new ApiErrors(404, "User who liked the comment not found");
    }
    const message = `${userWhoLiked.username} liked your comment "${comment.comment}".`;
    const notification = new Notification({
      userId: comment.userId,
      followerId: userId,
      message,
    });
    await notification.save();
    const responseData = {
      userWhoLiked: {
        userId: userWhoLiked._id,
        username: userWhoLiked.username,
        profilePicture: userWhoLiked.profilePicture,
      },
      newLike,
    };

    return res.json(new ApiResponse(201, responseData, "Comment liked"));
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
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiErrors(404, "Post not found");
    }
    const userWhoLiked = await User.findById(userId, "username profilePicture");
    if (!userWhoLiked) {
      throw new ApiErrors(404, "User who liked the post not found");
    }
    const message = `${userWhoLiked.username} liked your post "${post.description}".`;
    const notification = new Notification({
      userId: post.userId,
      followerId: userId,
      message,
    });
    await notification.save();
    const responseData = {
      userWhoLiked: {
        userId: userWhoLiked._id,
        username: userWhoLiked.username,
        profilePicture: userWhoLiked.profilePicture,
      },
      newLike,
    };

    return res.json(new ApiResponse(201, responseData, "Post liked"));
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
