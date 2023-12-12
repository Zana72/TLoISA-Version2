
import Session from "../models/sessionModel.mjs";

const createPairs = async (sender, sessionId) => {
  if (sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    const activities = session.activities;
    const targets = session.targetGroups;
    // return  console.log(activities)
    session.pairs = [];
    await session.save();
    if (activities.length !== 0 && targets.length !== 0) {
      let pro = 0;
      for (var i = 0; i < targets.length; i++) {
        for (let x = 0; x < activities.length; x++) {
          session.pairs.push({
            priority: pro,
            activity: activities[x].activity,
            targetGroup: targets[i].targetGroup,
            active: false,
          });
          pro++;
        }
      }
      await session.save();
      const allPairs = session.pairs;
      console.log(allPairs);
      sender.emit("allPairs", { allPairs, activePairs: {}, id:session._id });
    }
  }
};

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePairsUp = async (sender, data) => {
  const { prio1, prio2, sessionId } = data;

  if (sessionId && prio1) {
    const session = await Session.findOne({ _id: sessionId });
    const pairs1 = session.pairs.find(({ priority }) => priority === prio1);
    const pairs2 = session.pairs.find(({ priority }) => priority === prio2);

    pairs1.priority = prio2;
    pairs2.priority = prio1;
    await session.save();
    session.pairs.sort((a, b) => {
      return a.priority - b.priority;
    });
    await session.save();
    let allPairs = session.pairs;

    const activePairs = session.pairs.find(({ active }) => active === true);
    sender.emit("allPairs", { allPairs, activePairs ,id:session._id });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePairsDown = async (sender, data) => {
  const { prio1, prio2, sessionId } = data;

  if (sessionId && prio2) {
    const session = await Session.findOne({ _id: sessionId });
    const pairs1 = session.pairs.find(({ priority }) => priority === prio1);
    const pairs2 = session.pairs.find(({ priority }) => priority === prio2);

    pairs1.priority = prio2;
    pairs2.priority = prio1;
    await session.save();
    session.pairs.sort((a, b) => {
      return a.priority - b.priority;
    });
    await session.save();
    let allPairs = session.pairs;

    const activePairs = session.pairs.find(({ active }) => active === true);
    sender.emit("allPairs", { allPairs, activePairs,id: session._id  });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updatePairs = async (sender, data) => {
  //  return console.log(data);
  const { id, sessionId } = data;
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
    // console.log(session);
    session.pairs.map((p) => (p.active = false));
    await session.save();
    const select = session.pairs.find(({ _id }) => _id == id);

    select.active = true;
    await session.save();
    let allPairs = session.pairs;

    const activePairs = session.pairs.find(({ active }) => active === true);
    console.log(activePairs);
    sender.emit("allPairs", { allPairs, activePairs,id:session._id  });
  }
};

export default createPairs;
