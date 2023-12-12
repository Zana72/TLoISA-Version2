import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import DesignLens from "./DesignLens";
import AddText from "../Helper/AddText";
import { Delete } from "@mui/icons-material";
import { lensesData } from "../../data/designLenses.js";
import { useMemo } from "react";
import { socket } from "../../socket.js";
import IdeaTimer from "./ideaTimer";

export default function FocusQuestions(props) {
  const [activeLensIter, setActiveLensIter] = useState(1);
  const [activeIdeaList, setActiveIdeaList] = useState([]);
  const [activeLensList, setActiveLensList] = useState([]);
  const [activeProblemList, setActiveProblemList] = useState([]);
  const [timerTime, setTimerTime] = useState(0);
  const [activeIdea, setActiveIdea] = useState(null);
  const [userWrite, setUserWrite] = useState("");

  // const [idea, setIdea] = useState("");
  const [activeLens, setActiveLens] = useState({});
  const [ideaTime, setIdeaTime] = useState({ m: 0, s: 0 });
  const [updateTimeTimer, setUpdateTimeTimer] = useState(true);
  const [lastTimeTimer, setLastTimeTimer] = useState(true);
  console.log(props.users);
  useEffect(() => {
    socket.on("ideaTime", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setIdeaTime({
          m: data.ideaTime.m,
          s: data.ideaTime.s,
        });
      }
    });
    socket.on("ideaEnable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setIdeaDisabled(false);
      }
    });
    socket.on("blockedIdea", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setIdeaDisabled(true);
      }
    });
    setTimerTime();
  }, []);
  const allLense = useMemo(
    () => [
      ...lensesData.feedback,
      ...lensesData.rules,
      ...lensesData.actions,
      ...lensesData.goals,
      ...lensesData.motivation,
      ...lensesData.challenges,
    ],
    []
  );

  useEffect(() => {
    socket.on("goToNextLense", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setActiveLensIter(
          data.activeLensIter === activeLensList.length - 1
            ? 0
            : data.activeLensIter + 1
        );
      }
    });
  }, [activeLensIter, activeLensList.length]);
  useEffect(() => {
    setActiveLensList(() => {
      const arr = props.problems.map(({ subType }) => subType);
      return arr.filter((item, index) => arr.indexOf(item) === index);
    });
  }, [props.problems]);
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerTime * 60);

  useEffect(() => {
    setTimerTime(+localStorage.getItem("timeTimer") || 5);
  }, [updateTimeTimer]);

  useEffect(() => {
    setActiveIdeaList(
      props.ideas.filter(
        ({ subType }) => subType === activeLensList[activeLensIter]
      )
    );
    setActiveLens(
      allLense.find(({ title }) => title === activeLensList[activeLensIter])
    );
    setActiveProblemList(
      props.problems.filter(
        ({ subType }) => subType === activeLensList[activeLensIter]
      )
    );
  }, [activeLensIter, activeLensList, allLense, props.ideas, props.problems]);

  // const time = new Date();
  // time.setSeconds(time.getSeconds() + (timerTime*60)); // 10 minutes timer

  //////////////////////////////////////////////////////////////////////////////////////////
  const [ideaDisabled, setIdeaDisabled] = useState(true);
  const [ideaText, setIdeaText] = useState("");
  const [ideaInputValue, setIdeaInputValue] = useState("");
  const [ideaInputColor, setIdeaInputColor] = useState("");
  console.log(timerTime);
  const ideaFocusHandler = (index) => {
    socket.emit("idea disable input", {
      sessionId: props.sessionId,
      inputIndex: index,
      user: localStorage.getItem("userName"),
    });
  };

  const ideaBlurHandler = (index) => {
    socket.emit("idea enable input", {
      sessionId: props.sessionId,
      inputIndex: index,
      user: localStorage.getItem("userName"),
    });
  };

  const ideaChangeHandler = (e, index) => {
    setIdeaText(e.target.value);
    socket.emit("idea typing", {
      message: e.target.value,
      id: props.sessionId,
      inputIndex: index,
      user: localStorage.getItem("userName"),
    });
  };

  useEffect(() => {
    socket.on("idea disable", (data) => {
      if (data.sessionId === localStorage.getItem("sessionId")) {
        setIdeaDisabled(true);
        setIdeaInputColor("#90EE90");
        setActiveIdea(data.inputIndex);
        setUserWrite(data.user);
      }
    });
    socket.on("idea enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setIdeaDisabled(false);
        setIdeaInputColor("");
        setActiveIdea(data.inputIndex);
        setUserWrite(data.user);
      }
    });

    socket.on("idea typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setIdeaInputValue(data.message);
        setActiveIdea(data.inputIndex);
        setUserWrite(data.user);
      }
    });
  }, []);
  const handleTimer = (e) => {
    e.preventDefault();
    setTimerTime(localStorage.getItem("timeTimer"));
    window.location.reload(true);
  };
  console.log(activeIdea);
  //////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box>
      <Typography variant="h2">Focus Questions</Typography>
      {activeLens ? (
        <Box sx={{ position: "relative" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ overflowX: "scroll" }}
          >
            <Grid item xs={5}>
              <Box sx={{ mr: 3, mb: 3 }}>
                <Typography variant="h3">Brainstorming</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {/*renderIdeas()*/}
                  {activeIdeaList.map((idea, index) => (
                    <Paper
                      key={idea._id}
                      sx={{
                        m: 2,
                        bgcolor: "secondary.light",
                        p: 2,
                        maxWidth: "12rem",
                        height: "fit-content",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      elevation={4}
                    >
                      <Typography align="center">{idea.idea}</Typography>
                      <IconButton
                        onClick={() => {
                          socket.emit("deleteIdea", {
                            sessionId: props.sessionId,
                            id: idea._id,
                          });
                        }}
                      >
                        <Delete style={{ color: "#d32f2f" }} />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  <Typography sx={{ mr: 2 }}>New Idea:</Typography>
                  {/* ///////////////////////////////////////////////////////////// */}
                  {Array.from({ length: props.users }, (_, index) => (
                    <AddText
                      key={index}
                      placeholder="idea..."
                      onAdd={() =>
                        socket.emit("createIdea", {
                          id: props.sessionId,
                          idea: ideaInputValue,
                          subType: activeLensList[activeLensIter],
                          deleted: false,
                        })
                      }
                      customClass="bg-white"
                      addStyle={{ color: "white" }}
                      focus={() => ideaFocusHandler(index)}
                      blur={() => ideaBlurHandler(index)}
                      disabled={
                        index === activeIdea &&
                        userWrite !== localStorage.getItem("userName")
                          ? ideaDisabled
                          : false
                      }
                      change={(e) => ideaChangeHandler(e, index)}
                      value={index === activeIdea ? ideaInputValue : ""}
                      ideaText={ideaText}
                      inputColor={index === activeIdea ? ideaInputColor : ""}
                    />
                  ))}
                  {/* ////////////////////////////////////////////////////////////////////////////////// */}
                  {localStorage.getItem("sessionOwner") && (
                    <form onSubmit={handleTimer}>
                      <input
                        type="number"
                        style={{
                          color: "black",
                          padding: "4px 6px",
                          fontSize: "18px",
                        }}
                        value={localStorage.getItem("timeTimer")}
                        onChange={(e) => {
                          localStorage.setItem("timeTimer", e.target.value);
                          setUpdateTimeTimer(!updateTimeTimer);
                        }}
                      />
                      <input
                        type="submit"
                        value="+"
                        style={{
                          padding: "4px 6px",
                          fontSize: "18px",
                          backgroundColor: "black",
                          color: "white",
                        }}
                      />
                    </form>
                  )}

                  <Typography sx={{ textAlgin: "center", borderRadius: "7px" }}>
                    <IdeaTimer
                      expiryTimestamp={time}
                      setIdeaTime={setIdeaTime}
                      ideaTime={ideaTime}
                      sessionId={props.sessionId}
                      setIdeaDisabled={setIdeaDisabled}
                    />
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "left",
                }}
              >
                <Box>
                  <Button
                    onClick={() => {
                      setActiveLensIter((prev) =>
                        prev === activeLensList.length - 1 ? 0 : prev + 1
                      );
                      socket.emit("goToNextLense", {
                        activeLensIter,
                        id: props.sessionId,
                      });
                    }}
                  >
                    Next design lens
                  </Button>
                </Box>
                {
                  <DesignLens
                    title={activeLens.title}
                    motivator={activeLens.motivator}
                    description={activeLens.description}
                    questions={
                      Object.keys(activeLens).length !== 0
                        ? activeLens.questions
                        : []
                    }
                  />
                }
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/*renderProblems()*/}
                  {activeProblemList.map((problem, index) => (
                    <Card sx={{ width: "20rem", m: 3 }} key={index}>
                      <CardHeader title={"Problem " + (index + 1)} />
                      <CardContent>
                        <Typography>{problem.problem}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography>Problems are needed to ideate on solutions.</Typography>
      )}
    </Box>
  );
}

///alignItems: center
