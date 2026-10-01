import { useState } from "react";
import { getFirebaseIdToken } from "../../common/utils/FirebaseUtils";
import type { PostComment } from "../../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type Props = {
    postId: string;
    commentId?: string;
    onSuccess: (comment: PostComment) => void;
    onCancel?: () => void;
};

export default function CommentBoxComponent({ postId, commentId, onSuccess, onCancel }: Props) {
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const url = commentId
        ? `${BASE_URL}v1/posts/${postId}/comments/${commentId}/replies`
        : `${BASE_URL}v1/posts/${postId}/comments`;

    const handleSubmit = async () => {
        if (!text.trim() || submitting) return;
        setSubmitting(true);
        try {
            const token = await getFirebaseIdToken();
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: text.trim() }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message ?? "Failed to post");
            onSuccess(json.data);
            setText("");
            onCancel?.();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center gap-2 mt-2 mb-2">
            <input
                className="flex-1 min-w-0 text-sm px-4 py-2 rounded-full border border-surface-border bg-surface-base dark:bg-dark-surface dark:border-dark-border outline-none focus:border-primary-base dark:focus:border-dark-theme-primary"
                type="text"
                placeholder={commentId ? "Write a reply..." : "Write a comment..."}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
                className="btn text-sm px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={submitting || !text.trim()}
            >
                {submitting ? "..." : "Post"}
            </button>
            {onCancel && (
                <button className="comment-action" onClick={onCancel}>Cancel</button>
            )}
        </div>
    );
}
