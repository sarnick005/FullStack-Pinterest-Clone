import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.Models.js";
import { Notification } from "../models/notifications.Models.js";
import { Follower } from "../models/followers.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// TOGGLE FOLLOWER

const toggleFollower = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { followingUserId } = req.params;

  if (!mongoose.isValidObjectId(followingUserId)) {
    throw new ApiErrors(400, "Invalid followingUserId");
  }

  const userExists = await User.findById(followingUserId);
  if (!userExists) {
    throw new ApiErrors(404, "User not found");
  }

  let follower = await Follower.findOne({
    followerId: userId,
    followedId: followingUserId,
  });

  if (!userId || !followingUserId) {
    throw new ApiErrors(400, "User ID or Follower ID is missing");
  }

  const followerDetails = await User.findById(userId); // Await the query

  if (!followerDetails) {
    throw new ApiErrors(404, "Follower details not found");
  }

  if (follower) {
    await Follower.deleteOne({
      followerId: userId,
      followedId: followingUserId,
    });

    const message = `${followerDetails.username} stopped following you.`;
    const notification = new Notification({
      userId: followingUserId,
      followerId: userId,
      message,
    });
    await notification.save();

    return res
      .status(200)
      .json(new ApiResponse("Follower relationship removed"));
  } else {
    follower = await Follower.create({
      followerId: userId,
      followedId: followingUserId,
    });
    const message = `${followerDetails.username} started following you.`;
    const notification = new Notification({
      userId: followingUserId,
      followerId: userId,
      message,
    });
    await notification.save();

    return res
      .status(201)
      .json(new ApiResponse("Follower relationship created"));
  }
});

// GET FOLLOWINGS

const getUserFollowings = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the userId of the logged-in user

  const followings = await Follower.find({ followerId: userId })
    .populate("followedId", "username profilePicture")
    .select("followedId");

  if (!followings || followings.length === 0) {
    throw new ApiErrors(404, "No followings found for the user");
  }

  const followingIds = followings.map((following) => following.followedId);
  const followingCount = followings.length;
  console.log("Followings");
  console.log(followings);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { followingIds, followingCount },
        "User followings fetched successfully"
      )
    );
});

// GET FOLLOWERS

const getUserFollowers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const followers = await Follower.find({ followedId: userId })
    .populate("followerId", "username profilePicture")
    .select("followerId");

  if (!followers || followers.length === 0) {
    throw new ApiErrors(404, "No followers found for the user");
  }

  const followerIds = followers.map((follower) => follower.followerId);
  const followerCount = followers.length;
  console.log("Followers");

  console.log(followers);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { followerIds, followerCount },
        "User followers fetched successfully"
      )
    );
});

export { toggleFollower, getUserFollowings, getUserFollowers };
