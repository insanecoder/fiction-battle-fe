import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"
import EngagementChartComponent from "./EngagementChartComponent"
import MetricsSummaryComponent from "./MetricsSummaryComponent"
import PieChartComponent from "./PieChartComponent"

export default function AnalyticsComponent() {
    console.log("analytics rendered")
    return (
        <section className="mx-[var(--card-margin-default)] mb-10">
            <div className="mb-6 rounded-2xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-subtle)] px-6 py-4 dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface-subtle)]">
                <div className="flex items-center justify-between">
                    
                    <div>
                    <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
                        ⚔️ Current Battle Status
                    </p>
                    <h3 className="text-lg font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
                        Game of Thrones is leading
                    </h3>
                    </div>

                    <div className="text-right">
                    <p className="text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
                        Weekly Engagement
                    </p>
                    <p className="text-lg font-semibold text-[var(--color-tertiary-base)]">
                        +8% vs HP
                    </p>
                    </div>

                </div>
            </div>
            <div className="mb-3">
                <h2 className="text-3xl inline-block mr-2">Battle of Fiction </h2> <span className="text-sm text-grey-base dark:text-dark-muted">Click on a chart to apply a filter ↓</span>
            </div>
            <div className="flex justify-between mt-10 mb-16">
                <MetricsSummaryComponent title="Posts Today" content="8"> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Total Likes" content="1,920"> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Posts Comments" content="320"> </MetricsSummaryComponent>
                <MetricsSummaryComponent title="Top Tag" content="magic"> </MetricsSummaryComponent>
            </div>

            <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-[3fr_2fr]">
                    <BarChartComponent />
                    <PieChartComponent />
                </div>
                <div className="grid grid-cols-[7fr_3fr]">
                    <AreaChartComponent />
                    <EngagementChartComponent />
                </div>
            </div>
            
        </section>
    )
}