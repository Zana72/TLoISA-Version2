import User from "../models/userModel.js";

export const updateUserBtn = async (sender, data) => {
  if (data.username) {
  const { username, btn } = data;
  // return console.log(data);
  await User.findOneAndUpdate({ username: username }, { btn: btn });
  const allUser = await User.find();

  sender.emit("allUser", allUser);
};}

export const updateUserPos = async (sender, data) => {
  if (data.username) {
  const { username, position } = data;
  await User.findOneAndUpdate({ username: username }, { position: position });
  const allUser = await User.find();

  sender.emit("allUser", allUser);
};
}
export const deleteUserSession = async (sender, data) => {
  if (data !== undefined) {
    const user = await User.findOne({ username: data });
    console.log(user);
    if (!user) return;
    if (user.session !== undefined) {
      user.session = undefined;
    }
    if (user.btn !== undefined) {
      user.btn = undefined;
    }
    await user.save();
    // return console.log(user)
    const allUser = await User.find();
    sender.emit("allUser", allUser);
  }
};
