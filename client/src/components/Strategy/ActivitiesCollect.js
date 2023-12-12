import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  IconButton,
} from "@mui/material";

import AddText from "../Helper/AddText";
import { Delete, Add } from "@mui/icons-material";
import WarningModal from "./WarningModal";
import { socket } from "../../socket";

export default function ActivitiesCollect(props) {
  const [open, setOpen] = useState(false);
  const [activityDisabled, setActivityDisabled] = useState(false);
  const [activityInputValue, setActivityInputValue] = useState("");
  const [activityInputColor, setActivityInputColor] = useState("");
  const [activityText, setActivityText] = useState("");
  const [groupText, setGroupText] = useState("");
  const [groupInputColor, setGroupInputColor] = useState("");
  const [groupInputValue, setGroupInputValue] = useState("");
  const [groupDisabled, setGroupDisabled] = useState(false);
  //GROUP
  const groupFocusHandler = () => {
    socket.emit("group disable input",props.sessionId);
  };

  const groupBlurHandler = () => {
    socket.emit("group enable input",props.sessionId);
  };

  const groupChangeHandler = (e) => {
    setGroupText(e.target.value);
    socket.emit("group typing", { message: e.target.value ,id:props.sessionId});
  };

  //ACTIVITIES

  const activityFocusHandler = () => {
    socket.emit("activity disable input",props.sessionId);
  };

  const activityBlurHandler = () => {
    socket.emit("activity enable input",props.sessionId);
  };

  const activityChangeHandler = (e) => {
    setActivityText(e.target.value);

    socket.emit("activity typing", { message: e.target.value,id:props.sessionId });
  };
  useEffect(() => {
    //Group
    socket.on("group disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
      setGroupDisabled(true);
      setGroupInputColor("#90EE90");}
    });
    socket.on("group enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
      setGroupDisabled(false);
      setGroupInputColor("");}
    });

    socket.on("group typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {

      setGroupInputValue(data.message);}
    });
    socket.on("close-group", (data) => {
      if (data === localStorage.getItem("sessionId")) {
      setGroupInputValue("")}
    });
    socket.on("close-activity", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setActivityInputValue("");}
    });

    
    //Activity
    socket.on("activity disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
      setActivityDisabled(true);
      setActivityInputColor("#90EE90");}
    });
    socket.on("activity enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
      setActivityDisabled(false);
      setActivityInputColor("");}
    });

    socket.on("activity typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {

      setActivityInputValue(data.message);}
    });
  }, []);

  const handePairCreationRequest = () => {
    if (props.activityTargetPairs) {
      setOpen(true);
    } else {
      props.generateActivityPairs();
    }
  };

  const groupAddHandler = async () => {
    console.log("props");
    socket.emit("createTargetGroup", {
      value: groupInputValue,
      id: props.sessionId,
    });
    socket.emit("close-group", props.sessionId);
    setGroupInputValue("");
  };

  const groupDeleteHandler = async (id) => {
    socket.emit("deleteTargetGroup", {
      sessionId: props.sessionId,
      targetId: id,
    });
    setGroupText("");
  };

  const activityAddHandler = async () => {
    console.log("props");
    socket.emit("createActivity", {
      value: activityInputValue,
      id: props.sessionId,
    });
    socket.emit("close-activity", props.sessionId);
    setActivityInputValue("");
  };

  const activityDeleteHandler = async (id) => {
    socket.emit("deleteActivity", {
      sessionId: props.sessionId,
      activityId: id,
    });
    setActivityText("");
  };

  const handleClose = () => setOpen(false);
  //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", mt: 6 }}
        className="collect-box"
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" className="supTitleH3">
            Target Groups
          </Typography>
          <List className="targetGroupList">
            {props.targetGroups.length > 0 &&
              props.targetGroups.map((target) => (
                <ListItem key={target._id}>
                  <ListItemText primary={target.targetGroup} />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => groupDeleteHandler(target._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
            <ListItem>
              <AddText
              onAdd={() => groupAddHandler()}
                placeholder="Add target group"
                focus={() => groupFocusHandler()}
                blur={() => groupBlurHandler()}
                disabled={groupDisabled}
                change={(e) => groupChangeHandler(e)}
                value={groupInputValue}
                groupText={groupText}
                inputColor={groupInputColor}
                customClass="bg-white"
                addStyle = {{color:"white"}}
              />
              <IconButton
                onClick={() => groupAddHandler()}
                disabled={groupText === ""}
                className="icon-white"
              >
              
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" className="supTitleH3">
            Activities
          </Typography>
          <List className="activityList">
            {props.activities.length > 0 &&
              props.activities.map((active) => (
                <ListItem key={active._id}>
                  <ListItemText primary={active.activity} />
                  <ListItemIcon>
                    <IconButton
                      onClick={() => activityDeleteHandler(active._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
            <ListItem>
              <AddText
                onAdd={() => activityAddHandler()}
                placeholder="Add activity"
                focus={() => activityFocusHandler()}
                blur={() => activityBlurHandler()}
                disabled={activityDisabled}
                change={(e) => activityChangeHandler(e)}
                value={activityInputValue}
                inputColor={activityInputColor}
                customClass="bg-white"
                addStyle = {{color:"white"}}
                
              />
              <IconButton
                className="icon-white"
                onClick={() => activityAddHandler()}
                disabled={activityText === ""}
              >
             
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Button
        className="pairsBtn"
        sx={{ color: "black", background: "white" }}
        variant="contained"
        onClick={handePairCreationRequest}
      >
        Create Pairs
      </Button>
      <WarningModal
        open={open}
        handleClose={handleClose}
        execute={props.generateActivityPairs}
        sessionId={props.sessionId}
      />
    </Box>
  );
}
