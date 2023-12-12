import { problemSchema } from "../models/problemModel.mjs";
import Session from "../models/sessionModel.mjs";

export const createProblem = async (sender, data) => {
 
  const { subType, skillType, sessionId } = data;

  if (subType && skillType && sessionId) {
  
    const session = await Session.findOne({ _id: sessionId });
    
    if (session && session.active === true) {
      session.problems.push({
        problem: "",
        skillType: skillType,
        subType: subType,
      });

      await session.save();
      const allProblem = session.problems;
   
      sender.emit("allProblem", { allProblem, id: session._id });
    }
  }
};

////////////////////////////////////////////////////////////////////////////////
//updateProblem
export const updateProblem = async (sender, data) => {

  const { id,value, sessionId } = data;

  if (id && sessionId) {
   
    const session = await Session.findOne({ _id: sessionId });
  
    if (session && session.active === true) {
     const problem = session.problems.find(({_id})=> _id == id);
     problem.problem = value;
      await session.save();
      const allProblem = session.problems;
     

      sender.emit("allProblem", { allProblem, id: session._id });
    }
  }
};


/////////////////////////////////////////////////////////////////////////////////////
export const deleteProblem = async (sender, data) => {
  const { id, sessionId } = data;
  if (id && sessionId) {
    const session = await Session.findOne({ _id: sessionId });
if(session && session.active === true){
    session.problems = session.problems.filter(({ _id }) => _id != id);

    await session.save();
    const allProblem = session.problems;

    sender.emit("allProblem", { allProblem, id: session._id });
  }
  }
};
