import mongoose from "mongoose";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/solrigamiDB";

export const databaseConnect = async () => {
  await mongoose.connect(databaseURL);
};
