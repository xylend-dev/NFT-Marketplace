import Transaction from "arweave/node/lib/transaction";
import { arweave, arweaveJWK } from "../../config/arweaveNetwork";

export const uploadData = async (
  data: ArrayBuffer | Buffer | string,
  fileType: string,
  isUploadByChunk = false
): Promise<Transaction> => {
  const transaction = await arweave.createTransaction(
    { data: data },
    arweaveJWK
  );
  transaction.addTag("Content-Type", fileType);
  await arweave.transactions.sign(transaction, arweaveJWK);

  if (isUploadByChunk) {
    const uploader = await arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }
  }

  await arweave.transactions.post(transaction);

  return transaction;
};
