import mongoose from "mongoose";

export const targetGroupSchema = new mongoose.Schema({
  targetGroup: {
    type: String,
    required: [true, "targetGroup is required"],
  },
});


