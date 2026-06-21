import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import CommentBoxComponent from "./CommentBoxComponent";
import type { PostComment } from "../../types";
import ProfileIcon from "../../common/components/ProfileIcon";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type CommentProp = {
    comment: PostComment;
    postId: string;
}

export default function CommentComponent({ comment, postId }: CommentProp) {
    const [repliesVisible, setRepliesVisible] = useState(false);
    const [replies, setReplies] = useState<PostComment[]>([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [replyBoxOpen, setReplyBoxOpen] = useState(false);
    const authUser = useAuthStore((s) => s.user);

    const fetchReplies = async () => {
        setLoadingReplies(true);
        const res = await fetch(`${BASE_URL}v1/posts/${postId}/comments/${comment._id}/replies`);
        const json = await res.json();
        setReplies(json.data ?? []);
        setLoadingReplies(false);
    };

    const toggleReplies = async () => {
        if (!repliesVisible && replies.length === 0) await fetchReplies();
        setRepliesVisible((v) => !v);
    };

    const handleReplyAdded = (reply: PostComment) => {
        setReplies((prev) => [...prev, reply]);
        setRepliesVisible(true);
        setReplyBoxOpen(false);
    };

    return (
        <>
            <div className="comment p-2 mt-1 flex gap-2">
                <div
                    className="profile-icon text-xs w-6 h-6 mr-2 self-start shrink-0"
                >
                    <ProfileIcon user={comment.user}></ProfileIcon>
                </div>
                <div className="flex flex-col flex-1">
                    <span className="font-extrabold text-sm dark:text-dark-ink">
                        {comment.user?.name ?? "Unknown"}
                    </span>
                    <div>{comment.content}</div>

                    <div className="flex gap-3 mt-1 text-xs text-slate-400">
                        {comment.replyCount > 0 && (
                            <button onClick={toggleReplies} className="hover:underline cursor-pointer">
                                {repliesVisible ? "Hide replies" : `${comment.replyCount} ${comment.replyCount === 1 ? "reply" : "replies"}`}
                            </button>
                        )}
                        {authUser && (
                            <button onClick={() => setReplyBoxOpen((v) => !v)} className="hover:underline cursor-pointer">
                                {replyBoxOpen ? "Cancel" : "Reply"}
                            </button>
                        )}
                    </div>

                    {replyBoxOpen && authUser && (
                        <CommentBoxComponent
                            postId={postId}
                            commentId={comment._id}
                            onSuccess={handleReplyAdded}
                            onCancel={() => setReplyBoxOpen(false)}
                        />
                    )}
                </div>
            </div>

            {repliesVisible && (
                <div className="border-l-2 border-dotted border-surface-border dark:border-dark-border ml-6">
                    {loadingReplies ? (
                        <div className="text-xs text-slate-400 p-2">Loading replies...</div>
                    ) : (
                        replies.map((r) => (
                            <CommentComponent key={r._id} comment={r} postId={postId} />
                        ))
                    )}
                </div>
            )}
        </>
    );
}
