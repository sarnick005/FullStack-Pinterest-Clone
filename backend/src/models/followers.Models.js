import mongoose, { Schema } from "mongoose";

const followersSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  followedId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Follower = mongoose.model("Follower", followersSchema);
