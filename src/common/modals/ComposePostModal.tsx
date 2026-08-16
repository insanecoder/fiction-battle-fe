import type { ModalProps, User } from "../../types";
import Button from "../components/Button";
import BaseModal from "./BaseModal";
import ProfileIcon from "../components/ProfileIcon";
import { callAPI } from "../utils/CommonUtils";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { logger } from "../utils/Logger";
import { usePostsStore } from "../../store/PostsStore";

type ComposeModalProps = ModalProps & {
    user : User
}
export default function ComposePostModal(props:ComposeModalProps) {
    const [postContent, setPostContent] = useState("")
    const [posting, setPosting] = useState(false)
    const toast = useToast()
    const triggerRefresh = usePostsStore((s) => s.triggerRefresh)

    const composePostCTA = async () => {
        setPosting(true)
        try {
            await callAPI("v1/posts/create-post", {
                "method" : "POST",
                "body" : {
                    "content": postContent
                }
            })
            setPostContent("")
            triggerRefresh()
            props.closeModal()
        } catch (err) {
            logger.error(`Failed to create post: ${err}`)
            toast.error("Failed to post. Please try again.")
        } finally {
            setPosting(false)
        }
    }
    return (
        <BaseModal
            isOpen={props.isOpen} 
            title="Compose a Post" 
            closeModal={props.closeModal}>
                <div>
                    <p className="text-sm text-left"> <ProfileIcon type="extra-small" user={props.user}/> {props.user?.userName}</p>
                    
                    <textarea name="post" className="h-40 w-full border px-5 py-2 mt-3 focus:inset-ring-primary-tint/30 border-surface-border rounded-sm" onChange={(e)=>setPostContent(e.target.value)}></textarea>
                    <p className="text-xs text-left">*Max 200 words</p>
                    
                    {/* <label htmlFor="post-file-upload" className=" border-surface-border cursor-pointer dark:border-dark-border p-3 w-fit rounded-md block my-3 border-2 ">  📎 Choose a file </label>
                    <input type="file" id="post-file-upload" accept="image/*" className="hidden" /> */}
                    
                    <div className="flex justify-end items-center">
                        <span className="cursor-pointer hover:scale-105" onClick={props.closeModal}>Cancel</span><Button handleClick={composePostCTA} disabled={posting} ariaLabel="Compose Post" type="primary" extraClasses="ml-3 py-2 px-4 dark:bg-primary-base/100 hover:scale-105 hover:bg-primary-shade/100">{posting ? "Posting..." : "Post"}</Button>
                    </div>
                </div>
        </BaseModal>
    )
}