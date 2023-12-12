import Session from "../models/sessionModel.mjs";

const createTargetGroup = async (sender, data) => {
  // return console.log(data)
  const { value, id } = data;

  if (value && id) {
    const session = await Session.findOne({ _id: id });
    if (session && session.active === true) {
      session.targetGroups.push({ targetGroup: value });
      await session.save();
      let allTargetGroup = session.targetGroups;
      sender.emit("allTargetGroup", { allTargetGroup, id: session._id });
    }
  }
};

export default createTargetGroup;

/////////////////////////////////////////////////////////////////////////////

// delete subTarget
export const deleteTargetGroup = async (sender, data) => {
  const { sessionId, targetId } = data;
  if (sessionId && targetId) {
    // console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      console.log(session);
      session.targetGroups = session.targetGroups.filter(
        (target) => target._id != targetId
      );
      await session.save();

      let allTargetGroup = session.targetGroups;
      sender.emit("allTargetGroup", { allTargetGroup, id: session._id });
    }
  }
};
