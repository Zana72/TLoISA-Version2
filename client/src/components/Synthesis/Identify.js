import React, { useEffect, useState } from "react";
import {
  Delete,
  ArrowBack,
  ArrowForward,
  ArrowForwardIos,
  ArrowBackIosNew,
} from "@mui/icons-material";
import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import SkillAtomPartStatic from "./SkillAtomPartStatic";
import { lensesData } from "../../data/designLenses";
import DesignLens from "./DesignLens";
import { skillAtomStatic } from "../../data/skillAtomStatic";
import ShowProfile from "./ShowProfile";
import { socket } from "../../socket";
const types = [
  "challenges",
  "motivation",
  "goals",
  "actions",
  "rules",
  "feedback",
];

export default function Identify(props) {
  /////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////
  const [problemDisabled, setProblemDisabled] = useState(false);
  const [problemInputColor, setProblemInputColor] = useState("");
  const [problemId, setProblemId] = useState("");

  const problemFocusHandler = (id) => {
    socket.emit("problem disable input", {
      sessionId: props.sessionId,
      id: id,
    });
  };

  const problemBlurHandler = (id) => {
    socket.emit("problem enable input", { sessionId: props.sessionId, id: id });
  };

  useEffect(() => {
    socket.on("problem disable", (data) => {
      console.log(data);
      if (data.sessionId === localStorage.getItem("sessionId")) {
        setProblemDisabled(true);
        setProblemInputColor("#90EE90");
        setProblemId(data.id);
      }
    });
    socket.on("problem enable", (data) => {
      if (data.sessionId === localStorage.getItem("sessionId")) {
        setProblemDisabled(false);
        setProblemInputColor("");
      }
    });
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  const [activeType, setActiveType] = useState(0);
  const [activeLens, setActiveLens] = useState(0);
  const [allSynt, setAllSynt] = useState([]);
  const [point, setPoint] = useState([]);
  const [activeProblem, setActiveProblem] = useState([]);

  useEffect(() => {
    setAllSynt(
      props.activated
        ? props.synthesis.filter((beh) => beh.pairsId === props.activated._id)
        : []
    );
    setPoint(
      props.activated
        ? props.synthesis.filter((beh) => {
            return (
              beh.pairsId === props.activated._id &&
              beh.type === types[activeType]
            );
          })
        : []
    );
  }, [props.activated, props.synthesis, activeType]);

  /////////////////////////////////////////////////////////////////////
  console.log(props.problems);

  useEffect(() => {
    setActiveLens(0);
    setActiveProblem(
      props.problems.filter(({ skillType }) => skillType === types[activeType])
    );
  }, [activeType, props.problems]);

  const isOnlyOneLens = () => {
    return lensesData[types[activeType]].length === 1;
  };

  const isNoLens = () => {
    return lensesData[types[activeType]].length === 0;
  };

  const getNextType = () => {
    if (activeType === types.length - 1) {
      return 0;
    } else {
      return activeType + 1;
    }
  };

  const getPrevType = () => {
    if (activeType === 0) {
      return types.length - 1;
    } else {
      return activeType - 1;
    }
  };

  const renderDesignLense = () => {
    if (
      lensesData[types[activeType]].length > 0 &&
      lensesData[types[activeType]].length > activeLens
    ) {
      let lens = lensesData[types[activeType]][activeLens];
      return (
        <Box sx={{ display: "flex" }}>
          <Typography>{activeLens + 1}.</Typography>
          <DesignLens
            key={lens.title}
            title={lens.title}
            motivator={lens.motivator}
            description={lens.description}
            questions={lens.questions}
            addProblem={() =>
              socket.emit("createProblem", {
                sessionId: props.sessionId,
                subType: lens.title,
                skillType: types[activeType],
              })
            }
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    socket.on("prevType", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        console.log(data);
        setActiveType(data.value === 0 ? 5 : data.value - 1);
        // setPrevType();
      }
    });
    ////////////////////////////////////////////////////////////
    socket.on("nextType", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        console.log(data);
        setActiveType(data.value === 5 ? 0 : data.value + 1);
        // setNextType();
      }
    });
    ////////////////////////////////////////////////////////////////////////
    socket.on("prevLens", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        console.log(data);
        setActiveLens(
          data.value === 0
            ? lensesData[types[activeType]].length - 1
            : data.value - 1
        );
      }
    });
    ////////////////////////////////////////////////////////////
    socket.on("nextLens", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        console.log(data);
        setActiveLens(
          data.value === lensesData[types[activeType]].length - 1
            ? 0
            : data.value + 1
        );
      }
    });
    ////////////////////////////////////////////////////////////////////////
  }, []);

  if (allSynt) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" className="supTitleH2">
          Identify Problems
        </Typography>
        <ShowProfile top="1rem" right="2rem" profile={props.profile} />
        <Grid container sx={{ with:"100%", justifyContent: "center"}}  direction="column"  alignItems="center" >
          <Grid item xs={4}>
            <Box sx={{ mr: 5 }}>
              <Typography variant="h3" className="supTitleH3">
                Problems
              </Typography>
              <Box sx={{ minHeight: "25vh", overflow: "auto" }}>
                <Box>
                  {activeProblem.map((problem, index) => (
                    <Box sx={{ mb: 2, p: 1, display: "flex" }} key={index}>
                      <TextField
                        className="problem"
                        variant="standard"
                        placeholder="Problem..."
                        value={problem.problem}
                        onChange={(e) => {
                          socket.emit("updateProblem", {
                            sessionId: props.sessionId,
                            id: problem._id,
                            value: e.target.value,
                          });
                        }}
                        onFocus={() => {
                          problemFocusHandler(problem._id);
                        }}
                        onBlur={() => problemBlurHandler(problem._id)}
                        disabled={
                          problem._id === problemId ? problemDisabled : false
                        }
                        inputProps={{
                          style: {
                            color: `${
                              problem._id === problemId ? problemInputColor : ""
                            }`,
                            WebkitTextFillColor: `${
                              problem._id === problemId ? problemInputColor : ""
                            }`,
                          },
                        }}
                        multiline
                        fullWidth
                      />
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() =>
                          socket.emit("deleteProblem", {
                            sessionId: props.sessionId,
                            id: problem._id,
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ m: "auto", display: "flex", flexDirection: "column" }}>
              <Typography variant="h3">Skill Atom Part</Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap:'20px',

                }}
              >
                <Button
                  sx={{ width: "10rem", height: "fit-content" }}
                  onClick={async () => {
                    setActiveType((prev) =>
                      prev === 0 ? types.length - 1 : prev - 1
                    );

                    socket.emit("prevType", {
                      value: activeType,
                      id: props.sessionId,
                    });
                  }}
                  variant="contained"
                  startIcon={<ArrowBack />}
                >
                  {types[getPrevType()]}
                </Button>
                <SkillAtomPartStatic
                  title={
                    skillAtomStatic[types[activeType]] &&
                    skillAtomStatic[types[activeType]].title
                  }
                  info={
                    skillAtomStatic[types[activeType]] &&
                    skillAtomStatic[types[activeType]].info
                  }
                  points={point}
                  icon={
                    skillAtomStatic[types[activeType]] &&
                    skillAtomStatic[types[activeType]].icon
                  }
                />
                <Button
                  sx={{ width: "10rem", height: "fit-content" }}
                  onClick={async () => {
                    setActiveType((prev) =>
                      prev === types.length - 1 ? 0 : prev + 1
                    );
                    socket.emit("nextType", {
                      value: activeType,
                      id: props.sessionId,
                    });
                  }}
                  variant="contained"
                  endIcon={<ArrowForward />}
                >
                  {types[getNextType()]}
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 8 }}>
              <Typography variant="h3">Design Lenses</Typography>
              {!isNoLens() ? (
                <Box
                  sx={{
                    display: "flex",
                    m: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    sx={{ height: "fit-content" }}
                    onClick={() => {
                      setActiveLens((prev) =>
                        prev === 0
                          ? lensesData[types[activeType]].length - 1
                          : prev - 1
                      );
                      socket.emit("prevLens", {
                        value: activeLens,
                        id: props.sessionId,
                      });
                    }}
                    disabled={isOnlyOneLens()}
                  >
                    <ArrowBackIosNew />
                  </IconButton>
                  {renderDesignLense()}
                  <IconButton
                    sx={{ height: "fit-content" }}
                    onClick={() => {
                      setActiveLens((prev) =>
                        prev === lensesData[types[activeType]].length - 1
                          ? 0
                          : prev + 1
                      );
                      socket.emit("nextLens", {
                        value: activeLens,
                        id: props.sessionId,
                      });
                    }}
                    disabled={isOnlyOneLens()}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              ) : (
                <Typography>There is no lens for this part.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <Typography>Pick a target activity to proceed first</Typography>;
  }
}

// function ProblemsField(props) {
//   const handleUpdate = () => {};

//   const handleDelete = () => {};

//   const renderProblems = () => {
//     // let problems = [];
//     // for (let dls of lensesData[props.skillAtomPartTitle]) {
//     //   if (
//     //     props.problems[dls.title] &&
//     //     props.problems[dls.title].problems.length > 0
//     //   ) {
//     //     problems.push(<Typography key={dls.title}>{dls.title}: </Typography>);
//     //     for (let index in props.problems[dls.title].problems) {
//     //       let problem = props.problems[dls.title].problems[index];
//     //       problems.push(
//     //       );
//     //     }
//     //   }
//     // }
//     // return problems;
//   };

//   // if (activeProblem) {
//   //   return <Box>{props.problems.map((problem,index)=> (
//   //     <Box sx={{ mb: 2, p: 1, display: "flex" }} key={index}>
//   //     <TextField
//   //       variant="standard"
//   //       placeholder="Problem..."
//   //       value={problem}
//   //       onChange={handleUpdate()}
//   //       multiline
//   //       fullWidth
//   //     />
//   //     <IconButton onClick={() => handleDelete()}>
//   //       <Delete />
//   //     </IconButton>
//   //   </Box>
//   //   ))}</Box>;
//   // } else {
//   //   return null;
// }
