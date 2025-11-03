import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSummary } from "../features/transactions/transactionsSlice.js";

const COLORS = ["#4F46E5", "#F43F5E", "#22C55E", "#EAB308", "#3B82F6", "#A855F7"];

export default function SummaryChart() {
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  const chartData = summary.map((s) => ({
    name: `${s._id.type} - ${s._id.category}`,
    value: s.total,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Income vs Expense Summary</h2>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}