import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true, // cloudinary url
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});
export const Post = mongoose.model("Post", postSchema);
