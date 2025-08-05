import { create } from "zustand";
import axios from "axios";

export const useStudentStore = create((set) => ({
  certificates: [],
  loading: false,
  error: null,
  sharedLink: null,

  fetchCertificates: async (walletId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/student/get-all/${walletId}`, {
        withCredentials: true,
      });
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

  shareCertificate: async (courseId, expiresIn) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `/api/student/share/${courseId}`,
        { expiresIn },
        { withCredentials: true }
      );
      const { link } = response.data;

      // Update the certificate in the list (optional step)
      set((state) => ({
        certificates: state.certificates.map((cert) =>
          cert._id === courseId
            ? {
                ...cert,
                isShareable: true,
                link,
              }
            : cert
        ),
        loading: false,
        sharedLink: link,
      }));
    } catch (error) {
      console.error("Error sharing certificate:", error);
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to share certificate.",
      });
    }
  },

  revokeCertificate: async (courseId) => {
    set({ loading: true, error: null });
    try {
      await axios.post(
        `/api/student/revoke/${courseId}`,
        {},
        { withCredentials: true }
      );
      set((state) => ({
        certificates: state.certificates.map((cert) =>
          cert._id === courseId
            ? {
                ...cert,
                isShareable: false,
                link: null,
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
