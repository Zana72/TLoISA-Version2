import mongoose from "mongoose";

export const ideaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: [true, "Idea is required"],
  },
  subType: {
    type: String,
    required: [true, "lense is required"],
  },
  dots:[String],
  
  position: { x: Number,
    y: Number,}
  
   
   
  
});
