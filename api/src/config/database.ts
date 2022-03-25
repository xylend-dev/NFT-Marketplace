import mongoose from "mongoose";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://solrigami_db:27017/solrigamiDB";

export const databaseConnect = async () => {
  await mongoose.connect(databaseURL);
};
