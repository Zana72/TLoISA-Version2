import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { socket } from "../socket";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
function MyTimer({
  expiryTimestamp,
  sessionId,
  eventShare,
  eventBlock,
  sessionTime,
  setCallTimer,
  eventBlocked,
}) {
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
    expiryTimestamp,

    onExpire: () => {
      socket.emit(eventBlocked, sessionId);
      navigate("/");
      setCallTimer(false);







































      
      localStorage.removeItem("sessionId");
      socket.emit("deleteUserSession", localStorage.getItem("userName"));
    },
  });

  useEffect(() => {
    socket.emit("seTimer", { minutes, seconds, sessionId: sessionId });
  }, [eventShare, minutes, seconds, sessionId]);

  return (
    <Box>
      <Typography sx={{ marginRight: "30px" }}>
        {`${sessionTime.m}: ${sessionTime.s}`}
      </Typography>
    </Box>
  );
}

export default MyTimer;

//   // <div style={{ textAlign: "center" }}>
//   //   <p style={{ fontSize: "20px", marginRight: "30px" }}>
//   //     <span>{minutes !== 0 && seconds !== 0 ? minutes : ""} </span>:
//   //     <span>{minutes !== 0 && seconds !== 0 ? seconds : ""}</span>
//   //   </p>
//   //   {/* <p>{isRunning ? 'Running' : 'Not running'}</p>
//   //   <button onClick={start}>Start</button>
//   //   <button onClick={pause}>Pause</button>
//   //   <button onClick={resume}>Resume</button>
//   //   <button onClick={() => {
//   //     Restarts to 5 minutes timer
//   //     const time = new Date();
//   //     time.setSeconds(time.getSeconds() + 300);
//   //     restart(time)
//   //   }}>Restart</button>*/}
//   // </div>
