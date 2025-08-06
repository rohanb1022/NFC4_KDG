import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const InstitutionLogin = () => {
  const { instituteLogin } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await instituteLogin(formData);
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300 bg-transparent text-black"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300 bg-transparent text-black"
      />
      <button
        type="submit"
        className="py-2 px-4 bg-black text-white rounded hover:bg-gray-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default InstitutionLogin;
