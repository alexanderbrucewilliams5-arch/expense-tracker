import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice.js";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;