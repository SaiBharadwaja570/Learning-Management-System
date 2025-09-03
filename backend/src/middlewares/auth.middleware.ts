import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

dotenv.config()

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    let token: string;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7); // remove "Bearer "
    } else {
      token = authHeader as string; // in case client sends raw token
    }
    
    if (!token) {
      return res.status(401).send({ // Changed from 404 to 401
        message: "No token provided! Please login!",
      });
    }
    // Check if JWT_SECRET exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error" 
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded;

    next();
  } catch (err: any) {
    return res.status(401).send({
      message: "Invalid or expired token",
    });
  }
};

export default verifyJWT;