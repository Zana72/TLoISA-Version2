import Session from "../models/sessionModel.mjs";

///////////////////////////////////////////////////////////////////////////

export const updateSessionTime = async (sender, data) => {
  const { sessionId, seconds, minutes } = data;

  if (sessionId) {
    const session = await Session.findOne({ _id: sessionId });

    if (session && session.active === true) {
      session.sessionTime.m = minutes;
      session.sessionTime.s = seconds;

      await session.save();
    
      const sessionTime = session.sessionTime;
    

      sender.emit("sessionTime", { sessionTime, id: session._id });
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////

export const blockedSession = async (data) => {
  if (data) {
    const session = await Session.findOne({ _id: data });

    if (session && session.active === true) {
      session.active = false;
      await session.save();
    }
  }
};

///////////////////////////////////////////////////////////////////////////

export const updateIdeaTime = async (sender, data) => {
  const { sessionId, seconds, minutes } = data;
  // console.log(data)
  if (sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    // console.log(session)
    if (session && session.active === true) {
      session.ideaTime.m = minutes;
      session.ideaTime.s = seconds;

      await session.save();
    
      const ideaTime = session.ideaTime;
    //  console.log(ideaTime)

      sender.emit("ideaTime", { ideaTime, id: session._id });
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////

