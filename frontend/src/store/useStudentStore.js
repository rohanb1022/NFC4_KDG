import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useStudentStore = create((set) => ({
  certificates: [],
  loading: false,
  error: null,
  sharedLink: null,
  user: null,
  authLoading: false,

  // AUTH: Check if user is logged in
  checkAuth: async () => {
    set({ authLoading: true });
    try {
      const response = await axiosInstance.get("/api/v1/user/authUser", {
        withCredentials: true,
      });
      set({ user: response.data, authLoading: false });
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ user: null, authLoading: false });
    }
  },

  // AUTH: Login
  login: async (formData) => {
    set({ authLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/user/login", formData, {
        withCredentials: true,
      });
      set({ user: response.data, authLoading: false });
    } catch (error) {
      console.error("Login failed:", error);
      set({
        user: null,
        authLoading: false,
        error: error?.response?.data?.message || "Login failed",
      });
    }
  },

  // AUTH: Signup
  signup: async (formData) => {
    set({ authLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/v1/user/signup", formData, {
        withCredentials: true,
      });
      set({ user: response.data, authLoading: false });
    } catch (error) {
      console.error("Signup failed:", error);
      set({
        user: null,
        authLoading: false,
        error: error?.response?.data?.message || "Signup failed",
      });
    }
  },

  // AUTH: Logout
  logout: async () => {
    set({ authLoading: true });
    try {
      await axiosInstance.post(
        "/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      set({ user: null, authLoading: false });
    } catch (error) {
      console.error("Logout failed:", error);
      set({ authLoading: false });
    }
  },

  // Fetch courses by student wallet ID
  fetchCertificates: async (walletId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`user/get-all/${walletId}`, {
        withCredentials: true,
      });
      console.log("sending req to back: ",walletId)
      set({ certificates: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to fetch certificates.",
      });
    }
  },

  // Share a course
  shareCertificate: async (courseId, expiresIn) => {
    set({ loading: true, error: null });
    try {
      console.log("Making share request for courseId:", courseId);
      const response = await axiosInstance.post(
        `/user/share/${courseId}`,
        { expiresIn },
        { withCredentials: true }
      );
      console.log("Share API response:", response.data);
      
      const { link } = response.data;
      const shareLink = `${window.location.origin}/share/${link}`;
      console.log("Generated share link:", shareLink);
      
      set((state) => ({
        certificates: state.certificates.map((cert) =>
          cert._id === courseId
            ? {
                ...cert,
                isShareable: true,
                shareLink,
                link,
              }
            : cert
        ),
        loading: false,
        sharedLink: shareLink,
      }));
      
      return response.data; // Return the response for the component to use
    } catch (error) {
      console.error("Error sharing certificate:", error);
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to share certificate.",
      });
      throw error; // Re-throw the error for the component to handle
    }
  },

  // Revoke shared access
  revokeCertificate: async (courseId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.post(
        `/user/revoke/${courseId}`,
        {},
        { withCredentials: true }
      );
      set((state) => ({
        certificates: state.certificates.map((cert) =>
          cert._id === courseId
            ? {
                ...cert,
                isShareable: false,
                shareLink: null,
              }
            : cert
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error revoking certificate:", error);
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to revoke certificate.",
      });
    }
  },
}));
