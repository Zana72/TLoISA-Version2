import React, { useState } from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Draggable from "react-draggable";
import { socket } from "../../socket.js";

const draggableStyle = {
  "&:hover": {
    cursor: "move",
  },
};

export default function CanvasGroup(props) {
  const [showDeleter, setShowDeleter] = useState(false);

  const handleShow = () => {
    setShowDeleter(true);
  };

  const handleUnshow = () => {
    setShowDeleter(false);
  };

  return (
    <Draggable
      bounds="parent"
      grid={[20, 20]}
      position={props.pos}
      onStop={(id) => props.finishMove(props.id,"updatePosText")}
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
            p: 1,
            ...draggableStyle,
            maxWidth: "12rem",
          }}
          elevation={4}
          aria-haspopup="true"
        >
          <Typography align="center" sx={{ fontSize: 18, fontWeight: 500 }}>
            {props.name}
          </Typography>
        </Paper>
        <Button
          sx={{ opacity: showDeleter ? "100%" : "0%" }}
          onClick={()=>socket.emit("deleteGroup",{sessionId:props.sessionId,id :props.id})}
          color="error"
        >
          <Delete />
        </Button>
      </Box>
    </Draggable>
  );
}
