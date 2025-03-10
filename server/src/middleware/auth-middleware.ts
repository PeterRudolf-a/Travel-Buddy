import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

/* export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => { */
  /* const token = req.header('Authorization');
  /* const token = req.header("Authorization")?.replace("Bearer ", "");
if (!token) {
  return res.status(401).json({ error: "Access denied. No token provided." });
}

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  } 
}; */

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("❌ ERROR: JWT_SECRET is not set in environment variables.");
    res.status(500).json({ error: "Internal server error. Please contact support." });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verified;
    return next();  // ✅ Ensure `next()` is always called if the token is valid
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};

