/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/institute";

export const useInstitutionStore = create((set) => ({
  currentInstitution: null,
  students: [],
  loading: false,
  error: null,

  // ✅ Login
  login: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${BASE_URL}/login`, data, { withCredentials: true });
      set({ currentInstitution: res.data, error: null });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
      return { success: false, message: err.response?.data?.message || "Login failed" };
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Signup
  signup: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${BASE_URL}/signup`, data, { withCredentials: true });
      set({ currentInstitution: res.data, error: null });
      return { success: true };
    } catch (err) {
      set({ error: err.response?.data?.message || "Signup failed", loading: false });
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      set({ currentInstitution: null });
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  },

  // ✅ Check Authentication
  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/authUser`, { withCredentials: true });
      set({ currentInstitution: res.data });
    } catch (err) {
      set({ currentInstitution: null });
    }
  },

  // ✅ Fetch all students
  fetchStudents: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${BASE_URL}/all`, { withCredentials: true });
      set({ students: res.data });
    } catch (err) {
      set({ error: "Failed to fetch students" });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Issue certificate
  issueCertificate: async (certificateData, file) => {
    try {
      set({ loading: true });

      const formData = new FormData();
      Object.entries(certificateData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/issue`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return { success: true, data: res.data };
    } catch (err) {
      console.error("❌ Error issuing certificate:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Issue failed"
      };
    } finally {
      set({ loading: false });
    }
  }
}));
