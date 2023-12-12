import mongoose from "mongoose";
export const groupSchema = new mongoose.Schema({
  group: {
    type: String,
    required: [true, "group is required"],
  },

  position: { x: Number, y: Number },
});
