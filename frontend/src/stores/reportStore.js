import { create } from "zustand";

import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../services/report.service";

const useReportStore = create((set) => ({
  reports: [],
  report: null,
  isLoading: false,
  error: null,

  fetchReports: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await getReports();

      console.log("REPORT API RESPONSE:", response);
      console.log("IS ARRAY:", Array.isArray(response));

      const reports = Array.isArray(response)
        ? response
        : response?.reports || response?.data || [];

      console.log("REPORTS TO STORE:", reports);

      set({
        reports,
        isLoading: false,
      });

      return reports;
    } catch (error) {
      console.error("REPORT FETCH ERROR:", error);

      set({
        reports: [],
        isLoading: false,
        error: error.response?.data?.message || "Failed to load reports",
      });

      throw error;
    }
  },

  fetchReport: async (id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const report = await getReportById(id);

      set({
        report,
        isLoading: false,
      });

      return report;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to load report",
      });

      throw error;
    }
  },

  createNewReport: async (data) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const report = await createReport(data);

      set((state) => ({
        reports: [report, ...state.reports],
        report,
        isLoading: false,
      }));

      return report;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create report",
      });

      throw error;
    }
  },

  editReport: async (id, data) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const updatedReport = await updateReport(id, data);

      set((state) => ({
        reports: state.reports.map((item) =>
          item._id === updatedReport._id ? updatedReport : item,
        ),
        report: updatedReport,
        isLoading: false,
      }));

      return updatedReport;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to update report",
      });

      throw error;
    }
  },

  removeReport: async (id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await deleteReport(id);

      set((state) => ({
        reports: state.reports.filter((item) => item._id !== id),
        report: state.report?._id === id ? null : state.report,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete report",
      });

      throw error;
    }
  },

  clearReport: () => {
    set({
      report: null,
      error: null,
    });
  },
}));

export default useReportStore;
