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
            <div className="flex gap-3 py-1.5">
                <div className="w-8 h-8 shrink-0 *:w-8 *:h-8 *:text-xs *:object-cover">
                    <ProfileIcon user={comment.user}></ProfileIcon>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="comment self-start max-w-full">
                        <div className="font-bold text-sm dark:text-dark-ink">
                            {comment.user?.name ?? "Unknown"}
                        </div>
                        <div className="text-sm leading-relaxed break-words">{comment.content}</div>
                    </div>

                    <div className="flex gap-4 mt-1 ml-4">
                        {comment.replyCount > 0 && (
                            <button onClick={toggleReplies} className="comment-action">
                                {repliesVisible ? "Hide replies" : `${comment.replyCount} ${comment.replyCount === 1 ? "reply" : "replies"}`}
                            </button>
                        )}
                        {authUser && (
                            <button onClick={() => setReplyBoxOpen((v) => !v)} className="comment-action">
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
                <div className="border-l-2 border-surface-border dark:border-dark-border ml-4 pl-5">
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
