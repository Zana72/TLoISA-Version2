
import mongoose from "mongoose";

 export const behaviorSchema = new mongoose.Schema({
    pairsId:String,
    name:String,
    priority:Number,
    motivations:[String],
    hurdler:[String],
    fitAnswers:[Boolean]
    
  
})





















