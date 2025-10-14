import mongoose from 'mongoose';
// Connect to MongoDB using Mongoose
// Ensure you have the MONGODB_URI in your .env file    
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
}