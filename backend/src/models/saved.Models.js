import mongoose, { Schema } from "mongoose";

const savedSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  { timestamps: true }
);
export const Saved = mongoose.model("Saved", savedSchema);
