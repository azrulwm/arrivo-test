import * as mongoose from 'mongoose';

export const CatergorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    activated: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export interface Category {
  categoryId: number;
  name: string;
  description: string;
  activated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
