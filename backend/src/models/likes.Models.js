import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Like = mongoose.model("Like", likeSchema);
