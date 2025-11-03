import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction, fetchTransactions, fetchSummary } from "../features/transactions/transactionsSlice.js";

export default function TransactionForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "groceries",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTransaction(form));
    dispatch(fetchTransactions());
    dispatch(fetchSummary());
    setForm({
      ...form,
      amount: "",
      description: "",
      category: "groceries",
      type: "expense",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
    >
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      >
        <option>salary</option>
        <option>groceries</option>
        <option>entertainment</option>
        <option>bills</option>
        <option>transport</option>
        <option>savings</option>
        <option>other</option>
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        required
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto lg:w-full"
      >
        Add
      </button>
    </form>
  );
}