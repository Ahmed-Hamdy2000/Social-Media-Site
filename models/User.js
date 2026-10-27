import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please add a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },
  role: {
    type: String,
    enum: ['client', 'ops'],
    default: 'client'
  },
  code:{
    type: String,
    required: [true, "Please add company code"]
  },
  passwordChangedAt: {
    type:Date
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;