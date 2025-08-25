import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({ message: "User Not found" }); 
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({
        message: "Incorrect Password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error" 
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).send({
      message: "Login Successfull",
      token: token
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const doesExist = await User.findOne({ email });

    if (doesExist) {
      return res.status(409).json({
        message: "User with this email already exist",
      });
    }

    const isUserNamePrsent = await User.findOne({ username });

    if (isUserNamePrsent) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).send({
      message: "User is created",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const profile = async (req:Request, res: Response) => {
  const userId = (req as any).user.id;

  const user = await User.findById(userId);

  return res.status(200).send({
    message: "Current User fetched",
    user
  })
}

export {
  loginUser,
  registerUser,
  profile
}
