import { Router } from "express";
import { loginUser, registerUser, profile } from "../controllers/auth.controllers";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile', verifyJWT, profile)

export default router;