import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./TransactionsService.js";

// Fetch transactions with optional filters
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (filters = {}) => {
    const res = await api.getTransactions(filters);
    return res;
  }
);

// Create new transaction
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (data) => await api.addTransaction(data)
);

// Update existing transaction
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }) => await api.updateTransaction(id, data)
);

// Delete transaction
export const removeTransaction = createAsyncThunk(
  "transactions/delete",
  async (id) => {
    await api.deleteTransaction(id);
    return id;
  }
);

// Fetch summary
export const fetchSummary = createAsyncThunk(
  "transactions/summary",
  async (filters) => await api.getSummary(filters)
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    total: 0,
    page: 1,
    limit: 10,
    summary: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload.transaction);
        state.total += 1;
      })
      // Update
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const updated = action.payload.transaction;
        state.transactions = state.transactions.map((tx) =>
          tx._id === updated._id ? updated : tx
        );
      })
      // Delete
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (tx) => tx._id !== action.payload
        );
        state.total -= 1;
      })
      // Summary
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload.summary;
      });
  },
});

export default transactionsSlice.reducer;