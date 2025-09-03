import { Schema, model } from "mongoose";
import CourseType from "../types/course.types";

const courseSchema = new Schema<CourseType>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    description: {
      type: String,
      maxLength: 1000,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ title: "text", description: "text" });

const Course = model("Course", courseSchema);

export default Course;
