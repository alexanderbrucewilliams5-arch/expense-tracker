import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTransactions, removeTransaction, updateTransaction, fetchSummary } from "../features/transactions/transactionsSlice.js";

export default function TransactionList({ filters, page, setPage }) {
  const dispatch = useDispatch();
  const { transactions, loading, total = 0 } = useSelector(
    (state) => state.transactions
  );

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const limit = 10;

  // Fetch transactions when filters or page changes
  useEffect(() => {
    dispatch(fetchTransactions({ ...filters, page, limit }));
  }, [dispatch, filters, page]);

  const totalPages = Math.ceil(total / limit);

  const handleEdit = (tx) => {
    setEditing(tx._id);
    setForm({
      type: tx.type,
      amount: tx.amount,
      description: tx.description || "",
      category: tx.category,
      date: tx.date
        ? tx.date.split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateTransaction({ id: editing, data: form })).unwrap();
    dispatch(fetchTransactions({ ...filters, page, limit }));
    dispatch(fetchSummary());
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this transaction?")) {
      await dispatch(removeTransaction(id)).unwrap();
      dispatch(fetchTransactions({ ...filters, page, limit }));
      dispatch(fetchSummary());
    }
  };

  if (loading)
    return (
      <p className="text-center text-indigo-600 font-medium animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3 text-slate-800">
        Transactions
      </h2>

      {/* Transaction Table */}
      <table className="w-full border-collapse text-sm min-w-[700px]">
        <thead>
          <tr className="bg-slate-100 text-left text-slate-600">
            <th className="p-2">Type</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Description</th>
            <th className="p-2">Date</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx._id} className="border-t hover:bg-slate-50">
                <td
                  className={`p-2 font-medium ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type}
                </td>
                <td className="p-2 capitalize">{tx.category}</td>
                <td className="p-2">₹{tx.amount}</td>
                <td className="p-2 text-slate-700 max-w-[100px] truncate whitespace-normal break-words">{tx.description || "-"}</td>
                <td className="p-2 text-slate-500">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="p-2 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-slate-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border border-indigo-300 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "border border-indigo-300 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border border-indigo-300 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              Edit Transaction
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <select
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Amount"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                required
              />

              <input
                type="text"
                name="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />

              <select
                name="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="salary">Salary</option>
                <option value="groceries">Groceries</option>
                <option value="entertainment">Entertainment</option>
                <option value="bills">Bills</option>
                <option value="transport">Transport</option>
                <option value="savings">Savings</option>
                <option value="other">Other</option>
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}