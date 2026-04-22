// MongoDB connection singleton optimized for serverless (Netlify Functions)
import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('⚠️ MONGODB_URI is missing in .env.local! Falling back to seed data.');
    return null;
  }

  // Return cached connection if it's still alive
  if (cached.conn) {
    // Verify the connection is still active (serverless functions can freeze/thaw)
    if (cached.conn.connection.readyState === 1) {
      return cached.conn;
    }
    // Connection went stale, reset cache
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Serverless-optimized settings
      bufferCommands: false,
      maxPoolSize: 5,               // Keep pool small for serverless
      minPoolSize: 1,               // Maintain at least 1 connection
      maxIdleTimeMS: 10000,         // Close idle connections after 10s
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB unreachable
      socketTimeoutMS: 45000,       // Close sockets after 45s inactivity
      connectTimeoutMS: 10000,      // Connection attempt timeout
    }).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB not connected:', error.message);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
