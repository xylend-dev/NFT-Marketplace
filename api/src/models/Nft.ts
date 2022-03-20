import mongoose from "mongoose";

const NftSchema = new mongoose.Schema({
  mint: String,
  likeWallet: [String],
});

const Nft = mongoose.model("Nft", NftSchema);

export default Nft;
