import mongoose from "mongoose";

const newNftSchema = new mongoose.Schema(
  {
    mint: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const NewNft = mongoose.model("NewNft", newNftSchema);

export default NewNft;
