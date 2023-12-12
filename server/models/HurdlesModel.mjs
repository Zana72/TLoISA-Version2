import mongoose from "mongoose";

export const HurdlesSchema = new mongoose.Schema({
  subTargetId: String,
  hurdler: String,
});


