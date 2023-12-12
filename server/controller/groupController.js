import Session from "../models/sessionModel.mjs";

export const createGroup = async (sender, data) => {

  const { sessionId, subIdeaInputValue } = data;
  if (sessionId && subIdeaInputValue) {
    console.log(data)
    const session = await Session.findOne({ _id: sessionId });
    console.log(session)
    if (session && session.active === true) {
      session.groups.push({
        group: subIdeaInputValue,
        position: {
          x: 0,
          y: 0,
        },
      });
      await session.save();
      let allGroup = session.groups;
       console.log(allGroup)
      sender.emit("allGroup", { allGroup, id: session._id });
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////

export const deleteGroup = async (sender, data) => {
  const { id, sessionId } = data;
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      session.groups = session.groups.filter(({ _id }) => _id != id);

      await session.save();
      const allGroup = session.groups;

      sender.emit("allGroup", { allGroup, id: session._id });
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////
export const updatePosText = async (sender, data) => {
  const { id, sessionId, deltaPosition } = data;
 
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      const selectedGroup = session.groups.find(({ _id }) => _id == id);
      console.log(selectedGroup);
      selectedGroup.position.x = deltaPosition.x;
      selectedGroup.position.y = deltaPosition.y;
      await session.save();
    
      const allGroup = session.groups;

      sender.emit("allGroup", { allGroup, id: session._id });
    }
  }
};
