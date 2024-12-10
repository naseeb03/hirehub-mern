import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Job from '../models/Job.js'; // Assuming Job model exists
import { mockJobs } from '../utils/mockJobs.js'; // Assuming this file contains mock data

dotenv.config(); // Load environment variables from .env file

const seedJobs = async () => {
  try {
    await connectDB(); // Establish DB connection
    await Job.deleteMany(); // Clear existing jobs

    // Insert mock jobs into the database
    const createdJobs = await Job.insertMany(mockJobs);
    console.log(`${createdJobs.length} jobs have been added.`);

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedJobs();
