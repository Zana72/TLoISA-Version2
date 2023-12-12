
import Session from "../models/sessionModel.mjs";

///////////////////////////////////////////////////////////////////////////////////////////////////
//add goal
const createGoal = async (sender, data) => {
  const session = await Session.findOne({ _id: data.id });
  if (session && session.active === true) {
    session.goal = data.value;
    await session.save();
    const goal = session.goal;
    console.log(typeof goal);
    console.log(goal);
    sender.emit("goalRes", { goal, id: session._id });
    sender.emit("setWriting", false);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////



export default createGoal;
