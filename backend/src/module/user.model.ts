import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  membership: { type: String, default: 'Normal' },
});

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  membership: string;
  createdAt: Date;
  updatedAt: Date;
}