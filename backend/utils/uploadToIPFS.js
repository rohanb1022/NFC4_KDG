import axios from "axios";
import FormData from "form-data";

export const uploadToIPFS = async (fileBuffer, filename) => {
  const data = new FormData();
  data.append("file", fileBuffer, filename);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxBodyLength: "Infinity",
    headers: {
     "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};