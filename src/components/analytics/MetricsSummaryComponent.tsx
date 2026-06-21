type MetricsSummaryProps = {
    title : string,
    content : string,
    children : string
}
export default function MetricsSummaryComponent(props: MetricsSummaryProps) {
    return (
        <div className="shadow-md rounded-xl dark:bg-dark-metrics-card">
            <div className="flex flex-col items-center py-5 px-20">
                <span className="text-sm">{props.title}</span>
                <span className="text-primary-shade dark:text-primary-base font-black text-md">{props.content}</span>
            </div>
        </div>
    )
}