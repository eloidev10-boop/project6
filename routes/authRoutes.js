import express from "express";

import {
registerTeacher,
loginTeacher
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register",registerTeacher);

router.post("/login",loginTeacher);

export default router;
import express from "express";

import Teacher from "../models/Teacher.js";

const router = express.Router();

router.get("/", async(req,res)=>{

const teachers = await Teacher.find();

res.json(teachers);

});

router.get("/:id", async(req,res)=>{

const teacher = await Teacher.findById(
req.params.id
);

res.json(teacher);

});

export default router;
