import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    activated: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export interface Category {
  _id: string;
  categoryId: number;
  name: string;
  description: string;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
