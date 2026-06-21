type ButtonComponent = {
    type : "primary" | "inline",
    icon ?: React.ReactNode,
    children : React.ReactNode,
    extraClasses? : string,
    ariaLabel : string,
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Button(props : ButtonComponent) {
    let classNames:string = " btn ";
    if(props.type == "inline") {
        classNames += " btn-inline "
    }
    if (props.extraClasses) {
        classNames += props.extraClasses;
    }
    return <button aria-label={props.ariaLabel} className={classNames} onClick={props.handleClick}>
        <span className="flex justify-items-start gap-2 items-center shrink-0">
            {props.icon} <span className="inline-block text-center flex-1">{props.children}</span>
        </span>
    </button>
}