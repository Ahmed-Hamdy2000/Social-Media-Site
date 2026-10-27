import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js';



export async function createNewController(req,res) {
    
    try {
    const {name,email,password,code} = req.body;

    if (!name || !email || !password ||!code ){
      return res.status(400).send("Please fill all fields")
    }

    if(password.length < 8){
      return res.status(400).json({
        message:"Password needs to be at least 8 chars long"
      })
    }
    
    const userExists = await User.findOne({email});

    if (userExists){
      return res.status(400).send("User already exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        code
    });

    if (user){
      return res.json({
        _id:user.id,
        name: user.name,
        email:user.email,
        code:user.code,
        token:generateToken(user._id)
      })
    }

  } catch (error) {
        res.status(500).json({message:error.message})
  }
}

export async function loginController(req,res) {
    try {
      const { email,password } = req.body
      
        if (!email || !password){
            res.status(400).send("Login credentials mandatory")
        }

        const user = await User.findOne({email});

        if (!user){
          return res.status(400).json({message:"User not found"})
        }

        const userPassword = user.password;

        const matched = await bcrypt.compare(password, userPassword)

        if (matched){
            return res.json({
                _id: user.id,
                email:user.email,
                password: user.password,
                token: generateToken(user.id)
            })
        } else{
          return res.status(400).json({message:"Password or username incorrect"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export function getMyDetailsController(req,res) {
    try {
      const user = req.user;

      if(!user){
        return res.status(400).json({message:"User not found"})
      }
      
      return res.status(200).json({
          _id:user.id,
          name:user.name,
          email:user.email,
          code:user.code
      })
    } catch (error) {
      return res.status(500).json({message:"Error in getMyDetailsController"})
    }
}

export async function updateUserController(req, res) {
  try {
    const { name, email,code } = req.body;

    if (name === undefined && email === undefined && code === undefined) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const user = await User.findById(req.user._id);

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (code !== undefined) user.code = code;

    await user.save(); // runs schema validators: required, trim, lowercase, email regex

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)[0].message;
      return res.status(400).json({ message });
    }
    console.error("updateUserController:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updatePasswordController(req,res) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findById(req.user._id); // add .select('+password') if needed

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ message: "New password must differ from old one" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordChangedAt = Date.now();
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("updatePasswordController:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }

    const user = await User.findById(req.user._id); // add .select('+password') if you use select: false

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await user.deleteOne();

    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.error("deleteUserController:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// generate jwt token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}
