import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    postId: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    categoryId: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'pending review'],
    },
    label: { type: String, required: true, enum: ['normal', 'premium'] },
  },
  { timestamps: true },
);

enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PENDING_REVIEW = 'pending review',
}

enum PostLabel {
  NORMAL = 'normal',
  PREMIUM = 'premium',
}

export interface Post {
  postId: number;
  title: string;
  body: string;
  categoryId: number;
  status: PostStatus;
  label: PostLabel;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostParam {
  postId?: number;
  title: string;
  body: string;
  categoryId: number;
  status: PostStatus;
  label: PostLabel;
}
