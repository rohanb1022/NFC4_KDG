// utils/chunkAndStorePDF.js
import fs from 'fs';
import os from 'os';
import path from 'path';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const chunkAndStorePDF = async (buffer, walletId) => {
  const tempPath = path.join(os.tmpdir(), `cert-${Date.now()}.pdf`);
  fs.writeFileSync(tempPath, buffer);

  const loader = new PDFLoader(tempPath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50
  });

  const chunks = await splitter.splitDocuments(rawDocs);

  const collectionName = `cert-${walletId}-${Date.now()}`;
  
  // Clean up temporary file
  fs.unlinkSync(tempPath);

  return {
    chunkTexts: chunks.map(chunk => chunk.pageContent),
    collectionName,
    totalChunks: chunks.length,
    chunks: chunks // Return the original chunks
  };
};
