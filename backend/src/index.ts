import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/config';
import authRouter from './routes/auth.routes';
import courseRouter from './routes/course.routes'

dotenv.config();


const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
  res.json({ message: 'TypeScript Node.js API is running!' });
});

// auth routes
app.use('/api/user', authRouter);
app.use('/api/course', courseRouter)


connectDB()
.then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });
})