import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// type BarChartData = {
//     name: string,
//     HP?: number,
//     GOT?: number,
//     fill: string,
//     value: number
// }
// export default function BarChartComponent() {
//     const data: BarChartData[] = [
//         { name: "Jon Snow", value: 700, fill: "var(--chart-bar-got)" },
//         { name: "Harry Potter", value: 680, fill: "var(--chart-bar-hp)" },
//         { name: "Arya", value: 640, fill: "var(--chart-bar-got)" },
//         { name: "Hermione", value: 520, fill: "var(--chart-bar-hp)" },
//         { name: "Ron", value: 520, fill: "var(--chart-bar-hp)" }
//     ];
//     // const color = 

//     return (
//         <ResponsiveContainer width="100%" height={250} >
//             <BarChart data={data} layout="vertical"
//                 margin={{ left: 24, right: 8, top: 16, bottom: 16 }}
//                 barSize={12}
//                 barGap={2}
//             >
//                 <XAxis type="number" padding={{right:20}}>
//                     <Label position="insideBottom" value="Posts" offset={-10} />
//                 </XAxis>
//                 <YAxis
//                     dataKey="name"
//                     type="category"
//                     width="auto"
//                     padding={{ top: 10 }}
//                 >
//                     <Label value="Characters" angle={-90} position="left" dy={-30} dx={-10} />
//                 </YAxis>

//                 <Tooltip
//                     content={<CustomTooltip />}
//                     cursor={{ fill: "rgba(148,163,184,0.08)" }} // slate-400/10 hover band
//                 />

//                 <Bar dataKey="value" radius={[4, 4, 4, 4]}
//                     shape={(props) => <Rectangle {...props} className="cursor-pointer" />}
//                     onClick={(entry: any, index: number)=>{console.log(entry.payload.name)}}
//                 >
//                     {/* One Cell per datum: set per-bar color (and stroke if you like) */}
//                     {data.map((d, i) => (
//                         <Cell key={i} fill={d.fill} stroke={d.fill} />
//                     ))}
//                     {/* Value on the right tip; hide null/0 */}
//                     <LabelList
//                         dataKey="value"
//                         position="right"
//                         formatter={(v) => (v == null || v === 0 ? "" : v)}
//                     />
                    
//                 </Bar>

//             </BarChart>
//         </ResponsiveContainer>
//     )
// }

// const CustomTooltip = ({ active, payload }: any) => {
//   if (!active || !payload?.length) return null;
//   const p = payload[0].payload; // { name, value, color, universe }

//   return (
//     <div className="min-w-44 rounded-xl border border-slate-400/25 bg-slate-900/95 p-3 text-white shadow-2xl">
//       <div className="mb-1.5 flex items-center gap-2">
//         <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
//         <strong className="text-sm">{p.name}</strong>
//         <span className="ml-auto text-xs/5 opacity-85">{p.universe}</span>
//       </div>
//       <div className="flex items-center justify-between text-sm">
//         <span className="opacity-90">Posts</span>
//         <span className="font-semibold">{p.value}</span>
//       </div>
//     </div>
//   );
// };

type TopCharacter = { name: string; posts: number; universe: "HP" | "GOT" };

type BarChartComponentProps = {
  data?: TopCharacter[];
};

export default function BarChartComponent({ data }: BarChartComponentProps) {
const topCharacterData = [...(data ?? [])].sort((a, b) => b.posts - a.posts);

return (
<ResponsiveContainer width="100%" height={280}>
  <BarChart
    data={topCharacterData}
    layout="vertical"
    margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
  >
    <CartesianGrid horizontal={false} strokeOpacity={0.12} />
    <XAxis type="number" />
    <YAxis
      type="category"
      dataKey="name"
      width={90}
      tickLine={false}
      axisLine={false}
    />
    <Tooltip content={<TopFighterTooltip />} />
    <Bar dataKey="posts" radius={[0, 10, 10, 0]}>
      {topCharacterData.map((entry, index) => {
        const isTop = index === 0;
        const fill =
          entry.universe === "GOT"
            ? "var(--chart-bar-got)"
            : "var(--chart-bar-hp)";

        return (
          <Cell
            key={entry.name}
            fill={fill}
            fillOpacity={isTop ? 1 : 0.78}
            stroke={isTop ? fill : "none"}
            strokeWidth={isTop ? 2 : 0}
          />
        );
      })}
      <LabelList
        dataKey="posts"
        position="right"
        className="fill-[var(--color-grey-base)] dark:fill-[var(--color-dark-muted)] text-sm font-medium"
      />
    </Bar>
  </BarChart>
</ResponsiveContainer>
)
}

const TopFighterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] px-4 py-3 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
      <p className="mb-1 font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
        {data.name}
      </p>
      <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
        Posts: <span className="font-semibold">{data.posts}</span>
      </p>
      <p className="text-xs text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
        Universe: {data.universe}
      </p>
    </div>
  );
}