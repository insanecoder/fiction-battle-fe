import { PieChart, ResponsiveContainer, Pie, Legend, Tooltip, Cell, Label } from "recharts";

// export default function PieChartComponent() {
//   const data = [
//     { name: "Jon Snow", value: 30, fill: "var(--chart-bar-got)" },
//     { name: "Harry Potter", value: 70, fill: "var(--chart-bar-hp)" },
//   ];

//   return (
//     <div className="w-full h-[260px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart margin={{ top: 10, right: 0, bottom: 10, left: 0 }}>
//           <Tooltip content={<PieTooltip />} />

//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             innerRadius={52}
//             outerRadius={80}
//             cx="50%"
//             cy="42%"
//             className="cursor-pointer"
//           >
//             {data.map((entry) => (
//               <Cell key={entry.name} fill={entry.fill} />
//             ))}
//           </Pie>

//           <Legend
//             verticalAlign="bottom"
//             align="center"
//             height={36}
//             content={() => <LegendContent data={data} />}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// const PieTooltip = ({ active, payload }) => {
//   if (!active || !payload?.length) return null;

//   const p = payload[0];
//   return (
//     <div className="rounded-md border bg-white px-3 py-2 shadow">
//       <p className="font-medium">{p.name}</p>
//       <p className="text-sm text-gray-600">{p.value} Posts</p>
//     </div>
//   );
// };

// const LegendContent = ({ data }) => {
//   return (
//     <div className="flex items-center justify-center gap-4">
//       {data.map((entry) => (
//         <div key={entry.name} className="flex items-center gap-2">
//           <div
//             className="h-3 w-3 rounded-full"
//             style={{ backgroundColor: entry.fill }}
//           />
//           <span className="text-sm">{entry.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };    


type UniverseShare = { name: "HP" | "GOT"; value: number };

type PieChartComponentProps = {
  data?: UniverseShare[];
};

export default function PieChartComponent({ data }: PieChartComponentProps) {
const universeShareData = (data ?? []).map((d) => ({
  ...d,
  fill: d.name === "HP" ? "var(--chart-bar-hp)" : "var(--chart-bar-got)",
}));

const winner = universeShareData.length
  ? universeShareData.reduce((a, b) => (a.value > b.value ? a : b))
  : { name: "—", value: 0 };
return (
<ResponsiveContainer width="100%" height={260}>
  <PieChart>
    <Tooltip content={<BattleShareTooltip />} />
    <Legend verticalAlign="bottom" height={36} />
    <Pie
      data={universeShareData}
      dataKey="value"
      nameKey="name"
      innerRadius={62}
      outerRadius={92}
      stroke="none"
      paddingAngle={2}
    >
      {universeShareData.map((entry) => (
        <Cell key={entry.name} fill={entry.fill} />
      ))}
      <Label
        position="center"
        content={() => (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan
              x="50%"
              dy="-2em"
              className="fill-[var(--color-grey-shade)] dark:fill-[var(--color-dark-ink)] text-[13px] font-medium"
            >
              {winner.name} leads
            </tspan>
            <tspan
              x="50%"
              dy="1.4em"
              className="fill-[var(--color-grey-shade)] dark:fill-[var(--color-dark-ink)] text-[20px] font-bold"
            >
              {winner.value}%
            </tspan>
          </text>
        )}
      />
    </Pie>
  </PieChart>
  
</ResponsiveContainer>
)
}


function BattleShareTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] px-4 py-3 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
      <p className="font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
        {data.name}
      </p>
      <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
        Battle Share: <span className="font-semibold">{data.value}%</span>
      </p>
    </div>
  );
}
