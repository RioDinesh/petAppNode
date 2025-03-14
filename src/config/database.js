// Database configuration can be added here
// Example for MongoDB connection:

const mongoose = require('mongoose');

const connectDB = async () => {
 
  try {
    const conn = await mongoose.connect("mongodb://52.66.8.200:40001/petapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;



