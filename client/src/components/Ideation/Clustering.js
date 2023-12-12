import React, { useState,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AddText from "../Helper/AddText";

import CanvasIdea from "./CanvasIdea";
import CanvasGroup from "./CanvasGroup";
import { socket } from "../../socket.js";
export default function Clustering(props) {
   console.log(props)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  //////////////////////////////////////////////////////////////////////////////////////////
  const [subIdeaDisabled, setSubIdeaDisabled] = useState(false);
  const [subIdeaText, setSubIdeaText] = useState("");
  const [subIdeaInputValue, setSubIdeaInputValue] = useState("");
  const [subIdeaInputColor, setSubIdeaInputColor] = useState("");

  const subIdeaFocusHandler = () => {
    socket.emit("subIdea disable input", props.sessionId);
  };

  const subIdeaBlurHandler = () => {
    socket.emit("subIdea enable input", props.sessionId);
  };

  const subIdeaChangeHandler = (e) => {
    setSubIdeaText(e.target.value);
    socket.emit("subIdea typing", {
      message: e.target.value,
      id: props.sessionId,
    });
  };

  useEffect(() => {
    socket.on("subIdea disable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setSubIdeaDisabled(true);
        setSubIdeaInputColor("#90EE90");
      }
    });
    socket.on("subIdea enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setSubIdeaDisabled(false);
        setSubIdeaInputColor("");
      }
    });

    socket.on("subIdea typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setSubIdeaInputValue(data.message);
      }
    });
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////

  const finishMove = (id, emit) => {
    socket.emit(emit, {
      sessionId: props.sessionId,
      deltaPosition,
      id: id,
    });
  };
  console.log(deltaPosition);
  const startMove = (e, ui) => {
    setDeltaPosition({ x: ui.x, y: ui.y });
  };

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };



 

  return (
    <Box sx={{ position: "relative",  }}>
      {/* <FinalIdeas  top="1rem" right="2rem"/> */}
      <Typography variant="h2" className="supTitleH2">Clustering</Typography>
      <Box sx={{ position: "absolute", top: 0, right: "50px", color: "white" }}>
        <AddText
          placeholder="New Title"
         
        
          onAdd={() =>
            socket.emit("createGroup", { sessionId: props.sessionId, subIdeaInputValue })
          }
          customClass="bg-white"
          addStyle={{ color: "white" }}
          focus={() => subIdeaFocusHandler()}
          blur={() => subIdeaBlurHandler()}
          disabled={subIdeaDisabled}
          change={(e) => subIdeaChangeHandler(e)}
          value={subIdeaInputValue}
          subIdeaText={subIdeaText}
          inputColor={subIdeaInputColor}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100rem",
          background:
            "linear-gradient(90deg, #eee 1%, transparent 1%) 1px 0, linear-gradient(0deg, #eee 1%, transparent 1%) 1px 0, #fff",
          backgroundSize: "60px 60px",
          overflow: "auto",
          flexWrap: "wrap",
        }}
      >
        {/*renderIdeas()*/}

        {props.ideas.map((idea, index) => (
          <CanvasIdea
            dotted={idea.dots}
            name={idea.idea}
            pos={idea.position}
            id={idea._id}
            key={index}
            handleDrag={handleDrag}
            startMove={startMove}
            finishMove={finishMove}
            sessionId={props.sessionId}
          />
        ))}

        {/*renderTexts()*/}

        {props.groups.map((group, index) => (
          <CanvasGroup
            dotted={group.dots}
            name={group.group}
            pos={group.position}
            id={group._id}
            key={index}
            handleDrag={handleDrag}
            startMove={startMove}
            finishMove={finishMove}
            delete={() => {
              props.removeGroup(group._id);
            }}
            sessionId={props.sessionId}
          />
        ))}
      </Box>
    </Box>
  );
}
