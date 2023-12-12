import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import path from "path";
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////

import userRoutes from "./routes/userRoutes.js";

// Error handling
import AppError from "./utilities/AppError.js";
import ErrorHandler from "./utilities/ErrorHandler.js";
import connectDB from "./db.js";

import createBehavior, {
  deleteBehavior,
  addMotivator,
  addHurdler,
  deleteMotivator,
  deleteHurdle,
  updateBehaviorRight,
  updateBehaviorLeft,
  updateBeAnswer,
} from "./controller/behavior.controller.js";
import createPairs, {
  updatePairsUp,
  updatePairsDown,
  updatePairs,
} from "./controller/pairs.controller.js";
//////////////////////////////////////////////////////////
import createSynthesis, {
  deleteSynthesis,
} from "./controller/synthesisController.js";
////////////////////////////////////////////////////////////////////////
import createActivity, {
  deleteActivity,
} from "./controller/activityController.js";
////////////////////////////////////////////////////////////////////////
import createTargetGroup, {
  deleteTargetGroup,
} from "./controller/taegetGroupController.js";
////////////////////////////////////////////////////////////////////////
import createGoal from "./controller/goalController.js";
////////////////////////////////////////////////////////////////////////
import createMetric from "./controller/mertricController.js";
import {
  deleteProblem,
  createProblem,
  updateProblem,
} from "./controller/problemController.js";
///////////////////////////////////////////////////////////////////////////////////////
import {
  createIdea,
  deleteIdea,
  updatePos,
  addDot,
  removeDot,
} from "./controller/ideaController.js";

////////////////////////////////////////////////////////////////////////
import {
  createGroup,
  deleteGroup,
  updatePosText,
} from "./controller/groupController.js";

////////////////////////////////////////////////////////////////////////
import {
  getSessions,
  getSession,
  createSession,
  deleteUserFromSession,
} from "./controller/sessionController.js";

////////////////////////////////////////////////////////////////////////
import {
  updateSessionTime,
  blockedSession,
  updateIdeaTime,
} from "./controller/timeController.js";

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
import {
  updateUserPos,
  updateUserBtn,
  deleteUserSession
  
} from "./controller/userController.js";

////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));

const expressServer = app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

/////////////////////////
let allUser = [];
let counter = {
  Collect: 0,
  Goals: 0,
  Prioritize: 0,
  behavior: 0,
  userRes: 0,
  Gratification: 0,
  Profile: 0,
  SkillAtom: 0,
  Problems: 0,
  FocusQuestions: 0,
  Cluster: 0,
};

/////////////////////////

/////////////////////////

io.on("connection", (socket) => {
  // navbar  //////////////////////////////////////////////////////////////////////////////

  getSessions(socket);

  socket.on("update-counter", (data) => {
    const { pervBtn, lastBtn, userName } = data;
    // update allUser

    if (userName && lastBtn && allUser.length === 0) {
      allUser = [
        ...allUser,
        { socketId: socket.id, btn: lastBtn, userName: userName },
      ];
    } else if (allUser.length !== 0 && userName && lastBtn) {
      const Number = (element) => element.socketId === socket.id;
      const index = allUser.findIndex(Number);

      if (index !== -1) {
        allUser[index].btn = lastBtn;
      } else {
        allUser = [
          ...allUser,
          { socketId: socket.id, btn: lastBtn, userName: userName },
        ];
      }
    }

    ///////////////////////////////////////////////////////////
    // counter
    if (lastBtn && pervBtn && counter[pervBtn] > 0 && !(lastBtn === pervBtn)) {
      counter = {
        ...counter,
        [lastBtn]: counter[lastBtn] + 1,
        [pervBtn]: counter[pervBtn] - 1,
      };
    } else if (lastBtn && !(lastBtn === pervBtn)) {
      counter = {
        ...counter,
        [lastBtn]: counter[lastBtn] + 1,
      };
    } else if (lastBtn === pervBtn && lastBtn) {
      counter = {
        ...counter,
        [lastBtn]: counter[lastBtn] + 0,
      };
    }
    io.emit("counter_res", { counter, allUser });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////

  // GROUUUUUUUUUUUUUUUUP
  // ON TYPING
  socket.on("group typing", (data) => {
    io.sockets.emit("group typing", data);
  });

  // ON FOCUS
  socket.on("group disable input", (data) => {
    socket.broadcast.emit("group disable", data);
  });

  // ON BLUR
  socket.on("group enable input", (data) => {
    socket.broadcast.emit("group enable", data);
  });

  

  

  // ACTIVIIIESS

  // ON TYPING
  socket.on("activity typing", (data) => {
    io.sockets.emit("activity typing", data);
  });

  // ON FOCUS
  socket.on("activity disable input", (data) => {
    socket.broadcast.emit("activity disable", data);
  });

  // ON BLUR
  socket.on("activity enable input", (data) => {
    socket.broadcast.emit("activity enable", data);
  });

  // ON SUBMIT
  socket.on("send", (data) => {
    socket.broadcast.emit("send", data);
  });

  // ADD ACTIVITY

  socket.on("add activity", (data) => {
    socket.broadcast.emit("add activity", data);
  });

  // DELETE ACTIVITY

  socket.on("delete activity", () => {
    socket.broadcast.emit("delete activity");
  });

  // ON MOUSE MOVEMENT

  // socket.on("mouse moving", (data) => {
  //   socket.broadcast.emit("mouse moving", data);
  // });

  // GOAL AND METRIC
  // GOOAL
  socket.on("goal writing", (data) => {
    socket.broadcast.emit("goal writing", data);
  });
  socket.on("close goal", (data) => {
    socket.broadcast.emit("close goal", data);
  });

  socket.on("goal disable input", (data) => {
    socket.broadcast.emit("goal disable", data);
  });
  socket.on("goal enable input", (data) => {
    socket.broadcast.emit("goal enable", data);
  });
  socket.on("goal typing", (data) => {
    io.sockets.emit("goal typing", data);
  });
  

  // METRICC
  socket.on("metric writing", (data) => {
    socket.broadcast.emit("metric writing", data);
  });
  socket.on("close metric", (data) => {
    socket.broadcast.emit("close metric", data);
  });

  socket.on("metric disable input", (data) => {
    socket.broadcast.emit("metric disable", data);
  });
  socket.on("metric enable input", (data) => {
    socket.broadcast.emit("metric enable", data);
  });
  socket.on("metric typing", (data) => {
    io.sockets.emit("metric typing", data);
  });
  socket.on("edit metric", (data) => {
    socket.broadcast.emit("edit metric", data);
  });
  ///////////////////////////////////////////////////////////////////////////////////
  //Behavior
  // ON TYPING
  socket.on("behavior typing", (data) => {
    io.sockets.emit("behavior typing", data);
  });

  // ON FOCUS
  socket.on("behavior disable input", (data) => {
    socket.broadcast.emit("behavior disable", data);
  });

  // ON BLUR
  socket.on("behavior enable input", (data) => {
    socket.broadcast.emit("behavior enable", data);
  });

  // ON SUBMIT
  socket.on("send", (data) => {
    socket.broadcast.emit("send", data);
  });

  //////////////////////////////////////////////////////////////////////////////

  //motivator
  // ON TYPING
  socket.on("Motivator typing", (data) => {
    io.sockets.emit("Motivator typing", data);
  });

  // ON FOCUS
  socket.on("Motivator disable input", () => {
    socket.broadcast.emit("Motivator disable");
  });

  // ON BLUR
  socket.on("Motivator enable input", () => {
    socket.broadcast.emit("Motivator enable");
  });

  // ON SUBMIT
  socket.on("send", (data) => {
    socket.broadcast.emit("send", data);
  });

  //////////////////////////////////////////////////////////////////////////////

  //handler
  // ON TYPING
  socket.on("Handler typing", (data) => {
    io.sockets.emit("Handler typing", data);
  });

  // ON FOCUS
  socket.on("Handler disable input", () => {
    socket.broadcast.emit("Handler disable");
  });

  // ON BLUR
  socket.on("Handler enable input", () => {
    socket.broadcast.emit("Handler enable");
  });

  // ON SUBMIT
  socket.on("send", (data) => {
    socket.broadcast.emit("send", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  

  socket.on("close motivation", (data) => {
    socket.broadcast.emit("close motivation", data);
  });

  socket.on("close goals", (data) => {
    socket.broadcast.emit("close goals", data);
  });
  socket.on("close actions", (data) => {
    socket.broadcast.emit("close actions", data);
  });
  socket.on("close rules", (data) => {
    socket.broadcast.emit("close rules", data);
  });
  socket.on("close feedback", (data) => {
    socket.broadcast.emit("close feedback", data);
  });
  socket.on("close challenges", (data) => {
    socket.broadcast.emit("close challenges", data);
  });
  socket.on("close-group", (data) => {
    socket.broadcast.emit("close-group", data);
  });
  socket.on("close-activity", (data) => {
    socket.broadcast.emit("close-activity", data);
  });
  socket.on("close behavior", (data) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    socket.broadcast.emit("close behavior", data);
  });

  //Feedback

  socket.on("Feedback typing", (data) => {
    io.sockets.emit("Feedback typing", data);
  });
 

  // ON FOCUS
  socket.on("Feedback disable input", (data) => {
    socket.broadcast.emit("Feedback disable", data);
  });

  // ON BLUR
  socket.on("Feedback enable input", (data) => {
    socket.broadcast.emit("Feedback enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  //Goal

  socket.on("Goal typing", (data) => {
    io.sockets.emit("Goal typing", data);
  });

  // ON FOCUS
  socket.on("Goal disable input", (data) => {
    socket.broadcast.emit("Goal disable", data);
  });

  // ON BLUR
  socket.on("Goal enable input", (data) => {
    socket.broadcast.emit("Goal enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  //Challenge

  socket.on("Challenge typing", (data) => {
    io.sockets.emit("Challenge typing", data);
  });

  // ON FOCUS
  socket.on("Challenge disable input", (data) => {
    socket.broadcast.emit("Challenge disable", data);
  });

  // ON BLUR
  socket.on("Challenge enable input", (data) => {
    socket.broadcast.emit("Challenge enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  //Object

  socket.on("Action typing", (data) => {
    io.sockets.emit("Action typing", data);
  });

  // ON FOCUS
  socket.on("Action disable input", (data) => {
    socket.broadcast.emit("Action disable", data);
  });

  // ON BLUR
  socket.on("Action enable input", (data) => {
    socket.broadcast.emit("Action enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  //Rules

  socket.on("Rules typing", (data) => {
    io.sockets.emit("Rules typing", data);
  });

  // ON FOCUS
  socket.on("Rules disable input", (data) => {
    socket.broadcast.emit("Rules disable", data);
  });

  // ON BLUR
  socket.on("Rules enable input", (data) => {
    socket.broadcast.emit("Rules enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  // idea
  // ON TYPING
  socket.on("idea typing", (data) => {
    io.sockets.emit("idea typing", data);
  });

  // ON FOCUS
  socket.on("idea disable input", (data) => {
    socket.broadcast.emit("idea disable", data);
  });

  // ON BLUR
  socket.on("idea enable input", (data) => {
    socket.broadcast.emit("idea enable", data);
  });
  ///////////////////////////////////////////////////////////////////////////////
  // subIdea
  // ON TYPING
  socket.on("subIdea typing", (data) => {
    io.sockets.emit("subIdea typing", data);
  });

  // ON FOCUS
  socket.on("subIdea disable input", (data) => {
    socket.broadcast.emit("subIdea disable", data);
  });

  // ON BLUR
  socket.on("subIdea enable input", (data) => {
    socket.broadcast.emit("subIdea enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  // problem
  // ON TYPING
  socket.on("problem typing", (data) => {
    console.log(data);
    io.sockets.emit("problem typing", data);
  });

  // ON FOCUS
  socket.on("problem disable input", (data) => {
    socket.broadcast.emit("problem disable", data);
  });

  // ON BLUR
  socket.on("problem enable input", (data) => {
    socket.broadcast.emit("problem enable", data);
  });

  ///////////////////////////////////////////////////////////////////////////////

  // counter

  // socket.on("goals-metric", (data) => {
  //   io.emit("goals-metric-res", data);
  // });
  /////////////////////////////////////////////////////////////////////////
  // createPairs
  socket.on("pairs", (data) => {
    createPairs(io, data);
  });
///////////////////////////////////////////////////////////////////////////
// create note on create pairs
socket.on("note", (data) => {
  socket.broadcast.emit("notification",data)
});
  /////////////////////////////////////////////////////////////////////////
  //BEHAVIOR
  //createBehavior
  socket.on("createBehavior", (data) => {
    createBehavior(io, data);
  });
  /////////
  // deleteBehavior
  socket.on("deleteBehavior", (data) => {
    deleteBehavior(io, data);
  });

  /////////////////////////////////////////////////////////////////////////
  //updateBehaviorLeft
  socket.on("updateBehaviorLeft", (data) => {
    updateBehaviorLeft(io, data);
  });

  /////////////////////////////////////////////////////////////////////////
  //updateBehaviorRight
  socket.on("updateBehaviorRight", (data) => {
    updateBehaviorRight(io, data);
  });
  /////////////////////////////////////////////////////////////////////////
  //updateBeAnswer
  socket.on("updateBeAnswer", (data) => {
    updateBeAnswer(io, data);
  });
  /////////////////////////////////////////////////////////////////////////

  //MOTIVATOR
  //createMotivator
  socket.on("createMotivator", (data) => {
    addMotivator(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  // deleteMotivator
  socket.on("deleteMotivator", (data) => {
    // return console.log(data)
    deleteMotivator(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  //Hurdles
  //create Hurdles
  socket.on("createHurdles", (data) => {
    addHurdler(io, data);
  });
  /////////
  // delete Hurdles
  socket.on("deleteHurdles", (data) => {
    deleteHurdle(io, data);
  });
  ///////////////////////////////////////////////////////////////////////////////
  //update pairs
  socket.on("moveUp", (data) => {
    updatePairsUp(io, data);
  });
  /////////////////////////////////////////////////
  socket.on("moveDown", (data) => {
    updatePairsDown(io, data);
  });
  //////////////////////////////////////////////////
  socket.on("pick-pairs", (data) => {
    console.log(data);
    updatePairs(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  // addSynthesis
  socket.on("addSynthesis", (data) => {
    console.log("data");
    createSynthesis(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  // deleteSynthesis
  socket.on("deleteSynthesis", (data) => {
    console.log(data);
    deleteSynthesis(io, data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  // createGoal
  socket.on("createGoal", (data) => {
    console.log(data);
    createGoal(io, data);
  });
  ////////////////////////////////////////////////////////////////////////////////////
  socket.on("createMetric", (data) => {
    console.log(data);
    createMetric(io, data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  // createActivity
  socket.on("createActivity", (data) => {
    console.log("data");
    createActivity(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  // deleteActivity
  socket.on("deleteActivity", (data) => {
    deleteActivity(io, data);
  });
  ///////////////////////////////////////////////////////////////////////////////

  // createTargetGroup
  socket.on("createTargetGroup", (data) => {
    console.log("data");
    createTargetGroup(io, data);
  });
  //////////////////////////////////////////////////////////////////////////////
  // deleteTargetGroup
  socket.on("deleteTargetGroup", (data) => {
    console.log(data);
    deleteTargetGroup(io, data);
  });

  ///////////////////////////////////////////////////////////////////////////////
  //getSessions
  socket.on("createSession", (data) => {
 
    createSession(io, socket, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //getSessions
  socket.on("getSession", (data) => {
    getSession(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //createProblem
  socket.on("createProblem", (data) => {
    createProblem(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //updateProblem
  socket.on("updateProblem", (data) => {
    updateProblem(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //deleteProblem
  socket.on("deleteProblem", (data) => {
    console.log(data);
    deleteProblem(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //createIdea
  socket.on("createIdea", (data) => {
    createIdea(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //deleteIdea
  socket.on("deleteIdea", (data) => {
    deleteIdea(io, data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //prevType
  socket.on("prevType", (data) => {
    socket.broadcast.emit("prevType", data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //nextType
  socket.on("nextType", (data) => {
    socket.broadcast.emit("nextType", data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //prevLens
  socket.on("prevLens", (data) => {
    socket.broadcast.emit("prevLens", data);
  });
  /////////n//////////////////////////////////////////////////////////////////////
  //nextLens
  socket.on("nextLens", (data) => {
    socket.broadcast.emit("nextLens", data);
  });
  /////////n//////////////////////////////////////////////////////////////////////

  /////////n//////////////////////////////////////////////////////////////////////
  socket.on("goToNextLense", (data) => {
    socket.broadcast.emit("goToNextLense", data);
  });
  //////////////////////////////////////////////////////////////////////////
  // updatePos
  socket.on("updatePos", (data) => {
    updatePos(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  // addDot
  socket.on("addDot", (data) => {
    addDot(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //removeDot
  socket.on("removeDot", (data) => {
    removeDot(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //addGroup
  socket.on("createGroup", (data) => {
    createGroup(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //addGroup
  socket.on("deleteGroup", (data) => {
    deleteGroup(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //addGroup
  socket.on("updatePosText", (data) => {
    updatePosText(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //seTimer
  socket.on("seTimer", (data) => {
    updateSessionTime(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //blockedSession
  socket.on("blockedSession", (data) => {
    //return console.log(data)
    blockedSession(data);
  });
  //////////////////////////////////////////////////////////////////////////
  socket.on("setIdeaTimer", (data) => {
    // console.log(data)
    updateIdeaTime(io, data);
  });
  //////////////////////////////////////////////////////////////////////////
  //blockedSession
  socket.on("blockedIdea", (data) => {
    io.emit("blockedIdea", data);
  });
  //blockedSession
  socket.on("ideaEnable", (data) => {
    io.emit("ideaEnable", data);
  });
  //////////////////////////////////////////////////////////////////////////
// updateUserBos
socket.on("updateUserPos", (data) => {
  // return console.log(data);
    updateUserPos(io, data);
});
  //////////////////////////////////////////////////////////////////////////
// updateUserBos
socket.on("deleteUserSession", (data) => {

  deleteUserSession(io, data);
});

  //////////////////////////////////////////////////////////////////////////
// updateUserBos
socket.on("updateUserBtn", (data) => {
  // return console.log(data);
  updateUserBtn(io, data);
});
socket.on("deleteUserFromSession", (data) => {
  console.log("f",data);
  // return console.log(data);
  deleteUserFromSession(io, data);
});



  //////////////////////////////////////////////////////////////////////////
  // disconnect
  socket.on("disconnect", () => {
    if (allUser.length > 0) {
      const del = allUser.filter((u) => u.socketId === socket.id)[0];
      if (del) {
        counter = {
          ...counter,
          [del.btn]: counter[del.btn] - 1,
        };
        delete allUser[socket.id];
        ////////////////////////////////////////////////////////////////////
        allUser = allUser.filter((u) => u.socketId !== socket.id);

        io.emit("disconnect_user", { counter, allUser });
      }
    }
  });
});

app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(ErrorHandler);
