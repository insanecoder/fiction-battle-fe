import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function EngagementChartComponent() {
   const engagementData = [
  { universe: "HP", likes: 980, comments: 420 },
  { universe: "GOT", likes: 1120, comments: 460 },
];

    return (
        <ResponsiveContainer width="100%">
            <BarChart data={engagementData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeOpacity={0.12} vertical={false} />
                <XAxis dataKey="universe" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<EngagementTooltip />} />
                <Legend />
                <Bar
                dataKey="likes"
                name="Likes"
                fill="var(--chart-bar-got)"
                radius={[8, 8, 0, 0]}
                barSize={34}
                />
                <Bar
                dataKey="comments"
                name="Comments"
                fill="var(--chart-bar-hp)"
                radius={[8, 8, 0, 0]}
                barSize={34}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

function EngagementTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] px-4 py-3 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
      <p className="mb-2 font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
        {label}
      </p>
      {payload.map((entry: any) => (
        <p
          key={entry.dataKey}
          className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]"
        >
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}