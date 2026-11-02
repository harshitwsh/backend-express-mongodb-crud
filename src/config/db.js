const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('\n⚠️  [MongoDB Warning] MONGO_URI in .env contains placeholder credentials.');
    console.warn('👉 Please replace <username> and <password> with your actual MongoDB Atlas credentials in the .env file.\n');
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Tip: Verify your IP is whitelisted in MongoDB Atlas (Network Access -> 0.0.0.0/0) and credentials in .env are correct.');
    // Do not terminate process in development so server can still serve health endpoints
  }
};

module.exports = connectDB;
