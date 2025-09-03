import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string } | JwtPayload;
    }
  }
}
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" }); 
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password as any);
    if (!isPasswordCorrect) {
      // Same generic message for non-existent user or wrong password
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      // console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error" 
      });
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '24h' } // Added expiration time
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).send({
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
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

    const isUserNamePresent = await User.findOne({ username });

    if (isUserNamePresent) {
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
    console.error("Registration error:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: string }).id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }

    return res.status(200).send({
      message: "Current User fetched",
      user
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};



export {
  loginUser,
  registerUser,
  profile
}