import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Atlas Connected');
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/forever`);
};

export default connectDB;
