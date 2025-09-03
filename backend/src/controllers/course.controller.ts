import { Request, Response } from "express";
import Course from "../models/course.model";
import mongoose from "mongoose";


const createCourse = async (req: Request, res: Response) => {
    try {
        if (!req.user || req.user.role !== "instructor") {
            return res.status(401).json({ message: "Unauthorized access!" });
        }

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newCourse = await Course.create({
            title,
            description,
            instructor: req.user.id
        });

        return res.status(201).json({
            message: "New Course created",
            newCourse
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        return res.status(200).json(courses);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("instructor", "name email");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const enrollInCourse = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user || user.role !== "student") {
            return res.status(401).json({ message: "Only students can enroll in courses" });
        }

        const { id } = req.params;
        const userId = new mongoose.Types.ObjectId(user.id);

        // Use findOneAndUpdate with $addToSet for an atomic and idempotent operation
        const course = await Course.findOneAndUpdate(
            { 
                _id: id, 
                // Ensure user is not already enrolled
                students: { $ne: userId } 
            },
            { 
                // Add the student to the array
                $addToSet: { students: userId } 
            },
            { new: true } // Return the updated document
        );

        if (!course) {
            // This can mean course not found OR user already enrolled.
            // A check can be added to differentiate, but for now this is safer.
            return res.status(404).json({ message: "Course not found or you are already enrolled." });
        }

        return res.status(200).json({
            message: "Enrolled successfully",
            course
        });
    } catch (error: any) {
        return res.status(500).json({ message: "An internal server error occurred" });
    }
};

const updateCourse = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (req.user.role !== "instructor" || course.instructor.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized to update this course" });
        }

        const { title, description } = req.body;
        if (title) course.title = title;
        if (description) course.description = description;

        await course.save();

        return res.status(200).json({
            message: "Course updated",
            course
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCourse = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        if (req.user.role !== "instructor") {
            return res.status(401).json({ message: "Unauthorized to delete this course" });
        }

        // Atomically find and delete the course, ensuring the user is the instructor.
        const result = await Course.findOneAndDelete({ 
            _id: id, 
            instructor: req.user.id 
        });

        if (!result) {
            return res.status(404).json({ message: "Course not found or you are not the instructor." });
        }

        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ message: "An internal server error occurred" });
    }
};
export {
    createCourse,
    getAllCourses,
    getCourseById,
    enrollInCourse,
    updateCourse,
    deleteCourse
};
