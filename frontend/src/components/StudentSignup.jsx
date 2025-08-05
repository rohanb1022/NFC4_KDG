// import React, { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore.js";
// import { Wallet } from "lucide-react";
// import WalletConnectButton from "./WalletConnectButton.jsx";
// import { useWallet } from '@solana/wallet-adapter-react';


// const StudentSignup = () => {
//   const { publicKey, connected } = useWallet();
//   const [walletId, setWalletId] = React.useState('');
//   const { studentSignup } = useAuthStore();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     walletId : "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await studentSignup(formData);
//     if (!result.success) {
//       alert(result.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       <input
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//         className="p-2 rounded border border-white bg-transparent text-white"
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="p-2 rounded border border-white bg-transparent text-white"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="p-2 rounded border border-white bg-transparent text-white"
//       />
//       <button
//         type="submit"
//         className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
//       >
//         <WalletConnectButton />
//       </button>
//       <button
//         type="submit"
//         className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default StudentSignup;


import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnectButton from "./WalletConnectButton.jsx";
import { Wallet } from "ethers";

const StudentSignup = () => {
  const { publicKey, connected } = useWallet();
  const { studentSignup } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    walletId: "",
  });

  // Automatically update walletId when connected
  useEffect(() => {
    if (connected && publicKey) {
      setFormData((prev) => ({
        ...prev,
        walletId: publicKey.toString(),
      }));
    }
  }, [connected, publicKey]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(publicKey)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.walletId) {
      alert("Please connect your wallet before signing up.");
      return;
    }

    const result = await studentSignup(formData);

    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="p-2 rounded border border-white bg-transparent text-white"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-2 rounded border border-white bg-transparent text-white"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 rounded border border-white bg-transparent text-white"
      />

      {/* Wallet connect button (not submit type) */}
      <div className="py-2">
        <WalletConnectButton />
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentSignup;
