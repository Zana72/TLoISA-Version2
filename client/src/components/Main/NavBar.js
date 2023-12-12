import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { socket } from "../../socket";

const entryStyle = {
  p: 1,
  m: 1,
  ml: 0,
  backgroundColor: grey[700],
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: "18px",
  // letterSpacing: "1px",
};

const renderCounter = (array, countName) => {
  return (
    <ul className="nav-list list">
      {array &&
        array.map((u) => (u.btn === countName ? <li>{u.userName}</li> : ""))}
    </ul>
  );
};

const entryStyleClickable = {
  p: 1,
  borderRadius: 1,
  fontFamily: "Ropoto !important",
  "&:hover": {
    cursor: "pointer",
    // backgroundColor: "primary.dark",
    backgroundColor: "#b26a00",
  },
};

const entryStyleClickableOpen = {
  p: 1,
  borderRadius: 1,
  backgroundColor: "#b2102f",
  fontFamily: "Ropoto !important",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#b26a00",
  },
};

export default function NavBar({setShowNavBar,showNavBar,sessionId}) {
  const navigate = useNavigate();
  let location = useLocation();
  ///////////////////////////////////////////////////////
  const [Btn, setBtn] = useState({
    lastBtn: "",
    pervBtn: "",
    userName: "",
  });

  const [counter, setCounter] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("update-counter", Btn);
    Btn.lastBtn !=="" &&  socket.emit("updateUserBtn",{username:localStorage.getItem("userName"),btn : Btn.lastBtn})
    socket.on("disconnect_user", (data) => {
      setCounter(data.counter);
      setUsers(data.allUser);
    });
    socket.on("counter_res", (data) => {
      setCounter(data.counter);
      setUsers(data.allUser);
    });
  }, [Btn, Btn.lastBtn, Btn.pervBtn]);

  const handleClick = (e) => {
    e.preventDefault();
    setBtn((prev) => ({
      lastBtn: e.target.id,
      pervBtn: prev.lastBtn,
      userName: localStorage.getItem("userName"),
    }));
  };

  ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


  const handleNavigation = (link) => {
    navigate(link);
  };

  const isActive = (link) => {
    return link === location.pathname;
  };

  const determineStyle = (link) => {
    if (!isActive(link)) {
      return entryStyleClickable;
    } else {
      return entryStyleClickableOpen;
    }
  };

  return (
    <Paper
      sx={{ m: 3, p: 2, minWidth: "15rem", height: "fit-content" }}
      className={`navbar ${showNavBar && "show-nav" }`}
    >
     
      <Typography sx={entryStyle}>Strategy</Typography>
      <Box sx={{ ml: 1, mb: 2, p: 0 }}>
        <Typography
          className="nav-button"
          sx={determineStyle("/strategy/goal")}
          onClick={(e) => {
            handleNavigation("/strategy/goal");
            handleClick(e);
            socket.emit("updateUserBtn",{username:localStorage.getItem("userName"),btn : Btn.lastBtn})
          }}
          id="Goals"
        >
          Goals & metric{" "}
          <p className="p-count">{counter.Goals > 0 && counter.Goals} </p>
          <ul className="nav-list list">
            {users &&
              users.map((u) =>
                u.btn === "Goals" ? <li>{u.userName}</li> : ""
              )}
          </ul>
        </Typography>

        <Typography sx={entryStyle}>Activities & Target Group</Typography>
        <Box sx={{ ml: 1, mb: 2 }}>
          <Typography
            className="nav-button"
            sx={determineStyle("/activities/collect")}
            onClick={(e) => {
              handleNavigation("/activities/collect");
              handleClick(e);
            }}
            id="Collect"
          >
            Collect{" "}
            <p className="p-count">{counter.Collect > 0 && counter.Collect} </p>
            <ul className="nav-list list">
              {users &&
                users.map((u) =>
                  u.btn === "Collect" ? (
                    <li key={u.userName}>{u.userName}</li>
                  ) : (
                    ""
                  )
                )}
            </ul>
          </Typography>

          <Typography
            className="nav-button"
            sx={determineStyle("/activities/prioritize")}
            onClick={(e) => {
              handleNavigation("/activities/prioritize");
              handleClick(e);
            }}
            id="Prioritize"
          >
            Prioritize{" "}
            <p className="p-count">
              {counter.Prioritize > 0 && counter.Prioritize}{" "}
            </p>
            <ul className="nav-list list">
              {users &&
                users.map((u) =>
                  u.btn === "Prioritize" ? (
                    <li key={u.userName}>{u.userName}</li>
                  ) : (
                    ""
                  )
                )}
            </ul>
          </Typography>
        </Box>
      </Box>
      <Typography sx={entryStyle}>Research</Typography>
      <Box sx={{ ml: 1, mb: 2 }}>
        <Typography
          className="nav-button"
          sx={determineStyle("/research/behavior")}
          onClick={(e) => {
            handleNavigation("/research/behavior");
            handleClick(e);
          }}
          id="behavior"
        >
          Behavior{" "}
          <p className="p-count">{counter.behavior > 0 && counter.behavior} </p>
          {renderCounter(users, "behavior")}
        </Typography>
        <Typography
          className="nav-button"
          sx={determineStyle("/research/users")}
          onClick={(e) => {
            handleNavigation("/research/users");
            handleClick(e);
          }}
          id="userRes"
        >
          User Research{" "}
          <p className="p-count">{counter.userRes > 0 && counter.userRes} </p>
          {renderCounter(users, "userRes")}
        </Typography>
        <Typography
          className="nav-button"
          sx={determineStyle("/research/doesfit")}
          onClick={(e) => {
            handleNavigation("/research/doesfit");
            handleClick(e);
          }}
          id="Gratification"
        >
          Gamification Fit{" "}
          <p className="p-count">
            {counter.Gratification > 0 && counter.Gratification}{" "}
          </p>
          {renderCounter(users, "Gratification")}
        </Typography>
        <Typography
          className="nav-button"
          sx={determineStyle("/research/profile")}
          onClick={(e) => {
            handleNavigation("/research/profile");
            handleClick(e);
          }}
          id="Profile"
        >
          Profile{" "}
          <p className="p-count">{counter.Profile > 0 && counter.Profile} </p>
          {renderCounter(users, "Profile")}
        </Typography>
      </Box>
      <Typography sx={entryStyle}>Synthesis</Typography>
      <Box sx={{ ml: 1, mb: 2 }}>
        <Typography
          className="nav-button"
          sx={determineStyle("/synthesis/skillatom")}
          onClick={(e) => {
            handleNavigation("/synthesis/skillatom");
            handleClick(e);
          }}
          id="SkillAtom"
        >
          Create Skill{" "}
          <p className="p-count">
            {counter.SkillAtom > 0 && counter.SkillAtom}{" "}
          </p>
          {renderCounter(users, "SkillAtom")}
        </Typography>
        <Typography
          className="nav-button"
          sx={determineStyle("/synthesis/identify")}
          onClick={(e) => {
            handleNavigation("/synthesis/identify");
            handleClick(e);
          }}
          id="Problems"
        >
          Identify Problem{" "}
          <p className="p-count">{counter.Problems > 0 && counter.Problems} </p>
          {renderCounter(users, "Problems")}
        </Typography>
      </Box>
      <Typography sx={entryStyle}>Ideation</Typography>
      <Box sx={{ ml: 1, mb: 2 }}>
        <Typography
          className="nav-button"
          sx={determineStyle("/ideation/focusquestions")}
          onClick={(e) => {
            handleNavigation("/ideation/focusquestions");
            handleClick(e);
          }}
          id="FocusQuestions"
        >
          Focus Questions{" "}
          <p className="p-count">
            {counter.FocusQuestions > 0 && counter.FocusQuestions}{" "}
          </p>
          {renderCounter(users, "FocusQuestions")}
        </Typography>
        <Typography
          className="nav-button"
          sx={determineStyle("/ideation/clustering")}
          onClick={(e) => {
            handleNavigation("/ideation/clustering");
            handleClick(e);
          }}
          id="Cluster"
        >
          Cluster & Finalize{" "}
          <p className="p-count">{counter.Cluster > 0 && counter.Cluster} </p>
          {renderCounter(users, "Cluster")}
        </Typography>
      </Box>
      {/* <Button disabled={uploadDisabled} sx={{width: "100%"}} variant="contained"
                onClick={uploadData}
            >Submit</Button> */}
    </Paper>
  );
}
