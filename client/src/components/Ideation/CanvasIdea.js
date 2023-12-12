import React, { useState } from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { Add, Circle, Remove } from "@mui/icons-material";
import Draggable from "react-draggable";
import { socket } from "../../socket.js";

const draggableStyle = {
  "&:hover": {
    cursor: "move",
  },
};

export default function CanvasIdea(props) {
  const [showDotAdder, setShowDotAdder] = useState(false);

  const handleShow = () => {
    setShowDotAdder(true);
  };

  const handleUnshow = () => {
    setShowDotAdder(false);
  };
  const addDot = () => {
    socket.emit("addDot", {
      name: localStorage.getItem("userName"),
      sessionId: props.sessionId, id: props.id
    });
  };
  const removeDot = () => {
    socket.emit("removeDot", {
      name: localStorage.getItem("userName"),
      sessionId: props.sessionId, id: props.id
    });
  };
  return (
    <Draggable
      bounds="parent"
      grid={[20, 20]}
      position={props.pos}
      onStop={() => props.finishMove(props.id, "updatePos")}
      onDrag={props.handleDrag}
      onStart={props.startMove}
    >
      <Box
        sx={{
          height: "fit-content",
          ...draggableStyle,
          display: "flex",
          alignItems: "start",
        }}
        onMouseEnter={handleShow}
        onMouseLeave={handleUnshow}
      >
        <Paper
          sx={{
            height: "fit-content",
            minWidth: "10rem",
            m: 2,
            mt: 0,
            mr: 0,
            bgcolor: "secondary.light",
            p: 2,
            ...draggableStyle,
            maxWidth: "12rem",
          }}
          elevation={4}
          aria-haspopup="true"
        >
          {props.dotted.map((dot, index) => <Circle color="error" sx={{}} />)}
          
          <Typography align="center">{props.name}</Typography>
        </Paper>
        <Button
          sx={{ opacity: showDotAdder ? "100%" : "0%" }}
          onClick={
            props.dotted.includes(localStorage.getItem("userName"))
              ? removeDot
              : addDot
          }
        >
          {props.dotted.includes(localStorage.getItem("userName")) ? (
            <Remove />
          ) : (
            <Add />
          )}
          <Circle color="error" />
        </Button>
      </Box>
    </Draggable>
  );
}
