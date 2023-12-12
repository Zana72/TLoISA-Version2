import Session from "../models/sessionModel.mjs";
import User from "../models/userModel.js";

export const createSession = async (sender, sender2, data) => {
  console.log("##########",data);
  const { sessionName, username } = data;
  if ((sessionName, username)) {
    console.log(sessionName);
    const date = new Date().toString().substr(0, 25);
    const session = await Session.create({
      name: sessionName,
      active: true,
      timestamp: date,
      goal: "",
      metric: "",
      sessionTime: { m: 0, s: 0 },
      ideaTime: { m: 0, s: 0 },
      usersIn:1
    });
    const user = await User.findOne({ username: username });
    if (user) {
      console.log(user);
      user.session = session._id;
      user.btn = "Goals";
      await user.save();

      const allUser = await User.find();
      const sessions = await Session.find();
      sender.emit("allSession", sessions);
      sender2.emit("sessionsRes", {
        session,
        id: session._id,
        allUser: allUser,
      });
      sender2.emit("startTimer");
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////
export const getSession = async (sender, data) => {
  const { id, username } = data;
  if (id && id.length === 24 && username) {
    const session = await Session.findOne({ _id: id });
    

    if (session) {
      const activePairs = session.pairs.filter((sec) => sec.active === true);
      session.usersIn = session.usersIn + 1;
      await session.save()

      const user = await User.findOne({ username: username });
      if (user) {
        console.log(user);
        user.session = session._id;
        user.btn = "Goals";
        await user.save();
        const sentSession = await Session.findOne({ _id: id });
        const allUser = await User.find();
        console.log(allUser);

        sender.emit("sessionsRes", {
          session: sentSession,
          activePairs: activePairs[0],
          allUser: allUser,
        });
      }
    }
  }
};

export const getSessions = async (sender) => {
  const sessions = await Session.find();

  sender.emit("allSession", sessions);
};

export const deleteUserFromSession = async (sender, data) => {
 
  if (data) {
    const session = await Session.findOne({ _id: data });
    console.log("fffffffff",data);
    

    if (session) {
      const activePairs = session.pairs.filter((sec) => sec.active === true);
      session.usersIn = session.usersIn - 1;
      await session.save()
        const allUser = await User.find();
        console.log(allUser);

        sender.emit("sessionsRes", {
          session: session,
          activePairs: activePairs[0],
          allUser: allUser,
        });
      }
    }
  };
