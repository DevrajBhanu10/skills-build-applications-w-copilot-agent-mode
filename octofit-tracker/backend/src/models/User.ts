import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  profile?: {
    avatar?: string;
    bio?: string;
    city?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      select: false
    },
    profile: {
      avatar: String,
      bio: String,
      city: String
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
