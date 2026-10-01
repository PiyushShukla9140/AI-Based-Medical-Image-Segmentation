import api from "./api";

const getData = (response) => {
  return response.data?.data ?? response.data;
};

export const createReport = async (data) => {
  const response = await api.post("/report/create-report", data);
  return getData(response);
};

export const getReports = async () => {
  const response = await api.get("/report/");
  return getData(response);
};

export const getReportById = async (id) => {
  const response = await api.get(`/report/${id}`);
  return getData(response);
};

export const updateReport = async (id, data) => {
  const response = await api.patch(`/report/${id}`, data);
  return getData(response);
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/report/${id}`);
  return getData(response);
};
