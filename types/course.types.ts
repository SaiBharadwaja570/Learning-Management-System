import { Types } from 'mongoose';

interface Course {
    title: string; 
    description?: string; 
    instructor: Types.ObjectId;
    students: Types.ObjectId[];
    publishedAt?: Date; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

export default Course;
