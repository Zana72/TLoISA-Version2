import mongoose from "mongoose";

export const activitySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, "activity is required"],
  },
});

 


