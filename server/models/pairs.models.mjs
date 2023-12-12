import mongoose from "mongoose";
export const pairsSchema = new mongoose.Schema({
    targetGroup:String,
    activity:String,
    priority:Number,
    active:Boolean,

})


