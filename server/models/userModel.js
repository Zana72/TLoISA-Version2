import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username must be unique"],
  },
  session: {
    type: String,
  },
  btn: {
    type: String,
  },
  position: {
    x: 0,
    y: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
