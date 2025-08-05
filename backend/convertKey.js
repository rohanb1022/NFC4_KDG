import bs58 from "bs58";
import { writeFileSync } from "fs";

// Paste your base58 private key here:
const base58Key = "PQHRL92cNTQqLrgiL1ciSZVWAuU8MHeRdcyPq3ZEjy3Q9oZo5SwN9hf9F6yY6tyocGS9zsdoeBFUHDci14BZqEs";

// Decode to Uint8Array
const secretKey = bs58.decode(base58Key);

// Save to id.json
writeFileSync("wallet/id.json", JSON.stringify(Array.from(secretKey)));

console.log("✅ id.json created successfully!");
