import { useState } from "react";
import TagsComponent from "./TagsComponent";
import CommentComponent from "./CommentComponent";
import CommentBoxComponent from "./CommentBoxComponent";
import ProfileIcon from "../../common/components/ProfileIcon";
import { useAuthStore } from "../../store/AuthStore";
import { callAPI } from "../../common/utils/CommonUtils";
import { type PostComment, type Tag, type User } from "../../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type CardProps = {
    postId: string;
    user: User;
    post: string;
    time: string;
    tags: Tag[];
    likeCount: number;
    commentCount: number;
    isLikedByCurrentUser: boolean;
}

export function CardComponent({ postId, user, post, time, tags, likeCount, commentCount, isLikedByCurrentUser }: CardProps) {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [liked, setLiked] = useState(isLikedByCurrentUser);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
    const [likeError, setLikeError] = useState<string | null>(null);
    const authUser = useAuthStore((s) => s.user);

    const toggleComments = async () => {
        if (!commentsVisible && comments.length === 0) {
            setLoadingComments(true);
            const res = await fetch(`${BASE_URL}v1/posts/${postId}/comments`);
            const json = await res.json();
            setComments(json.data ?? []);
            setLoadingComments(false);
            setCommentsVisible((v) => !v);
        } else {
            setCommentsVisible((v) => !v);
        }
    };

    const handleLike = async () => {
        if (!authUser) {
            setLikeError("Please log in to like posts");
            setTimeout(() => setLikeError(null), 3000);
            return;
        }

        // optimistic update
        const prevLiked = liked;
        const prevCount = currentLikeCount;
        setLiked(!liked);
        setCurrentLikeCount((c) => liked ? c - 1 : c + 1);

        try {
            const result = await callAPI<{ liked: boolean; likeCount: number }>(
                `v1/posts/${postId}/like`,
                { method: "POST" }
            );
            setLiked(result.liked);
            setCurrentLikeCount(result.likeCount);
        } catch {
            // revert on failure
            setLiked(prevLiked);
            setCurrentLikeCount(prevCount);
        }
    };

    const handleCommentAdded = (comment: PostComment) => {
        setComments((prev) => [...prev, comment]);
    };

    return (
        <div className="card flex gap-4">
            <ProfileIcon type="default" user={user} />
            <div className="flex-1">
                <div className="flex gap-1.5 text-sm items-center text-slate-400 dark:text-dark-muted">
                    <span className="font-extrabold dark:text-dark-ink text-base">{user.name}</span>
                    <span>| {time}</span>
                </div>
                <p className="leading-post text-[0.9375rem]">{post}</p>

                <div>
                    {tags.map((t) => <TagsComponent key={t.tagId} tag={t} />)}
                </div>

                <div className="mt-2">
                    <div
                        className="pills cursor-pointer select-none"
                        onClick={handleLike}
                        title={authUser ? (liked ? "Unlike" : "Like") : "Log in to like"}
                    >
                        {currentLikeCount}{" "}
                        <span className={liked ? "text-red-500" : "text-slate-400"}>♥</span>
                    </div>
                    <div className="ml-2 pills cursor-pointer" onClick={toggleComments}>
                        💬 Comments ({commentCount})
                    </div>
                </div>

                {likeError && (
                    <p className="text-xs text-red-400 mt-1">{likeError}</p>
                )}

                {commentsVisible && (
                    <div className="mt-4">
                        {authUser && (
                            <CommentBoxComponent postId={postId} onSuccess={handleCommentAdded} />
                        )}
                        {loadingComments ? (
                            <div className="text-sm text-slate-400 mt-2">Loading comments...</div>
                        ) : (
                            comments.map((c) => (
                                <div key={c._id} className="mt-3">
                                    <CommentComponent comment={c} postId={postId} />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
