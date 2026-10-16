import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://hamdyelmady1_db_user:kLOn6AbpOzHl67sH@cluster0.vowapjl.mongodb.net/");
        console.log("Connected to MongoDB successfully")
        return mongoose
    } catch (errror) {
        console.log("Failed to conect to MongoDB due to errror")
        process.exit(1);

    }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}