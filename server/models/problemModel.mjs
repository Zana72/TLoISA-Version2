import mongoose from "mongoose";

export const problemSchema = new mongoose.Schema({
  problem: String,
  skillType:String,
  subType:String

});



