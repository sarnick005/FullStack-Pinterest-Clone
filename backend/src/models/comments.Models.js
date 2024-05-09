import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    trim: true,
  },
});
export const Comment = mongoose.model("Comment", commentSchema);
