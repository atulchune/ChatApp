import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  console.log("inside api signup");
  const { email, fullName, password } = req.body;
  try {
    if (!email && !fullName && !password) {
      return res.status(400).json({ message: "All are required fileds" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 6" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Internal server Error ");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User Not Exists" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server  Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "looged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body
    const userID = req.user._id
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url})
    
    return res.status(200).json({updatedUser})
  } catch (error) {
    console.log("Error in update profile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = async (req, res) => {
  console.log(req.user, "re status");
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check Auth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
