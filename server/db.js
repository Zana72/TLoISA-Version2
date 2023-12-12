import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//const DB = process.env.MONGO_URI.replace("<password>", process.env.DB_PASSWORD);
//const DB = process.env.MONGO_URI

const DB = "mongodb://127.0.0.1:27017/GmaficationApps"

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
