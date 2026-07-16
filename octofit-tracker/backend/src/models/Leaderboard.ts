import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  activityType: 'running' | 'cycling' | 'swimming' | 'gym' | 'walking' | 'yoga' | 'overall';
  score: number;
  rank: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'walking', 'yoga', 'overall'],
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: false }
);

leaderboardSchema.index({ teamId: 1, activityType: 1, score: -1 });
leaderboardSchema.index({ userId: 1, activityType: 1 });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
