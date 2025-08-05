import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { readFileSync } from "fs";
import idl from "../idl/certchain.json"; // ✅ fix this path if needed
import path from "path";

// ✅ Load your Solana wallet keypair (e.g., id.json)
const walletKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(readFileSync(path.resolve("wallet/id.json")))) // ✅ fix this path if needed
);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const wallet = new anchor.Wallet(walletKeypair);

const provider = new anchor.AnchorProvider(connection, wallet, {
  preflightCommitment: "confirmed",
});

// ✅ Replace with the real deployed program ID (from Solana Playground)
const programId = new PublicKey("33W6UHhJxTpgiv5j8m9Gp3WSW8ztx9Pg4BMnr75dsc8AMCwTXxkfL2BBYWCckT2St5FbK1tp25DWK4TdXX8JqFML");

const program = new anchor.Program(idl, programId, provider);

export const storeHashOnSolana = async (hash, courseName, studentWallet) => {
  const certAccount = Keypair.generate();
  const issuedOn = Math.floor(Date.now() / 1000);

  await program.methods
    .issueCertificate(hash, courseName, new PublicKey(studentWallet), new anchor.BN(issuedOn))
    .accounts({
      certificate: certAccount.publicKey,
      authority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([certAccount])
    .rpc();

  return {
    tx: certAccount.publicKey.toBase58(),
    certAccount: certAccount.publicKey.toBase58(),
  };
};
