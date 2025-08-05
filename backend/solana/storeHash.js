import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
dotenv.config();

const connection = new Connection("https://api.devnet.solana.com");

const secretKey = bs58.decode(process.env.SOLANA_SECRET);
const payer = Keypair.fromSecretKey(secretKey);

export const storeHashOnSolana = async (hash) => {
  const instruction = new TransactionInstruction({
    keys: [],
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    data: Buffer.from(hash),
  });

  const tx = new Transaction().add(instruction);
  const signature = await sendAndConfirmTransaction(connection, tx, [payer]);
  return signature;
};