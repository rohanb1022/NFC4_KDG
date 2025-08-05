import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js"; // make sure path is correct

const InstitutionSignup = () => {
  const { instituteSignup } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await instituteSignup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      alert(result.message); // replace with toast if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        placeholder="Institution Name"
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
      <button
        type="submit"
        className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default InstitutionSignup;
