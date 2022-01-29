import Transaction from "arweave/node/lib/transaction";
import { arweave, arweaveJWK } from "../../config/arweaveNetwork";

export const uploadData = async (
  data: Buffer | string,
  fileType: string,
  isUploadByChunk = false
): Promise<Transaction> => {
  const tx = await arweave.createTransaction({ data: data }, arweaveJWK);
  tx.addTag("Content-Type", fileType);
  await arweave.transactions.sign(tx, arweaveJWK);

  if (isUploadByChunk) {
    const uploader = await arweave.transactions.getUploader(tx);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }
  }

  await arweave.transactions.post(tx);

  return tx;
};
