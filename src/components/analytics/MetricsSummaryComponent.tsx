type MetricsSummaryProps = {
    title : string,
    content : string,
    children : string
}
export default function MetricsSummaryComponent(props: MetricsSummaryProps) {
    return (
        <div className="shadow-md rounded-xl dark:bg-dark-metrics-card min-w-0">
            <div className="flex flex-col items-center text-center gap-1 py-4 px-3 sm:py-5 sm:px-6">
                <span className="text-xs sm:text-sm text-grey-base dark:text-dark-muted">{props.title}</span>
                <span className="text-primary-shade dark:text-primary-base font-black text-lg sm:text-xl truncate max-w-full">{props.content}</span>
            </div>
        </div>
    )
}