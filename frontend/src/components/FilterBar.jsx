import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions, fetchSummary } from "../features/transactions/transactionsSlice.js";

export default function FilterBar({ setFilters, setPage }) {
  const dispatch = useDispatch();

  const [filters, setLocalFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const categories = ["salary", "groceries", "entertainment", "bills", "transport", "savings", "other"];

  const handleChange = (e) => {
    setLocalFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(1);
    setFilters(filters);
    dispatch(fetchTransactions({ ...filters, page: 1, limit: 10 }));
    dispatch(fetchSummary(filters));
  };

  const clearFilters = () => {
    const cleared = { type: "", category: "", startDate: "", endDate: "" };
    setLocalFilters(cleared);
    setFilters(cleared);
    setPage(1);
    dispatch(fetchTransactions({ page: 1, limit: 10 }));
    dispatch(fetchSummary());
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-6 transition-all">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Type
          </label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            onClick={applyFilters}
            className="flex-1 bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Apply
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-300 transition cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}