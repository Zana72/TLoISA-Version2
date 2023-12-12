import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import MyTimer from "../timer";
import { useEffect, useReducer, useState } from "react";
import { socket } from "../../socket";
export default function ButtonAppBar({
  setShowNavBar,
  setUser,
  user,
  setSession,
  session,
  sessionId,
  sessionTime,
  setSessionTime,
}) {
  const [callTimer, setCallTimer] = useState(false);

  const navigate = useNavigate();
  const showNav = () => {
    setShowNavBar((prev) => !prev);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 700);
  useEffect(() => {
    socket.on("startTimer", (data) => {
      setCallTimer(true);
    });
  });
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <AppBar position="static" sx={{ backgroundColor: "#195604" }}>
        <Toolbar>
          <IconButton
            className="appBar-icon"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: "none" }}
            onClick={showNav}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => {
              socket.emit(
                "deleteUserFromSession",
                localStorage.getItem("sessionId")
              );
              navigate("/");
              setSession({});
              localStorage.removeItem("sessionId");
              socket.emit(
                "deleteUserSession",
                localStorage.getItem("userName")
              );
              
            }}
            variant="h6"
            component="div"
            className="logo"
            sx={{
              flexGrow: 1,
              fontSize: "25px",
              color: "orange",
              letterSpacing: "5px",
              fontWeight: "bold",
            }}
          >
            GDT
          </Typography>

          {callTimer && (
            <MyTimer
              expiryTimestamp={time}
              sessionId={sessionId}
              eventShare="seTimer"
              eventBlocked="blockedSession"
              sessionTime={sessionTime}
              setCallTimer={setCallTimer}
            />
          )}
          <Typography sx ={{marginRight:"30px"}}>
       { localStorage.getItem("sessionId") && `inventId :  ${localStorage.getItem("sessionId")}`}
          
          </Typography>
          <Typography
            className="user-top"
            sx={{
              marginRight: "30px",
              fontSize: "25px",
              color: "white",
              letterSpacing: "3px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
               { localStorage.getItem("userName")}
            <span style={{ color: "orange",marginLeft:"20px" }}>{session && session.name}</span>
          </Typography>
          {localStorage.getItem("userName") && (
            <Button
              sx={{ fontSize: "18px", textTransform: "capitalize" }}
              color="inherit"
              onClick={async () => {
                socket.emit(
                  "deleteUserSession",
                  localStorage.getItem("userName")
                );
                socket.emit(
                  "deleteUserFromSession",
                  localStorage.getItem("sessionId")
                );
                localStorage.removeItem("sessionId");
                setUser(localStorage.getItem("userName"));
                localStorage.removeItem("userName");
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
