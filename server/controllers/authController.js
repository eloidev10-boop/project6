import Teacher from "../models/Teacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerTeacher = async(req,res)=>{

try{

const {
fullName,
email,
password
}=req.body;

const exists = await Teacher.findOne({email});

if(exists){
return res.status(400).json({
message:"Teacher exists"
});
}

const hashed = await bcrypt.hash(password,10);

const teacher = await Teacher.create({
fullName,
email,
password:hashed
});

res.status(201).json({
message:"Account created"
});

}catch(err){

res.status(500).json(err);

}

};
