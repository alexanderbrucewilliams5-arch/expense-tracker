import { useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import SummaryChart from "../components/SummaryChart.jsx";
import FilterBar from "../components/FilterBar.jsx";

export default function Dashboard() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-100 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Expense Tracker Application
        </h1>

        <TransactionForm />
        <FilterBar setFilters={setFilters} setPage={setPage} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TransactionList filters={filters} page={page} setPage={setPage} />
          <SummaryChart />
        </div>
      </div>
    </div>
  );
}