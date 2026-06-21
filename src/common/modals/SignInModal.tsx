import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import BaseModal from "./BaseModal";
import type { ModalProps, User } from "../../types";

type SignInModalProps = ModalProps & {
    user: User
    loginUser : () => void
}

export default function SignInModal(props: SignInModalProps) {
    return (
        <BaseModal
            isOpen={props.isOpen} 
            title="Sign in to Compose a Post" 
            closeModal={props.closeModal}>
            <p className="text-sm">You must authenticate to compose a post</p>
            <Button ariaLabel="Sign In With Google" type="inline" icon={<span className="ml-5"><FcGoogle size={30} /></span>} extraClasses="w-[80%] text-center mt-5 text-md p-1" handleClick={props.loginUser}>Sign In With Google</Button>

            <div className="mt-5 border-t relative h-6 border-surface-border-subtle dark:border-dark-border"><div className="absolute left-1/2 bg-white dark:bg-dark-surface-subtle -translate-x-1/2 -top-1/2 w-10">OR</div></div>

            <p className="text-sm underline cursor-pointer hover:scale-105" onClick={props.closeModal}>Continue without logging in</p>
        </BaseModal>
    )
}