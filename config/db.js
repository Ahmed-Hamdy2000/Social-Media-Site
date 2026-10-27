import "dotenv/config"
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOOSE);
        console.log("Connected to MongoDB successfully")
        return mongoose
    } catch (errror) {
        console.log("Failed to conect to MongoDB due to errror")
        process.exit(1);

    }
}

export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}