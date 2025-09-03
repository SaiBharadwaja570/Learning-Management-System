import { Router } from "express";
import {
    createCourse,
    enrollInCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/course.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

// Create a new course
router.post("/", verifyJWT, createCourse);

// Retrieve all courses
router.get("/", getAllCourses);

// Retrieve a course by its ID
router.get("/:id", getCourseById);

// Update a course by its ID
router.put("/:id", verifyJWT, updateCourse);

// Delete a course by its ID
router.delete("/:id", verifyJWT, deleteCourse);

// Enroll in a course
router.post("/:id/enroll", verifyJWT, enrollInCourse);

export default router;