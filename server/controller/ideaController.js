import Session from "../models/sessionModel.mjs";

export const createIdea = async (sender, data) => {
  const { subType, id, idea, deleted} = data;

  if (subType && id && idea) {
    const session = await Session.findOne({ _id: id });
    if (session && session.active === true) {
      session.ideas.push({
        idea: idea,
        subType: subType,
        delete: deleted,
        dots: [],
        position: {
          x: 150,
          y: 100,
        },
      });
      await session.save();
      let allIdea = session.ideas;
      console.log(allIdea);
      sender.emit("allIdea", { allIdea, id: session._id });
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////

export const deleteIdea = async (sender, data) => {
  const { id, sessionId } = data;
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      session.ideas = session.ideas.filter(({ _id }) => _id != id);

      await session.save();
      const allIdea = session.ideas;

      sender.emit("allIdea", { allIdea, id: session._id });
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////
export const updatePos = async (sender, data) => {
  const { id, sessionId, deltaPosition } = data;
  console.log(data);
  if (id && sessionId) {
    console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      const selectedIdea = session.ideas.find(({ _id }) => _id == id);
      console.log(selectedIdea);
      selectedIdea.position.x = deltaPosition.x;
      selectedIdea.position.y = deltaPosition.y;
      await session.save();
      console.log(selectedIdea);
      const allIdea = session.ideas;

      sender.emit("allIdea", { allIdea, id: session._id });
    }
  }
};
//////////////////////////////////////////////////////////////////////
export const addDot = async (sender, data) => {
  const { id, sessionId, name } = data;
  console.log(data);
  if (id && sessionId) {
    console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      const selectedIdea = await session.ideas.find(({ _id }) => _id == id);
      if (!selectedIdea.dots.includes(name)) {
       selectedIdea.dots.push(name);
        await session.save();
       
        const allIdea = session.ideas;

        sender.emit("allIdea", { allIdea, id: session._id });
      }
    }
  }
};
export const removeDot = async (sender, data) => {
  const { id, sessionId, name } = data;
  console.log(data);
  if (id && sessionId) {
    console.log(data);
    const session = await Session.findOne({ _id: sessionId });
    if (session && session.active === true) {
      const selectedIdea = session.ideas.find(({ _id }) => _id == id);
      if (selectedIdea.dots.includes(name)) {
        selectedIdea.dots = selectedIdea.dots.filter((dot) => dot !== name);
        await session.save();

        const allIdea = session.ideas;

        sender.emit("allIdea", { allIdea, id: session._id });
      }
    }
  }
};
