import express from "express";
import { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/CourseController.js";

const courseRoutes = express.Router();

courseRoutes.post("/", createCourse);
courseRoutes.get("/", getAllCourses);
courseRoutes.get("/:id", getCourseById);
courseRoutes.put("/:id", updateCourse);
courseRoutes.delete("/:id", deleteCourse);


export default courseRoutes;