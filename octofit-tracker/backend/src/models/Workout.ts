import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  exercises: IExercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'strength' | 'cardio' | 'flexibility' | 'endurance';
  createdAt?: Date;
  updatedAt?: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    weight: Number,
    duration: Number
  },
  { _id: false }
);

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    exercises: [exerciseSchema],
    duration: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    category: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'endurance'],
      required: true
    }
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
