import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  Paper,
  CardHeader,
} from "@mui/material";
import {
  Add,
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
} from "@mui/icons-material";
import { socket } from "../../socket";
export default function BehaviorChain(props) {
  console.log(props);
  const [allChain, setAllChain] = useState([]);
  useEffect(() => {
    setAllChain(
      props.activeActivity
        ? props.behaviorChain.filter(
            (beh) => beh.pairsId === props.activeActivity._id
          )
        : []
    );
  }, [props.activeActivity, props.behaviorChain]);

  return (
    <Box>
      <Typography variant="h2">Behavior Chain</Typography>
      <Typography>
        Split the target activity into sub-activities to simplify research and
        design considerations
      </Typography>
      <Box sx={{ display: "flex", m: 2, alignItems: "center" }}>
        <Typography>Target Activity: </Typography>
        <Typography sx={{ ml: 1, fontWeight: 500 }}>
          {props.activeActivity && props.activeActivity.activity} /{" "}
          {props.activeActivity && props.activeActivity.targetGroup}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {allChain.map((be, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <ChainPart
              key={``}
              handleSwap={(direction) => props.handleSwap(index, direction)}
              name={be.name}
              id={be._id}
              removeChainPart={() =>
                socket.emit("deleteBehavior", {
                  sessionId: props.sessionId,
                  behaviorId: be._id,
                })
              }
              prio={be.priority}
              chain={allChain}
              index={index}
              sessionId={props.sessionId}
            />
          </Box>
        ))}
        <ChainPartAdder
          addChainPart={props.addChainPart}
          id={props.activeActivity && props.activeActivity._id}
          sessionId={props.sessionId}
        />
      </Box>
    </Box>
  );
}

function ChainPartAdder(props) {
  console.log(props);
  const [name, setName] = useState("");
  const [behaviorInputColor, setBehaviorInputColor] = useState("");
  const [behaviorDisabled, setBehaviorDisabled] = useState(false);

  const behaviorFocusHandler = () => {
    socket.emit("behavior disable input", props.sessionId);
  };

  const behaviorBlurHandler = () => {
    socket.emit("behavior enable input", props.sessionId);
  };

  const behaviorChangeHandler = (e) => {
    setName(e.target.value);

    socket.emit("behavior typing", {
      message: e.target.value,
      id: props.sessionId,
    });
  };
  //////////////////////////////////////////////////////////////////////
  // socket
  useEffect(() => {
    socket.on("behavior disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setBehaviorDisabled(true);
        setBehaviorInputColor("#90EE90");
      }
    });
    socket.on("behavior enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setBehaviorDisabled(false);
        setBehaviorInputColor("");
      }
    });
    socket.on("behavior typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setName(data.message);
      }
    });
    socket.on("close behavior", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setName("");
      }
    });

  }, []);

  ///////////////////////////////////////////////////////////////////////

  const disabledButton = () => {
    return name === "";
  };

  const addChainPart = () => {
    socket.emit("createBehavior", {
      name: name,
      pairsId: props.id,
      sessionId: props.sessionId,
    });
    socket.emit("close behavior", props.sessionId);
    setName("");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "15rem",
        p: 2,
        m: 2,
        ml: 5,
      }}
    >
      <TextField
        value={name}
        onChange={(e) => {
          behaviorChangeHandler(e);
        }}
        variant="standard"
        placeholder="Activity/Behavior"
        onFocus={behaviorFocusHandler}
        onBlur={behaviorBlurHandler}
        disabled={behaviorDisabled}
        inputProps={{
          style: {
            color: `${behaviorInputColor}`,
            WebkitTextFillColor: `${behaviorInputColor}`,
          },
        }}
        error={behaviorInputColor === "#90EE90" ? true : false}
      />
      <Button
        onClick={addChainPart}
        disabled={disabledButton()}
        sx={{ width: "100%", mt: 2 }}
        variant="contained"
        startIcon={<Add />}
      >
        Add
      </Button>
    </Paper>
  );
}

function ChainPart(props) {
  console.log(props);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {props.prio > 0 && (
        <IconButton
          sx={{ color: "white" }}
          onClick={() => {
            socket.emit("updateBehaviorLeft", {
              prio1: props.prio,
              prio2: props.prio - 1,
              sessionId: props.sessionId,
            });
          }}
        >
          <ArrowBackIosNew />
        </IconButton>
      )}
      <Card
        sx={{
          width: "15rem",
          p: 2,
          m: 2,
        }}
        elevation={4}
      >
        <CardHeader
          title={
            <Typography align="center" sx={{ fontWeight: 500 }}>
              {props.index + 1}: {props.name}
            </Typography>
          }
          action={
            <IconButton
              onClick={() => {
                props.removeChainPart();
              }}
            >
              <Delete style={{color:"#d32f2f"}} />
            </IconButton>
          }
        />
      </Card>

      {props.prio !== props.chain.length - 1 && (
        <IconButton
          sx={{ color: "orange" }}
          onClick={() => {
            socket.emit("updateBehaviorRight", {
              prio1: props.prio,
              prio2: props.prio + 1,
              sessionId: props.sessionId,
            });
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Box>
  );
}
