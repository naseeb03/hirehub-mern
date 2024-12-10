import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js'; // Assuming connectDB function exists
import User from '../models/User.js'; // Assuming User model exists
import { mockUsers } from '../utils/mockUsers.js'; // Assuming this file contains mock data

dotenv.config(); // Load environment variables from .env file

const seedUsers = async () => {
  try {
    await connectDB(); // Establish DB connection
    await User.deleteMany(); // Clear existing users

    // Insert mock users into the database
    const createdUsers = await User.insertMany(mockUsers);
    console.log(`${createdUsers.length} users have been added.`);

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
