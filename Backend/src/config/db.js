const mongoose = require('mongoose');

const connectDb = async () => {
  const url = process.env.MONGODB_URL || process.env.MONGO_URL;

  if (!url) {
    console.warn('Missing MongoDB connection string. Set MONGODB_URL or MONGO_URL.');
    return;
  }

  try {
    await mongoose.connect(url);
    console.log('Mongodb Connection Success!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectDb;