// CompactBattleAnalytics.tsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

type Props = {
  onSelectUniverse?: (u: "Harry Potter" | "Game of Thrones") => void;
  onSelectCharacter?: (name: string) => void;
  onSelectDay?: (day: string) => void;
};

// Color tokens (kept minimal + consistent)
const C = {
  hp: "#60a5fa", // HP blue
  got: "#f59e0b", // GOT amber
  axis: "#cbd5e1",
  grid: "rgba(255,255,255,0.08)",
  like: "#38bdf8",
  comment: "#a78bfa",
  share: "#10b981",
};

const Card: React.FC<{ title: string; ariaLabel: string; children: React.ReactNode; height?: number }> = ({
  title,
  ariaLabel,
  children,
  height = 260,
}) => (
  <section
    role="region"
    aria-label={ariaLabel}
    className="rounded-xl bg-slate-900/70 dark:bg-slate-800/70 shadow-sm ring-1 ring-slate-700/40 hover:shadow-md transition-all"
    style={{ height }}
  >
    <header className="px-3 py-2 border-b border-slate-700/30">
      <h3 className="text-[11px] font-semibold tracking-wide text-slate-300 uppercase text-center line-clamp-1">
        {title}
      </h3>
    </header>
    <div className="p-2 h-[calc(100%-36px)]">{children}</div>
  </section>
);

// Small KPI chip with tiny sparkline
const KpiChip: React.FC<{ label: string; value: string | number; data: any[]; color: string; dataKey: string }> = ({
  label,
  value,
  data,
  color,
  dataKey,
}) => (
  <div className="flex items-center gap-2 rounded-lg bg-slate-900/70 dark:bg-slate-800/70 px-3 py-2 ring-1 ring-slate-700/40">
    <div className="min-w-[68px]">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-100">{value}</div>
    </div>
    <div className="h-8 w-20">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 4, bottom: 0, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#grad-${label})`} strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function CompactBattleAnalytics({
  onSelectUniverse,
  onSelectCharacter,
  onSelectDay,
}: Props) {
  // ---------------- Dummy data (swap with live) ----------------
  const kpiTrend = [
    { d: "Mon", v: 30 },
    { d: "Tue", v: 42 },
    { d: "Wed", v: 36 },
    { d: "Thu", v: 64 },
    { d: "Fri", v: 48 },
    { d: "Sat", v: 78 },
    { d: "Sun", v: 52 },
  ];

  const popularity = [
    { name: "Harry Potter", HP: 640, GOT: 0 },
    { name: "Hermione", HP: 520, GOT: 0 },
    { name: "Ron", HP: 400, GOT: 0 },
    { name: "Jon Snow", HP: 0, GOT: 700 },
    { name: "Arya", HP: 0, GOT: 680 },
  ];

  const weekly = [
    { day: "Mon", HP: 30, GOT: 45 },
    { day: "Tue", HP: 50, GOT: 55 },
    { day: "Wed", HP: 35, GOT: 60 },
    { day: "Thu", HP: 60, GOT: 75 },
    { day: "Fri", HP: 45, GOT: 65 },
    { day: "Sat", HP: 70, GOT: 80 },
    { day: "Sun", HP: 55, GOT: 50 },
  ];

  const universeShare = [
    { name: "Harry Potter", value: 6420 },
    { name: "Game of Thrones", value: 8580 },
  ];

  // 100% view: per-universe engagement mix
  const engagementMix = [
    { u: "HP", Likes: 62, Comments: 28, Shares: 10 },
    { u: "GOT", Likes: 58, Comments: 32, Shares: 10 },
  ];

  // ---------------- Layout ----------------
  return (
    <div className="space-y-3">
      {/* KPI row (dense) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <KpiChip label="Posts today" value="1,240" data={kpiTrend} color={C.hp} dataKey="v" />
        <KpiChip label="Likes" value="8,540" data={kpiTrend} color={C.like} dataKey="v" />
        <KpiChip label="Comments" value="2,310" data={kpiTrend} color={C.comment} dataKey="v" />
        <KpiChip label="Top tag" value="Arya Stark" data={kpiTrend} color={C.got} dataKey="v" />
      </div>

      {/* Charts grid: compact 12-col layout with purposeful spans */}
      <div className="grid grid-cols-12 gap-3">
        {/* Character Popularity – dense, wider (7/12) */}
        <div className="col-span-12 lg:col-span-7">
          <Card title="Character Popularity (HP vs GOT)" ariaLabel="Character popularity leaderboard" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...popularity].sort((a, b) => b.HP + b.GOT - (a.HP + a.GOT))}
                layout="vertical"
                margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke={C.grid} />
                <XAxis type="number" stroke={C.axis} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" stroke={C.axis} tick={{ fontSize: 11 }} width={110} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.06)" }}
                  contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#e2e8f0" }}
                  labelFormatter={() => "Click to filter by character"}
                />
                <Bar
                  dataKey="HP"
                  fill={C.hp}
                  radius={[6, 6, 6, 6]}
                  maxBarSize={16}
                  onClick={(d: any) => onSelectCharacter?.(d.name)}
                  cursor="pointer"
                />
                <Bar
                  dataKey="GOT"
                  fill={C.got}
                  radius={[6, 6, 6, 6]}
                  maxBarSize={16}
                  onClick={(d: any) => onSelectCharacter?.(d.name)}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Universe Attention Share – compact donut (5/12) */}
        <div className="col-span-12 lg:col-span-5">
          <Card title="Universe Attention Share" ariaLabel="Universe attention share pie chart" height={280}>
            <div className="relative h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="hpGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={C.hp} />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="gotGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={C.got} />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={universeShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={86}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    onClick={(d: any) =>
                      onSelectUniverse?.((d?.name as "Harry Potter" | "Game of Thrones") ?? "Harry Potter")
                    }
                  >
                    <Cell fill="url(#hpGrad)" cursor="pointer" />
                    <Cell fill="url(#gotGrad)" cursor="pointer" />
                  </Pie>
                  <Tooltip
                    formatter={(v: any) => Number(v).toLocaleString()}
                    contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#e2e8f0" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center stat */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-100">
                  {(() => {
                    const t = universeShare.reduce((s, x) => s + x.value, 0);
                    const got = universeShare[1].value;
                    return `${Math.round((got / t) * 100)}% GOT`;
                  })()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Activity – smooth area (8/12) */}
        <div className="col-span-12 lg:col-span-8">
          <Card title="Weekly Activity Trend" ariaLabel="Weekly activity trend line chart" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly} margin={{ left: 8, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="hpArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.hp} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.hp} stopOpacity={0.06} />
                  </linearGradient>
                  <linearGradient id="gotArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.got} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={C.got} stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke={C.grid} />
                <XAxis dataKey="day" stroke={C.axis} tick={{ fontSize: 11 }} />
                <YAxis stroke={C.axis} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#e2e8f0" }}
                  labelFormatter={() => "Tap a point to filter"}
                />
                <Area
                  type="monotone"
                  dataKey="HP"
                  stroke={C.hp}
                  fill="url(#hpArea)"
                  strokeWidth={2}
                  activeDot={{ r: 3 }}
                  cursor="pointer"
                  onClick={(d: any) => onSelectDay?.(d?.day)}
                />
                <Area
                  type="monotone"
                  dataKey="GOT"
                  stroke={C.got}
                  fill="url(#gotArea)"
                  strokeWidth={2}
                  activeDot={{ r: 3 }}
                  cursor="pointer"
                  onClick={(d: any) => onSelectDay?.(d?.day)}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Engagement Mix – compact 100% bar (4/12) */}
        <div className="col-span-12 lg:col-span-4">
          <Card title="Engagement Mix (100%)" ariaLabel="Engagement mix 100 percent bar chart" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementMix} margin={{ left: 8, right: 8, top: 6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke={C.grid} />
                <XAxis dataKey="u" stroke={C.axis} tick={{ fontSize: 11 }} />
                <YAxis stroke={C.axis} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  formatter={(v: any) => `${v}%`}
                  contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#e2e8f0" }}
                />
                <Bar dataKey="Likes" stackId="a" fill={C.like} radius={[6, 0, 0, 6]} />
                <Bar dataKey="Comments" stackId="a" fill={C.comment} />
                <Bar dataKey="Shares" stackId="a" fill={C.share} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
