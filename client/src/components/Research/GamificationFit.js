import { ArrowForwardSharp } from "@mui/icons-material";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Grid,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import { green, grey, yellow } from "@mui/material/colors";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { socket } from "../../socket";
export default function GamificationFit(props) {
  /// ///////////////////////////////////////////////////////////////////////////////////////
  const [activeChain, setActiveChain] = useState({});
  const [allChain, setAllChain] = useState([]);
  const [activePrio, setActivePrio] = useState(0);
  //blockedState
  const [question0, setQuestion0] = useState(false);
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);

  console.log(question0);
  console.log(question1);
  console.log(question2);
  console.log(question3);

  useEffect(() => {
    setAllChain(
      props.id
        ? props.behaviorChain.filter((beh) => beh.pairsId === props.id)
        : []
    );
    setActiveChain(
      props.id
        ? props.behaviorChain.filter((beh) => beh.pairsId === props.id)[
            activePrio
          ]
        : {}
    );
  }, [props.behaviorChain, props.id, activePrio]);
  /////////////////////////////////////////////////////////////////////////////////////////////////

  const handleToggle = (index) => () => {
    if (activeChain) {
      socket.emit("updateBeAnswer", {
        index: index,
        id: activeChain._id,
        sessionId: props.sessionId,
      });
    }
  };

  const checkColor = useMemo(
    () => (fitAnswers) => {
      if (fitAnswers) {
        const inFalse = fitAnswers.includes(false);

        const inTrue = fitAnswers.includes(true);

        const falseAndTrue =
          fitAnswers.includes(false) && fitAnswers.includes(true);

        let color = "";
        if (!inFalse) {
          color = green[600];
        } else if (falseAndTrue) {
          color = yellow[300];
        } else if (!inTrue) {
          color = grey[200];
        }

        return color;
      }
    },
    []
  );

  useEffect(() => {
    socket.on("blockChecked", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        if (data.index === 0) {
          setQuestion0(true);
          setTimeout(() => setQuestion0(false), 5000);
        }
        if (data.index === 1) {
          setQuestion1(true);
          setTimeout(() => setQuestion1(false), 5000);
        }
        if (data.index === 2) {
          setQuestion2(true);
          setTimeout(() => setQuestion2(false), 5000);
        }
        if (data.index === 3) {
          setQuestion3(true);
          setTimeout(() => setQuestion3(false), 5000);
        }
      }
    });
  }, []);

  if (props.behaviorChain && Object.keys(props.behaviorChain).length > 0) {
    return (
      <Box>
        <Typography variant="h2">Gamification Fit</Typography>
        <Typography sx={{ mb: 2 }}>
          Before you develop an ingenious Gameful Design, you should determined
          if this actually helps to achieve your goals. All four of the
          following questions should be answered positively in order to evaluate
          a sub-activity as suitable.
        </Typography>
        <Grid container>
          <Grid item xs={9} sx={{}}>
            <Box sx={{ display: "flex", mb: 2, ml: 2 }}>
              <Typography sx={{ mr: 1 }}>Target Activity:</Typography>
              <Typography sx={{ fontWeight: 500 }}>
                {props.targetActivity} / {props.targetGroup}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", m: 1, flexWrap: "wrap" }}>
              {/*renderActivities()*/}
              {allChain.map((ch, index) => (
                <Paper
                  sx={{
                    bgcolor: checkColor(ch.fitAnswers),
                    p: 0.8,
                    ml: 1,
                    "&:hover": { cursor: "pointer" },
                  }}
                  key={index}
                >
                  <Typography
                    onClick={() => {
                      setActivePrio(index);
                    }}
                  >
                    {ch.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
            <Box sx={{ display: "flex", m: 2 }}>
              {activeChain && (
                <BcPart
                  name={activeChain.name && activeChain.name}
                  motivations={
                    activeChain.motivations ? activeChain.motivations : []
                  }
                  hurdles={activeChain.hurdler ? activeChain.hurdler : []}
                  id={activeChain && activeChain._id}
                />
              )}
            </Box>
            <List sx={{ maxWidth: "40rem" }}>
              <ListItem>
                <ListItemIcon onClick={handleToggle(0)}>
                  <Checkbox
                    edge="start"
                    checked={
                      activeChain !== undefined
                        ? Object.keys(activeChain).length > 0
                          ? activeChain.fitAnswers[0]
                          : false
                        : false
                    }
                    disabled={question0}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Does the activity connect to an actual user need?" />
              </ListItem>
              <ListItem>
                <ListItemIcon onClick={handleToggle(1)}>
                  <Checkbox
                    edge="start"
                    checked={
                      activeChain !== undefined &&
                      Object.keys(activeChain).length > 0
                        ? activeChain.fitAnswers[1]
                        : false
                    }
                    disabled={question1}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Is lacking motivation a central issue or opportunity (and not, e.g., poor usability)?" />
              </ListItem>
              <ListItem>
                <ListItemIcon onClick={handleToggle(2)}>
                  <Checkbox
                    edge="start"
                    checked={
                      activeChain !== undefined &&
                      Object.keys(activeChain).length > 0
                        ? activeChain.fitAnswers[2]
                        : false
                    }
                    disabled={question2}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Does the target activity involve an inherent challenge with a learnable skill?" />
              </ListItem>
              <ListItem>
                <ListItemIcon onClick={handleToggle(3)}>
                  <Checkbox
                    edge="start"
                    checked={
                      activeChain !== undefined &&
                      Object.keys(activeChain).length > 0
                        ? activeChain.fitAnswers[3]
                        : false
                    }
                    disabled={question3}
                    style={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`Is affording experiences of competence the most effective and efficient way of improving motivation  (and not, e.g., defusing fears)?`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Typography>
        You need to set up a behavior chain before you can do this step.
      </Typography>
    );
  }
}

function BcPart(props) {
  console.log(props);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "30rem",
        p: 2,
        m: 2,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography>Activity:</Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography>{props.name}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography>Motivators:</Typography>
        </Grid>
        <Grid item xs={6}>
          {props.motivations.length > 0 &&
            props.motivations.map((mot, index) => (
              <Typography key={index}>- {mot}</Typography>
            ))}
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography>Hurdles:</Typography>
        </Grid>
        <Grid item xs={6}>
          {props.hurdles.length > 0 &&
            props.hurdles.map((hurd, index) => (
              <Typography key={index}>- {hurd}</Typography>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
