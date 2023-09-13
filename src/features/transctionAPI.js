import axiosInstance from "../axios/axios";

export const getTransctions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};

export const addTransctions = async (data) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};

export const editTransctions = async (id, data) => {
  const response = await axiosInstance.put(`/transactions/${id}`, data);
  return response.data;
};
export const deletedTransctions = async (id) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
};
