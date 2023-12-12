import React, { useEffect, useReducer, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { socket } from "./socket";
import Strategy from "./components/Strategy/Strategy";
import GoalsAndMetrics from "./components/Strategy/GoalsAndMetrics";
import Home from "./components/Main/Home";
import GroupAndActivities from "./components/Strategy/GroupAndActivities";
import { Box, Typography } from "@mui/material";
import NavBar from "./components/Main/NavBar";
import Research from "./components/Research/Research";
import BehaviorChain from "./components/Research/Behavior";
import ActivitiesCollect from "./components/Strategy/ActivitiesCollect";
import ActivitiesPrioritize from "./components/Strategy/ActivitiesPrioritize";
import Profile from "./components/Research/Profile";
import GamificationFit from "./components/Research/GamificationFit";
import SkillAtom from "./components/Synthesis/SkillAtom";
import Synthesis from "./components/Synthesis/Synthesis";
import Identify from "./components/Synthesis/Identify";
import DesignLens from "./components/Synthesis/DesignLens";
import Ideation from "./components/Ideation/Ideation";
import FocusQuestions from "./components/Ideation/FocusQuestions";
import UserResearch from "./components/Research/UserResearch";
import Clustering from "./components/Ideation/Clustering";
import ButtonAppBar from "./components/Main/TopBar";

import Loading from "./components/Main/Loading";
// customer\TLoISA-master\client
function DrawerAppBar(props) {
  const [showNavBar, setShowNavBar] = useState(false);
  // let location = useLocation();
  const path = window.location.pathname;
console.log(path)
  ////////////////////////////////////////////////////////////////
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////

  const [user, setUser] = useState(localStorage.getItem("userName"));
  const [goal, setGoal] = useState("");
  const [metric, setMetric] = useState("");
  const [note, setNote] = useState(false)
  /////////////////////////////////////////////////////////////////////////
  const [activities, setActivities] = useState([]);
  const [targetGroups, setTargetGroups] = useState([]);
  const [allPairs, setAllPairs] = useState([]);
  const [allBehavior, setAllBehavior] = useState([]);
  const [allSynthesis, setAllSynthesis] = useState([]);
  const [activated, setActivated] = useState({});
  const [sessions, setSessions] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [problems, setProblems] = useState([]);

  const [session, setSession] = useState({});
  const [sessionTime, setSessionTime] = useState({ m: 0, s: 0 });
  const [sessionId, setSessionId] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [activeAllUser, setActiveAllUser] = useState([]);

  /////////////////////////////////////////////////////////////////////////////
console.log(session);
  ////////////////////////////////////////////////////////////////////

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
     // setMousePos({ x: event.clientX, y: event.clientY });
      setMousePos({ x: event.pageX, y: event.pageY });
      socket.emit("updateUserPos", {
        position: mousePos,
        username: localStorage.getItem("userName"),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.addEventListener("mousemove", handleMouseMove);
    };
  }, [mousePos]);
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    socket.on("allUser", (data) => {
      console.log(data)
      setAllUser(data);
    });
  }, []);
  const filterUser = useCallback((btn) => {
    return setActiveAllUser(
      allUser.filter((user) => user.session === session._id && user.btn === btn)
    );
  }, [allUser, session._id]);

  useEffect(() => {
    if (path === "/") {
      setActiveAllUser([])
    }
    if (path === "/strategy/goal") {
      filterUser("Goals");
    }
    if (path === "/activities/collect") {
      filterUser("Collect");
    }
    if (path === "/activities/prioritize") {
      filterUser("Prioritize");
    }
    if (path === "/research/behavior") {
      filterUser("behavior");
    }
    if (path === "/research/users") {
      filterUser("userRes");
    }
    if (path === "/research/doesfit") {
      filterUser("Gratification");
    }
    if (path === "/research/profile") {
      filterUser("Profile");
    }
    if (path === "/synthesis/skillatom") {
      filterUser("SkillAtom");
    }
    if (path === "/synthesis/identify") {
      filterUser("Problems");
    }
    if (path === "/ideation/focusquestions") {
      filterUser("FocusQuestions");
    }
    if (path === "/ideation/clustering") {
      filterUser("Cluster");
    }
    
  }, [allUser, filterUser, path, session._id]);

  //user.username === localStorage.getItem("userName")
  console.log(activeAllUser);
  useEffect(() => {
    socket.on("allPairs", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setAllPairs(data.allPairs);
        setActivated(data.activePairs);
      }
    });

    socket.on("allBehavior", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setAllBehavior(data.allBehavior);
      }
    });
    socket.on("allSynthesis", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setAllSynthesis(data.allSynthesis);
      }
    });
    socket.on("goalRes", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setGoal(data.goal);
      }
    });
    socket.on("metricRes", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setMetric(data.metric);
      }
    });
    ///////////////////////////////////////////////////////////////////////////////
    socket.on("allActivity", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActivities(data.allActivity);
      }
    });

    /////////////////////////////////////////////////////////////////////////////
    socket.on("allTargetGroup", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setTargetGroups(data.allTargetGroup);
      }
    });
    /////////////////////////////////////////////////////////////////////////////
    socket.on("allProblem", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setProblems(data.allProblem);
      }
    });
    /////////////////////////////////////////////////////////////////////////////
    socket.on("allIdea", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setIdeas(data.allIdea);
      }
    });

    ////////////////////////////////////////////////////////////////////////////////////
    socket.on("allGroup", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setGroups(data.allGroup);
      }
    });
/////////////////////////////////////////////////////////////////////////////////////////
socket.on("notification", (data) => {
  if (data=== localStorage.getItem("sessionId")) {
    setNote(true);
  }
});
    ////////////////////////////////////////////////////////////////////////////////////

    socket.on("sessionTime", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setSessionTime({
          m: data.sessionTime.m,
          s: data.sessionTime.s,
        });
      }
    });

    ////////////////////////////////////////////////////////////////////////////////////
    socket.on("sessionsRes", (data) => {
      console.log(data);
      if (data) {
        localStorage.setItem("sessionId", data.session._id);
        setSession(data.session);
        setMetric(data.session.metric);
        setGoal(data.session.goal);
        setActivities(data.session.activities);
        setTargetGroups(data.session.targetGroups);
        setActivated(data.session.pairs.find(({ active }) => active === true));
        setAllSynthesis(data.session.synthesis);
        setAllPairs(data.session.pairs);
        setSessionId(data.session._id);
        setAllBehavior(data.session.behaviors);
        setProblems(data.session.problems);
        setIdeas(data.session.ideas);
        setGroups(data.session.groups);
        setAllUser(data.allUser);
      }
    });

    socket.on("allSession", (data) => {
      setSessions(data);
      const filter = data.filter(
        (ses) => ses._id === localStorage.getItem("sessionId")
      );
      if (localStorage.getItem("sessionId")) {
        setSession(filter.length > 0 && filter[0]);
        setGoal(filter.length > 0 && filter[0].goal);
        setAllBehavior(filter.length > 0 && filter[0].behaviors);
        setMetric(filter.length > 0 && filter[0].metric);
        setActivities(filter.length > 0 && filter[0].activities);
        setTargetGroups(filter.length > 0 && filter[0].targetGroups);
        setAllSynthesis(filter.length > 0 && filter[0].synthesis);
        setAllPairs(filter.length > 0 && filter[0].pairs);
        setProblems(filter.length > 0 && filter[0].problems);
        setIdeas(filter.length > 0 && filter[0].ideas);
        setGroups(filter.length > 0 && filter[0].groups);
        setSessionId(filter.length > 0 && filter[0]._id);
        // setSessionTime(filter.length > 0 && filter[0].sessionTime);
        setActivated(
          filter.length > 0 &&
            filter[0].pairs.find(({ active }) => active === true)
        );
      }
    });
    if (session.length > 0) {
      setActivated(session.pairs.find(({ active }) => active === true));
    }
  }, []);

  // console.log(activeAllUser);

  /////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////

  const profile = (
    <Profile
      goal={goal}
      metric={metric}
      activity={activated && activated.activity}
      behaviorChain={allBehavior}
      targetGroup={activated && activated.targetGroup}
      id={activated && activated._id}
      sessionId={sessionId}
    />
  );

  useEffect(() => {
    socket.on("connect", () => {});
  }, []);
  useEffect(() => {
    if (path === "/") {
      localStorage.removeItem("sessionId");
      setSession({});
    }
  }, [path]);

  const protectGoal =
    Object.keys(session).length === 0 || session === null ? (
      <Loading />
    ) : (
      <GoalsAndMetrics goal={goal} metric={metric} sessionId={sessionId} />
    );

  return (
    <div className="app">
{note &&  <p className="note">create new pairs <button onClick={()=> setNote(false)}>x</button> </p> }
      {activeAllUser.length !== 0 &&
        activeAllUser.map(({ username, btn, position }) =>
          position !== undefined ? (
            <p
              style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                color: "#fc0f03",
                fontSize: `18px`,
              }}
            >
              {username}
            </p>
          ) : (
            ""
          )
        )}

      <BrowserRouter>
        <ButtonAppBar
          setShowNavBar={setShowNavBar}
          setUser={setUser}
          user={user}
          setSession={setSession}
          session={session && session}
          sessionId={session._id}
          sessionTime={sessionTime}
          setSessionTime={sessionTime}
        />
          <div id="google_translate_element"></div>
        <Box sx={{ pt: 5, ml: 9, mb: 2 }} className="title">
          <Typography
            variant="h1"
            sx={{
              color: "#f59607",
              textTransform: "uppercase",
              letterSpacing: "4px",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Gamification Design Tool
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} className="priorities">
          {Object.keys(session).length !== 0 && (
            <NavBar
              setShowNavBar={setShowNavBar}
              showNavBar={showNavBar}
              sessionId={session && session._id}
            />
          )}

          <Box sx={{ width: "100%" }} className="components">
            <Routes>
              <Route
                path="/"
                element={
                  <Home user={user} setUser={setUser} sessions={sessions} />
                }
              />

              <Route path="strategy" element={<Strategy />}>
                <Route path="goal" element={protectGoal} />
                <Route path="loading" element={<Loading />} />
              </Route>

              <Route path="activities" element={<GroupAndActivities />}>
                <Route
                  path="collect"
                  element={
                    <ActivitiesCollect
                      activities={activities}
                      targetGroups={targetGroups}
                      activityTargetPairs={allPairs}
                      sessionId={sessionId}
                    />
                  }
                />
                <Route
                  path="prioritize"
                  element={
                    <ActivitiesPrioritize
                      activityTargetPairs={allPairs}
                      activeActivityId={activated && activated._id}
                      setAllPairs={setAllPairs}
                      sessionId={sessionId}
                    />
                  }
                />
              </Route>

              <Route path="research" element={<Research />}>
                <Route
                  path="behavior"
                  element={
                    <BehaviorChain
                      activeActivity={activated && activated}
                      behaviorChain={allBehavior}
                      setActivated={setActivated}
                      sessionId={sessionId}
                    />
                  }
                />
                <Route
                  path="users"
                  element={
                    <UserResearch
                      activeActivity={activated}
                      behaviorChain={allBehavior}
                      sessionId={sessionId}
                    />
                  }
                />
                <Route path="profile" element={profile} />
                <Route
                  path="doesfit"
                  element={
                    <GamificationFit
                      behaviorChain={allBehavior}
                      targetActivity={activated && activated.activity}
                      targetGroup={activated && activated.targetGroup}
                      id={activated && activated._id}
                      sessionId={sessionId}
                    />
                  }
                />
              </Route>
              <Route path="synthesis" element={<Synthesis />}>
                <Route
                  path="skillatom"
                  element={
                    <SkillAtom
                      synthesis={allSynthesis}
                      activityPair={activated && activated}
                      sessionId={sessionId}
                      profile={profile}
                    />
                  }
                />
                <Route
                  path="identify"
                  element={
                    <Identify
                      synthesis={allSynthesis && allSynthesis}
                      activated={activated && activated}
                      problems={problems}
                      profile={profile}
                      sessionId={sessionId}
                    />
                  }
                />
              </Route>
              <Route path="ideation" element={<Ideation />}>
                <Route
                  path="focusquestions"
                  element={
                    <FocusQuestions
                      synthesis={allSynthesis && allSynthesis}
                      ideas={ideas}
                      activityId={activated && activated._id}
                      sessionId={sessionId}
                      problems={problems}
                      users={session ? session.usersIn:0}
                    />
                  }
                />
                <Route
                  path="clustering"
                  element={
                    <Clustering
                      ideas={ideas}
                      sessionId={session._id}
                      groups={groups}
                    />
                  }
                />
              </Route>
              <Route path="test" element={<DesignLens />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p></p>
                  </main>
                }
              />
              <Route path="loading" element={<Loading />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default DrawerAppBar;
