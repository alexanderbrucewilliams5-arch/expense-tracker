import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/transaction`;

// Get transactions with optional filters
export const getTransactions = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transaction?${query}`);
  return data;
};

// Add a new transaction
export const addTransaction = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Update an existing transaction
export const updateTransaction = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Fetch summary
export const getSummary = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await axios.get(`${API_URL}/summary?${params}`);
  return res.data;
};