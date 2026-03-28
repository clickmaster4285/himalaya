const mongoose = require('mongoose');


const connectDatabase = async () => {
  try {
    // Same host as MongoDB Compass "localhost:27017" — path = database name (visible in Compass sidebar).
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/himalaya";
    const conn = await mongoose.connect(mongoURI);
    const dbName = conn.connection.name;
    console.log(
      `🍃 MongoDB connected — host ${conn.connection.host}, database "${dbName}" (open this DB in Compass to see collections)`
    );
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

module.exports = { connectDatabase };
