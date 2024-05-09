import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const postSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
postSchema.plugin(mongooseAggregatePaginate);
export const Post = mongoose.model("Post", postSchema);
