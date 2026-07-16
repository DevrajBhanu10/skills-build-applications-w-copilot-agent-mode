import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'running' | 'cycling' | 'swimming' | 'gym' | 'walking' | 'yoga';
  distance?: number;
  duration: number;
  calories?: number;
  date: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'walking', 'yoga'],
      required: true
    },
    distance: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      required: true
    },
    calories: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
