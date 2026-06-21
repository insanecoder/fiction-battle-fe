import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import CompactBattleAnalytics from "./Dummy2";

export default function Dashboard() {
  const stats = [
    { label: "Posts Today", value: 8 },
    { label: "Total Likes", value: "1,920" },
    { label: "Comments", value: 310 },
    { label: "Top Tag", value: "magic" },
  ];

  const barData = [
    { name: "Posts", HP: 5, GOT: 3 },
    { name: "Likes", HP: 920, GOT: 1000 },
    { name: "Comments", HP: 310, GOT: 210 },
  ];

  const tags = ["Hermione", "Tyrion", "Snow", "Dumbledore"];
  const activeTag = "Hermione";

  const pieData = [
    { name: "HP", value: 61.3 },
    { name: "GOT", value: 38.7 },
  ];
  const COLORS = ["#60a5fa", "#facc15"];

  const pulseData = [
    { name: "Tue", value: 10 },
    { name: "We", value: 12 },
    { name: "Thu", value: 20 },
    { name: "Fri", value: 28 },
    { name: "Mon", value: 22 },
  ];

  return (
    <>
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className=" text-3xl font-bold">
        Battle of Fiction{" "}
        <span className="text-gray-500 text-base font-normal">
          Click on a chart to apply a filter ↓
        </span>
      </h1>

      {/* KPI Row */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm"
          >
            <span className="text-sm text-gray-500">{s.label}</span>
            <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Left: HP vs GOT */}
        <div className="md:col-span-2 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <h4 className="font-semibold mb-3">HP vs GOT</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="HP" fill="#60a5fa" radius={4} />
              <Bar dataKey="GOT" fill="#facc15" radius={4} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-sm text-gray-500">
            Filtered by: <span className="font-medium">Harry Potter</span> •{" "}
            <button className="text-blue-500 hover:underline">Clear</button>
          </div>
        </div>

        {/* Right: Trending Tags + Engagement Share */}
        <div className="flex flex-col gap-6">
          {/* Trending Tags */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
            <h4 className="font-semibold mb-3">Trending Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-md text-sm border ${
                    t === activeTag
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        
                    {/* Bottom: The Pulse */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
        <h2 className="font-semibold mb-3">The Pulse</h2>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={pulseData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              fill="#bfdbfe"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
          
        </div>
      </div>


    </div>

    <CompactBattleAnalytics></CompactBattleAnalytics>

    </>
  );
}
