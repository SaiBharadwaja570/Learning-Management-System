import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("Authheader:",authHeader)
    const token =
      authHeader && typeof authHeader === "string"
        ? authHeader.substring(7)
        : null;
    if (!token) {
      return res.status(404).send({
        message: "No user present! please login!",
      });
    }

    console.log("Token:", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    console.log(decoded);

    // Call next() to pass control to the next middleware or route handler
    next();

  } catch (err) {
    return res.status(401).send({
      message: "Invalid or expired token",
    });
  }
};

export default verifyJWT
