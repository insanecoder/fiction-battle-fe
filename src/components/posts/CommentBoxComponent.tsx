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
        if (!text.trim()) return;
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
        <div className="flex gap-2 mt-2">
            <input
                className="card m-0 p-2 flex-1 text-sm"
                type="text"
                placeholder={commentId ? "Write a reply..." : "Write a comment..."}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button className="btn text-sm px-3" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "..." : "Post"}
            </button>
            {onCancel && (
                <button className="text-sm text-slate-400" onClick={onCancel}>Cancel</button>
            )}
        </div>
    );
}
