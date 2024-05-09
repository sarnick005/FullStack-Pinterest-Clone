import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Like = mongoose.model("Like", likeSchema);
