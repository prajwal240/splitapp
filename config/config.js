const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Connect using URL from .env
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message); // Log error if connection fails
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB; // Export the connection function
