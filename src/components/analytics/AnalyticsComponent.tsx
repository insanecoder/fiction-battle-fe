import { useEffect, useState } from "react"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"
import EngagementChartComponent from "./EngagementChartComponent"
import MetricsSummaryComponent from "./MetricsSummaryComponent"
import PieChartComponent from "./PieChartComponent"
import { fetchAnalyticsSummary, type AnalyticsSummary } from "./analyticsApi"
import { timeAgo } from "../../common/utils/CommonUtils"

export default function AnalyticsComponent() {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null)

    useEffect(() => {
        fetchAnalyticsSummary()
            .then(setSummary)
            .catch((err) => console.error("Failed to load analytics summary", err))
    }, [])

    const battleStatus = summary?.battleStatus
    const metrics = summary?.metrics
    const liveActivity = (summary?.liveActivity ?? []).map((a) => ({
        ...a,
        time: timeAgo((Date.now() - new Date(a.time).getTime()) / 1000),
    }))

    return (
        <section className="mx-[var(--card-margin-default)] mb-10">
            <div className="mb-6 rounded-2xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-subtle)] px-6 py-4 dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface-subtle)]">
                <div className="flex items-center justify-between">

                    <div>
                    <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
                        ⚔️ Current Battle Status
                    </p>
                    <h3 className="text-lg font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
                        {battleStatus?.label ?? "—"}
                    </h3>
                    </div>

                    <div className="text-right">
                    <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
                        Weekly Engagement
                    </p>
                    <p className="text-lg font-semibold text-[var(--color-tertiary-base)]">
                        {battleStatus ? `+${battleStatus.weeklyEngagementPct}% vs ${battleStatus.comparedTo}` : "—"}
                    </p>
                    </div>

                </div>
            </div>
            <div className="mb-3">
                <h2 className="text-3xl inline-block mr-2">Battle of Fiction </h2> <span className="text-sm text-grey-base dark:text-dark-muted">Click on a chart to apply a filter ↓</span>
            </div>
            <div className="flex justify-between mt-10 mb-16">
                <MetricsSummaryComponent title="Posts Today" content={String(metrics?.postsToday ?? "—")}> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Total Likes" content={metrics ? metrics.totalLikes.toLocaleString() : "—"}> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Posts Comments" content={metrics ? metrics.totalComments.toLocaleString() : "—"}> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Top Tag" content={metrics?.topTag ?? "—"}> </MetricsSummaryComponent>
            </div>

            <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-[3fr_2fr]">
                    <BarChartComponent data={summary?.topCharacters} />
                    <PieChartComponent data={summary?.universeShare} />
                </div>
                <div className="grid grid-cols-[7fr_3fr]">
                    <AreaChartComponent activities={liveActivity} />
                    <EngagementChartComponent data={summary?.engagement} />
                </div>
            </div>

        </section>
    )
}