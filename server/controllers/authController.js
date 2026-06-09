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
export const loginTeacher = async(req,res)=>{

const {email,password}=req.body;

const teacher = await Teacher.findOne({email});

if(!teacher){
return res.status(404).json({
message:"Teacher not found"
});
}

const match = await bcrypt.compare(
password,
teacher.password
);

if(!match){
return res.status(401).json({
message:"Invalid credentials"
});
}

const token = jwt.sign(
{
id:teacher._id
},
process.env.JWT_SECRET,
{
expiresIn:"7d"
}
);

res.json({
token,
teacher
});

};
