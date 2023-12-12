
import Session from "../models/sessionModel.mjs";

const createActivity = async (sender, data) => {
  const { value, id } = data;

  if (value && id) {
    const session = await Session.findOne({ _id: id });
    if(session && session.active === true){
    session.activities.push({ activity: value });
    await session.save();
    let allActivity = session.activities;
    sender.emit("allActivity", { allActivity,id:session._id });
    }
  }
};

export default createActivity;



/////////////////////////////////////////////////////////
// delete activity
export const deleteActivity = async (sender, data) => {
  const { sessionId, activityId } = data;
  if (sessionId && activityId) {
    // console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    if(session && session.active === true){
    console.log(session);
    session.activities = session.activities.filter(
      (active) => active._id != activityId
    );
    await session.save();

    let allActivity = session.activities;
    sender.emit("allActivity", { allActivity,id:session._id });
  }}
};
