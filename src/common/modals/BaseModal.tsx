import type { ModalProps } from "../../types";

type BaseModalProps = ModalProps & {
    title:string;
    children:React.ReactNode;
}

export default function BaseModal(props:BaseModalProps) {
    if (!props.isOpen) return;
    return <div className="modal text-center" onClick={props.closeModal}>
        <div className="card rounded-lg min-w-96 m-0" onClick={(e)=>e.stopPropagation()}>
            <h1 className="text-2xl">
                {props.title}
            </h1>
            <div className="mt-3 text-center">
                {props.children}
            </div>
            
        </div>
    </div>
}