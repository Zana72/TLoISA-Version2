
import Session from "../models/sessionModel.mjs";
const createSynthesis = async (sender, data) => {
  console.log(data);
  const { pairsId, text, type, sessionId } = data;

  if ((text && type && pairsId, sessionId)) {
    const session = await Session.findOne({ _id: sessionId });

    if (session.active === true) {
      session.synthesis.push({
        text: text,
        pairsId: pairsId,
        type: type,
      });

      await session.save();

      let allSynthesis = session.synthesis;

      sender.emit("allSynthesis", { allSynthesis, id: session._id });
    }
  }
};

export default createSynthesis;

//////////////////////////////////////////////////////

// delete subTarget
export const deleteSynthesis = async (sender, data) => {
  const { id, sessionId } = data;
  if ((id.length === 24) && sessionId) {
    
    const session = await Session.findOne({ _id: sessionId });
    if (session.active === true) {
      session.synthesis = session.synthesis.filter(({ _id }) => _id != id);

      await session.save();

      let allSynthesis = session.synthesis;

      sender.emit("allSynthesis", { allSynthesis, id: session._id });
    }

    // await Synthesis.findByIdAndDelete({ _id: id });
    // let allSynthesis = await Synthesis.find();
    // sender.emit("allSynthesis", allSynthesis);
  }
};
