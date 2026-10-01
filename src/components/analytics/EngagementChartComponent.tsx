import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type EngagementDatum = { universe: "HP" | "GOT"; likes: number; comments: number };

type EngagementChartComponentProps = {
  data?: EngagementDatum[];
};

const UNIVERSE_FILL: Record<"HP" | "GOT", string> = {
  HP:  "var(--chart-bar-hp)",
  GOT: "var(--chart-bar-got)",
};

export default function EngagementChartComponent({ data }: EngagementChartComponentProps) {
    const engagementData = data ?? [];

    const likesData    = engagementData.map((d) => ({ universe: d.universe, value: d.likes }));
    const commentsData = engagementData.map((d) => ({ universe: d.universe, value: d.comments }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <MiniEngagementChart title="Likes" data={likesData} />
            <MiniEngagementChart title="Comments" data={commentsData} />
        </div>
    )
}

const compactFormatter = new Intl.NumberFormat("en", { notation: "compact" });
const compactNumber = (v: number) => compactFormatter.format(v);

function MiniEngagementChart({ title, data }: { title: string; data: { universe: "HP" | "GOT"; value: number }[] }) {
    return (
        <div>
            <p className="mb-1 text-xs font-medium text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
                {title}
            </p>
            <ResponsiveContainer width="100%" height={125}>
                <BarChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeOpacity={0.12} vertical={false} />
                    <XAxis dataKey="universe" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={compactNumber} />
                    <Tooltip content={<EngagementTooltip metric={title} />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={34}>
                        {data.map((d) => (
                            <Cell key={d.universe} fill={UNIVERSE_FILL[d.universe]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function EngagementTooltip({ active, payload, label, metric }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] px-4 py-3 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
      <p className="mb-1 font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
        {label}
      </p>
      <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
        {metric}: <span className="font-semibold">{payload[0].value}</span>
      </p>
    </div>
  );
}