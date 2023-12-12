import mongoose from "mongoose";

export const motivatorsSchema = new mongoose.Schema({
  subTargetId: String,
  motivator: String,
});


