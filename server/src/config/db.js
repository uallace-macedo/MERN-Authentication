import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`> MongoDB Connected: ${res.connection.host} (${res.connection.name})`);
  } catch (error) {
    console.error('> Errow while connecting to MongoDB', error.message);
  }
}

export default connectDB;
