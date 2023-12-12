import mongoose from "mongoose";

export  const synthesisSchema = new mongoose.Schema({
  pairsId: String,
  text: String,
  type: String,
});


