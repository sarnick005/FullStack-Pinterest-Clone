import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactionUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export const Notification = mongoose.model("Notification", notificationSchema);
