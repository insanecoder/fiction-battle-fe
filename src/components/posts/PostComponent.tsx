import { useEffect, useMemo, useState } from "react";
import { CardComponent } from "./CardComponent";
import type { PostType, Tag, TagType } from "../../types";
import { timeAgo, callAPI } from "../../common/utils/CommonUtils";
import { usePostsStore } from "../../store/PostsStore";

const PAGE_SIZE = 10;

export type PostsFilter = {
  text?: string;
  universe?: ("HP" | "GOT")[];
  person?: string[];
  place?: string[];
  events?: string[];
  artifacts?: string[];
};

type PostResp = {
  postId: string;
  user: { userId: string; name: string; email: string; photo: string };
  content: string;
  resolvedTags: { _id: string; type: TagType; label: string }[];
  createDateTime: string;
  universe: "HP" | "GOT";
  commentCount: number;
  likeCount: number;
  isLikedByCurrentUser: boolean;
};

type FetchPostsResult = { posts: PostType[]; hasMore: boolean };

function mapPost(post: PostResp): PostType {
  const tags: Tag[] = (post.resolvedTags ?? []).map((t) => ({
    tagId: t._id,
    type:  t.type,
    label: t.label,
  }));

  return {
    postId:               post.postId,
    user:                 post.user,
    time:                 timeAgo((Date.now() - new Date(post.createDateTime).getTime()) / 1000),
    post:                 post.content,
    tags,
    commentCount:         post.commentCount,
    likeCount:            post.likeCount,
    isLikedByCurrentUser: post.isLikedByCurrentUser,
  };
}

async function fetchPosts(filter: PostsFilter, page: number): Promise<FetchPostsResult> {
  const respData = await callAPI<{ posts: PostResp[]; pagination: { hasMore: boolean } }>(
    "v1/posts/fetch-posts",
    { method: "POST", body: { ...filter, page, pageSize: PAGE_SIZE } }
  );
  return {
    posts:   respData.posts.map(mapPost),
    hasMore: respData.pagination.hasMore,
  };
}

export function PostComponent({ filter = {} }: { filter?: PostsFilter }) {
  const [posts, setPosts]           = useState<PostType[]>([]);
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(false);
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const refreshToken = usePostsStore((s) => s.refreshToken);

  const filterKey = useMemo(() => JSON.stringify(filter), [filter]);

  // Reset and fetch page 1 whenever filter changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setPosts([]);
    setPage(1);
    fetchPosts(JSON.parse(filterKey) as PostsFilter, 1)
      .then(({ posts: newPosts, hasMore: more }) => {
        setPosts(newPosts);
        setHasMore(more);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filterKey, refreshToken]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchPosts(JSON.parse(filterKey) as PostsFilter, nextPage)
      .then(({ posts: newPosts, hasMore: more }) => {
        setPosts((prev) => [...prev, ...newPosts]);
        setHasMore(more);
        setPage(nextPage);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingMore(false));
  };

  if (loading) return <div className="card">Loading posts...</div>;
  if (error)   return <div className="card text-red-500">Failed to load posts.</div>;
  if (!posts.length) return <div className="card">No posts yet.</div>;

  return (
    <>
      {posts.map((p) => (
        <CardComponent
          key={p.postId}
          postId={p.postId}
          user={p.user}
          post={p.post}
          time={p.time}
          tags={p.tags}
          commentCount={p.commentCount}
          likeCount={p.likeCount}
          isLikedByCurrentUser={p.isLikedByCurrentUser ?? false}
        />
      ))}
      <div className="flex items-center justify-center mb-10">
          {hasMore && (
        <button onClick={handleLoadMore} className="btn w-40 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105" disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      )}
      </div>
      
    </>
  );
}
