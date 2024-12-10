import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js'; // Assuming connectDB function exists
import Application from '../models/Application.js'; // Assuming Application model exists
import { mockApplications } from '../utils/mockApplications.js'; // Assuming this file contains mock data

dotenv.config(); // Load environment variables from .env file

const seedApplications = async () => {
  try {
    await connectDB(); // Establish DB connection
    await Application.deleteMany(); // Clear existing applications

    // Insert mock applications into the database
    const createdApplications = await Application.insertMany(mockApplications);
    console.log(`${createdApplications.length} applications have been added.`);

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedApplications();
