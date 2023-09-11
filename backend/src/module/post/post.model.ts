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
