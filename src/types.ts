  export type User = {
  userId: string;
  name: string;
  email: string;
  photo: string;
};

export type TagType = "person"|"place"|"artifact"|"event";

export type Tag = {
    tagId : string,
    type : TagType,
    label: string
}

// A single reply or comment on a post
export type PostComment = {
  _id: string;
  content: string;
  user: User;
  replyCount: number;
  createDateTime: string;
}

// The main post payload rendered by CardComponent
export type PostType = {
  postId: string
  user: User
  time: string
  post: string
  tags: Tag[]
  commentCount :         number
  likeCount :            number
  isLikedByCurrentUser?: boolean
}

export type ModalProps = {
    isOpen : boolean
    closeModal : ()=>void
}