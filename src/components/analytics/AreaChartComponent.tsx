// import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// // const data = [
// //   { day: "Mon", HP: 30, GOT: 45 },
// //   { day: "Tue", HP: 50, GOT: 55 },
// //   { day: "Wed", HP: 35, GOT: 60 },
// //   { day: "Thu", HP: 60, GOT: 75 },
// //   { day: "Fri", HP: 45, GOT: 65 },
// //   { day: "Sat", HP: 70, GOT: 80 },
// //   { day: "Sun", HP: 55, GOT: 50 },
// // ];


//         const weeklyBattleData = [
//   { day: "Mon", hp: 30, got: 45 },
//   { day: "Tue", hp: 50, got: 55 },
//   { day: "Wed", hp: 35, got: 60 },
//   { day: "Thu", hp: 60, got: 76 },
//   { day: "Fri", hp: 45, got: 66 },
//   { day: "Sat", hp: 71, got: 81 },
//   { day: "Sun", hp: 52, got: 50 },
// ];


// export default function AreaChartComponent() {
//     return (
//         // <ResponsiveContainer width="100%" >
//         //     <AreaChart data={data}>
//         //         <XAxis dataKey="day" />
//         //         <YAxis />
//         //         <Tooltip />
//         //         <Area dataKey="HP" stroke="var(--chart-bar-hp)"></Area>
//         //         <Area dataKey="GOT" stroke="var(--chart-bar-got)"></Area>
//         //     </AreaChart>

//         // </ResponsiveContainer>


// <ResponsiveContainer width="100%" height={300}>
//   <AreaChart data={weeklyBattleData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
//     <CartesianGrid strokeOpacity={0.12} vertical={false} />
//     <XAxis dataKey="day" tickLine={false} axisLine={false} />
//     <YAxis tickLine={false} axisLine={false} />
//     <Tooltip content={<BattleMomentumTooltip />} />
//     <Legend verticalAlign="top" height={28} />
//     <Area
//       type="monotone"
//       dataKey="hp"
//       name="HP"
//       stroke="var(--chart-bar-hp)"
//       fill="var(--chart-bar-hp)"
//       fillOpacity={0.28}
//       strokeWidth={2.5}
//       activeDot={{ r: 5 }}
//     />
//     <Area
//       type="monotone"
//       dataKey="got"
//       name="GOT"
//       stroke="var(--chart-bar-got)"
//       fill="var(--chart-bar-got)"
//       fillOpacity={0.24}
//       strokeWidth={2.5}
//       activeDot={{ r: 5 }}
//     />
//   </AreaChart>
// </ResponsiveContainer>
//     )
// }

// // const AreaTooltip = ({ active, payload }: any) => {
// //   if (!active || !payload?.length) return null;
// //   const p = payload[0];
// //   return (
// //     <div className="card flex flex-col">
// //         <p>{p.day}</p>
// //         <p>{p.HP}</p>
// //         <p>{p.GOT}</p>
// //     </div>
// //   );
// // };

// function BattleMomentumTooltip({ active, payload, label }: any) {
//   if (!active || !payload?.length) return null;

//   const hp = payload.find((p: any) => p.dataKey === "hp")?.value ?? 0;
//   const got = payload.find((p: any) => p.dataKey === "got")?.value ?? 0;
//   const leader = hp === got ? "Tie" : hp > got ? "HP" : "GOT";
//   const diff = Math.abs(hp - got);

//   return (
//     <div className="rounded-xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] px-4 py-3 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
//       <p className="mb-2 font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
//         {label}
//       </p>
//       <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
//         HP: <span className="font-semibold">{hp}</span>
//       </p>
//       <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
//         GOT: <span className="font-semibold">{got}</span>
//       </p>
//       <p className="mt-1 text-xs font-medium text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
//         {leader === "Tie" ? "Even battle" : `${leader} leads by ${diff}`}
//       </p>
//     </div>
//   );
// }




import {
  Heart,
  MessageCircle,
  PenSquare,
  Swords,
} from "lucide-react";

type ActivityItem = {
  id: string;
  type: "POST" | "LIKE" | "COMMENT" | "TAG";
  text: string;
  time: string;
  universe?: "HP" | "GOT";
};

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "POST",
    text: "New post by Abhinav in GOT",
    time: "2m ago",
    universe: "GOT",
  },
  {
    id: "2",
    type: "LIKE",
    text: "Jon Snow debate received 12 new likes",
    time: "5m ago",
  },
  {
    id: "3",
    type: "COMMENT",
    text: "New comment on Harry Potter vs Voldemort thread",
    time: "9m ago",
    universe: "HP",
  },
  {
    id: "4",
    type: "TAG",
    text: "Arya Stark mentioned in a new post",
    time: "14m ago",
    universe: "GOT",
  },
];

function getIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "POST":
      return <PenSquare className="h-4 w-4" />;
    case "LIKE":
      return <Heart className="h-4 w-4" />;
    case "COMMENT":
      return <MessageCircle className="h-4 w-4" />;
    case "TAG":
      return <Swords className="h-4 w-4" />;
  }
}

function getIconStyles(type: ActivityItem["type"]) {
  switch (type) {
    case "POST":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
    case "LIKE":
      return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
    case "COMMENT":
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300";
    case "TAG":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  }
}

function getAccentBar(type: ActivityItem["type"]) {
  switch (type) {
    case "POST":
      return "bg-blue-500";
    case "LIKE":
      return "bg-rose-500";
    case "COMMENT":
      return "bg-violet-500";
    case "TAG":
      return "bg-amber-500";
  }
}

function UniverseBadge({ universe }: { universe?: "HP" | "GOT" }) {
  if (!universe) return null;

  return universe === "HP" ? (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
      HP
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800 dark:bg-blue-500/15 dark:text-blue-300">
      GOT
    </span>
  );
}

export default function LiveActivityCard() {
  return (
    <section className="  rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 h-[300px] overflow-y-scroll">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            ⚡ Live Activity
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Recent interactions across the platform
          </p>
        </div>

        <span className="rounded-full border border-green-200 bg-green-50/70 px-2.5 py-1 text-xs font-semibold text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-300">
          Live
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1">
        {activities.map((item) => (
          <article
            key={item.id}
            className="group relative flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-[1px] hover:bg-slate-50 hover:shadow-sm dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span
              className={`absolute left-0 top-4 h-8 w-1 rounded-r-full ${getAccentBar(
                item.type
              )}`}
            />

            <div
              className={`ml-2 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${getIconStyles(
                item.type
              )}`}
            >
              {getIcon(item.type)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  {item.text}
                </p>
                <UniverseBadge universe={item.universe} />
              </div>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {item.time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}