/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  walletId : null,

  // STUDENT SIGNUP
  studentSignup: async (signupData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/user/signup", signupData);
      const { user, token , walletId} = res.data;

      localStorage.setItem("role", "student");
      localStorage.setItem("walletId", walletId);
      set({ user, token, role: "student", isAuthenticated: true , walletId : walletId});
      toast.success("Student signup successful!");
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      console.error("Student signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // STUDENT LOGIN
  studentLogin: async (loginData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/user/login", loginData);
      const { user, token , walletId} = res.data;

      localStorage.setItem("role", "student");
      localStorage.setItem("token", token);
      localStorage.setItem("walletId", walletId);
      console.log("storing wallet id in local:", walletId);
      set({ user, token, role: "student", isAuthenticated: true , walletId : walletId});
      toast.success("Student login successful!");
      return { success: true };
    } catch (error) {

      console.error("Student login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // INSTITUTE SIGNUP
  instituteSignup: async (signupData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/institute/signup", signupData);
      const { user, token } = res.data;

      localStorage.setItem("role", "institute");
      localStorage.setItem("token", token);
      set({ user, token, role: "institute", isAuthenticated: true });
      toast.success("Institute signup successful!");
      return { success: true };
    } catch (error) {
      console.error("Institute signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // INSTITUTE LOGIN
  instituteLogin: async (loginData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/institute/login", loginData);
      const { user, token } = res.data;

      localStorage.setItem("role", "institute");
      localStorage.setItem("token", token);
      set({ user, token, role: "institute", isAuthenticated: true });
      toast.success("Institute login successful!");
      return { success: true };
    } catch (error) {
      console.error("Institute login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // CHECK AUTH
checkAuth: async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return;

  set({ loading: true });

  try {
    const res = await axiosInstance.get("/user/authUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user } = res.data;

    set({
      user,
      token,
      role,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Check auth failed:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ user: null, token: null, role: null, isAuthenticated: false });
  } finally {
    set({ loading: false });
  }
},

  // LOGOUT
  logout: () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  set({
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
  });
  toast.info("Logged out");
},

}));
