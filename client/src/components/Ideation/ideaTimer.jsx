import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { socket } from "../../socket";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function IdeaTimer({
  expiryTimestamp,
  sessionId,
  setIdeaTime,
  ideaTime,
  eventBlocked,
  setIdeaDisabled,
}) {
  console.log(ideaTime);
  const navigate = useNavigate();

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,autoStart:false,

    onExpire: () => {
      socket.emit("ideaBlocked", sessionId);
      navigate("/");
      pause();
    },
  });
 
  useEffect(() => {
    socket.emit("setIdeaTimer", { minutes, seconds, sessionId: sessionId });
  }, [minutes, seconds, sessionId]);

  console.log(ideaTime);
  return (
    <Box
      sx={{
        width: "100px",
        height: "100px",
        background: "white",
        color: "black",
        textAlign: "center",
        borderRadius:"7px",
        padding:"10px",
      }}
    >
      <Typography sx={{ marginRight: "0px", textAlign: "center" }}>
        {`${ideaTime.m}:${ideaTime.s}`}
      </Typography>
      { localStorage.getItem("sessionOwner") && 
 <Button
 onClick={() => {
   socket.emit("ideaEnable", sessionId);
   start();
 }}
>
 start
</Button>
      }
     
      {/* <Button  onClick={() => {
        socket.emit("ideaBlocked", sessionId);
        pause()
    
      }}>pause</Button> */}
    </Box>
  );
}

export default IdeaTimer;
