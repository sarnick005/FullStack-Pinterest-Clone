import { Notification } from "../models/notifications.Models.js";
import { User } from "../models/user.Models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET FOLLOW NOTIFICATIONS

const getFollowNotification = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiErrors(400, "User ID is missing");
  }
  const notifications = await Notification.find({
    userId,
  });
  const userDetails = await User.findById(userId, "username profilePicture");
  const response = {
    followerDetails: {
      userId: userDetails._id,
      username: userDetails.username,
      profilePicture: userDetails.profilePicture,
    },
    notifications: notifications,
  };

  return res.json(
    new ApiResponse(200, response, "Notifications sent successfully")
  );
});

export { getFollowNotification };
