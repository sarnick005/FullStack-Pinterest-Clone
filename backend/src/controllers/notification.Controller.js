import { Notification } from "../models/notificationSchema.js";
import { User } from "../models/userSchema.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendFollowNotification = asyncHandler(async (req, res) => {
  const { userId, followerId } = req.body;
  if (!userId || !followerId) {
    throw new ApiErrors(400, "User ID or Follower ID is missing");
  }
  const message = `${followerId} started following you.`;
  const notification = new Notification({
    userId,
    followerId,
    message,
  });
  await notification.save();

  return res.json(
    new ApiResponse(200, notification, "Notification sent successfully")
  );
});

export { sendFollowNotification };
