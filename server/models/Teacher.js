import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  photo: String,
  subject: String,
  school: String,
  location: String,
  experience: String,
  education: String,
  bio: String,
  skills: [String],
  achievements: [String],
  certificates: [String]
},{
  timestamps:true
});

export default mongoose.model("Teacher", teacherSchema);
