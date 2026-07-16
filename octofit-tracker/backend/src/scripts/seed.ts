import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 *
 * This script initializes the OctoFit database with sample data
 * for users, teams, activities, leaderboard entries, and workouts.
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    console.log(`📍 Connecting to MongoDB at ${MONGODB_URI}`);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing collections
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create sample users
    console.log('👥 Creating sample users...');
    const users = await User.insertMany([
      {
        email: 'alice@octofit.com',
        name: 'Alice Johnson',
        profile: {
          avatar: 'https://api.example.com/avatars/alice.jpg',
          bio: 'Marathon runner and fitness enthusiast',
          city: 'San Francisco'
        }
      },
      {
        email: 'bob@octofit.com',
        name: 'Bob Smith',
        profile: {
          avatar: 'https://api.example.com/avatars/bob.jpg',
          bio: 'Cycling and yoga lover',
          city: 'Austin'
        }
      },
      {
        email: 'charlie@octofit.com',
        name: 'Charlie Brown',
        profile: {
          avatar: 'https://api.example.com/avatars/charlie.jpg',
          bio: 'Gym enthusiast',
          city: 'New York'
        }
      },
      {
        email: 'diana@octofit.com',
        name: 'Diana Prince',
        profile: {
          avatar: 'https://api.example.com/avatars/diana.jpg',
          bio: 'Swimmer and triathlon trainer',
          city: 'Los Angeles'
        }
      },
      {
        email: 'eve@octofit.com',
        name: 'Eve Wilson',
        profile: {
          avatar: 'https://api.example.com/avatars/eve.jpg',
          bio: 'Yoga instructor',
          city: 'Seattle'
        }
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample teams
    console.log('🏆 Creating sample teams...');
    const teams = await Team.insertMany([
      {
        name: 'Team Alpha',
        description: 'The runners and marathoners',
        members: [users[0]._id, users[1]._id],
        leader: users[0]._id
      },
      {
        name: 'Team Beta',
        description: 'Strength and gym training focus',
        members: [users[2]._id, users[3]._id, users[4]._id],
        leader: users[2]._id
      },
      {
        name: 'Team Gamma',
        description: 'Water sports enthusiasts',
        members: [users[3]._id, users[0]._id],
        leader: users[3]._id
      }
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // Create sample activities
    console.log('🏃 Creating sample activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        distance: 10.5,
        duration: 60,
        calories: 850,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        type: 'running',
        distance: 8.2,
        duration: 48,
        calories: 650,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Evening jog'
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        distance: 32.5,
        duration: 90,
        calories: 750,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Mountain bike trail'
      },
      {
        userId: users[2]._id,
        type: 'gym',
        duration: 75,
        calories: 500,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Chest and triceps day'
      },
      {
        userId: users[3]._id,
        type: 'swimming',
        distance: 2.5,
        duration: 45,
        calories: 450,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        notes: 'Pool training'
      },
      {
        userId: users[4]._id,
        type: 'yoga',
        duration: 60,
        calories: 200,
        date: new Date(),
        notes: 'Morning yoga session'
      },
      {
        userId: users[0]._id,
        type: 'walking',
        distance: 5.0,
        duration: 45,
        calories: 250,
        date: new Date(),
        notes: 'Casual walk'
      }
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    console.log('🥇 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        activityType: 'running',
        score: 1850,
        rank: 1
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        activityType: 'cycling',
        score: 750,
        rank: 1
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        activityType: 'gym',
        score: 500,
        rank: 1
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        activityType: 'swimming',
        score: 450,
        rank: 2
      },
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        activityType: 'yoga',
        score: 200,
        rank: 1
      },
      {
        userId: users[0]._id,
        activityType: 'overall',
        score: 2600,
        rank: 1
      }
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    console.log('💪 Creating sample workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[2]._id,
        name: 'Full Body Strength',
        description: 'A comprehensive full-body workout',
        exercises: [
          { name: 'Squats', sets: 4, reps: 8, weight: 185 },
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Deadlifts', sets: 3, reps: 5, weight: 225 },
          { name: 'Pull-ups', sets: 3, reps: 10 }
        ],
        duration: 90,
        difficulty: 'advanced',
        category: 'strength'
      },
      {
        userId: users[0]._id,
        name: 'Beginner Running Plan',
        description: 'Start your running journey',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1, duration: 5 },
          { name: 'Interval sprints', sets: 1, reps: 1, duration: 20 },
          { name: 'Cool-down walk', sets: 1, reps: 1, duration: 5 }
        ],
        duration: 30,
        difficulty: 'beginner',
        category: 'cardio'
      },
      {
        userId: users[4]._id,
        name: 'Morning Yoga Flow',
        description: 'Energizing morning routine',
        exercises: [
          { name: 'Sun Salutations', sets: 5, reps: 1 },
          { name: 'Warrior Poses', sets: 3, reps: 1 },
          { name: 'Tree Pose', sets: 2, reps: 30 }
        ],
        duration: 60,
        difficulty: 'beginner',
        category: 'flexibility'
      },
      {
        userId: users[1]._id,
        name: 'Cycling Endurance',
        description: 'Build long-distance stamina',
        exercises: [
          { name: 'Steady-state cycling', sets: 1, reps: 1, duration: 120 },
          { name: 'Hill repeats', sets: 1, reps: 1, duration: 15 }
        ],
        duration: 135,
        difficulty: 'intermediate',
        category: 'endurance'
      }
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    // Summary
    console.log('\n✨ Database seeding complete!');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Leaderboard Entries: ${leaderboardEntries.length}`);
    console.log(`   - Workouts: ${workouts.length}`);
    console.log('\n🎉 OctoFit database is ready to use!');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
