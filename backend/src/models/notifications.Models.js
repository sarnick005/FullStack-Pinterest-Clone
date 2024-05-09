import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reactionUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});
export const Notification = mongoose.model("Notification", notificationSchema);
