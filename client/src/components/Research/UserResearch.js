import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  ListItem,
} from "@mui/material";
import AddText from "../Helper/AddText";
import { green, red } from "@mui/material/colors";
import { RemoveCircle } from "@mui/icons-material";
import { Delete, Add } from "@mui/icons-material";
import { socket } from "../../socket";

export default function UserResearch(props) {
  /// ///////////////////////////////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //motivator

  //Handler

  /////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box>
      <Typography variant="h2" className="supTitleH2">
        Behavior Chain
      </Typography>
      <Typography className="supTitleH3-beh">
        Add motivators and hurdles to each sub-activity based on your user-data
      </Typography>
      <Box sx={{ display: "flex", m: 2, alignItems: "center" }}>
        <Typography>Target Activity: </Typography>
        <Typography sx={{ ml: 1, fontWeight: 500 }} className="supTitleH3">
          {props.activeActivity && props.activeActivity.activity} /{" "}
          {props.activeActivity && props.activeActivity.targetGroup}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }} className="userResearch">
        {allChain.map((be, index) => (
          <ChainPart
            key={index}
            name={be.name}
            motivations={be.motivations}
            hurdles={be.hurdler}
            beId={be._id}
            addMotivator={(value) => {
              socket.emit("createMotivator", {
                id: be._id,
                name: value,
                sessionId: props.sessionId,
              })
             
            }}
            addHurdle={(value) => {
              socket.emit("createHurdles", {
                id: be._id,
                name: value,
                sessionId: props.sessionId,
              });
            
            }}
            id={be.id}
            removeMotivator={(value) =>
              socket.emit("deleteMotivator", {
                id: be._id,
                name: value,
                sessionId: props.sessionId,
              })
            }
            removeHurdle={(value) =>
              socket.emit("deleteHurdles", {
                id: be._id,
                name: value,
                sessionId: props.sessionId,
              })
            }
          />
        ))}
      </Box>
    </Box>
  );
}

function ChainPart(props) {
  const [MotivatorDisabled, setMotivatorDisabled] = useState(false);
  const [MotivatorText, setMotivatorText] = useState("");
  const [MotivatorInputValue, setMotivatorInputValue] = useState("");
  const [MotivatorInputColor, setMotivatorInputColor] = useState("");
  const [HandlerDisabled, setHandlerDisabled] = useState(false);
  const [HandlerInputValue, setHandlerInputValue] = useState("");
  const [HandlerInputColor, setHandlerInputColor] = useState("");
  const [HandlerText, setHandlerText] = useState("");
  const [beId, setBeId] = useState("");
  const [hardId, setHardId] = useState("");
  ////////////////////////////////////////////////////////////
  // add motivator and hurdler
  const add = (emitName, data) => {
    socket.emit(emitName, data);
  };
  console.log(props);
  ////////////////////////////////////////////////////////////
  const motivatorFocusHandler = () => {
    socket.emit("Motivator disable input");
  };

  const motivatorBlurHandler = () => {
    socket.emit("Motivator enable input");
  };

  const MotivatorChangeHandler = (e, id) => {
    setMotivatorText(e.target.value);
    socket.emit("Motivator typing", { message: e.target.value, id: id });
  };

  ////////////////////////////////////////////////////////////////////
  const handlerFocusHandler = () => {
    socket.emit("Handler disable input");
  };

  const handlerBlurHandler = () => {
    socket.emit("Handler enable input");
  };

  const handlerChangeHandler = (e, id) => {
    setHandlerText(e.target.value);

    socket.emit("Handler typing", { message: e.target.value, id: id });
  };
  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //Group
    socket.on("Handler disable", () => {
      setHandlerDisabled(true);
      setHandlerInputColor("#90EE90");
    });
    socket.on("Handler enable", () => {
      setHandlerDisabled(false);
      setHandlerInputColor("");
      setHandlerInputValue("");
    });

    socket.on("Handler typing", (data) => {
      //   setDisabled(true);

      setHandlerInputValue(data.message);
      setHardId(data.id);
      console.log(data);
    });
    //motivator
    socket.on("Motivator disable", () => {
      setMotivatorDisabled(true);
      setMotivatorInputColor("#90EE90");
    });
    socket.on("Motivator enable", () => {
      setMotivatorDisabled(false);
      setMotivatorInputColor("");
      setMotivatorInputValue("")
    });

    socket.on("Motivator typing", (data) => {
      //   setDisabled(true);
           setBeId(data.id);

      setMotivatorInputValue(data.message);
    });
  }, []);

  // /////////////////////////////////////////////////////////////////////////////////

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "28rem",
        width: "16rem",
        p: 1,
        m: 2,
      }}
      elevation={6}
    >
      <CardHeader
        sx={{ mb: 1, m: 0 }}
        title={props.name}
        titleTypographyProps={{ variant: "h3", align: "center" }}
      />
      <Divider />
      <CardContent sx={{ overflowY: "auto", p: 0, scrollbarWidth: "thin" }}>
        <Paper sx={{ bgcolor: green[100], p: 2, mb: 1 }}>
          <Box sx={{ m: 1, ml: 0 }}>
            <Typography>Motivators:</Typography>
          </Box>
          {props.motivations.map((mov, index) => (
            <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
              <Tooltip title="Remove">
                <IconButton
                  color="error"
                  onClick={() => props.removeMotivator(mov)}
                >
                  <RemoveCircle />
                </IconButton>
              </Tooltip>
              <Typography>{mov}</Typography>
            </Box>
          ))}

          <AddText
            placeholder="New Motivation"
            onAdd={() => {props.addMotivator(MotivatorInputValue)
              setMotivatorInputValue("")
            }}
            focus={() => motivatorFocusHandler()}
            blur={() => motivatorBlurHandler()}
            disabled={props.beId === beId ? MotivatorDisabled : false}
            change={(e) => MotivatorChangeHandler(e, props.beId)}
            value={props.beId === beId ? MotivatorInputValue : ""}
            groupText={MotivatorText}
            inputColor={props.beId === beId ? MotivatorInputColor : ""}
          />
        </Paper>
        <Paper sx={{ bgcolor: red[100], p: 2 }}>
          <Box sx={{ m: 1, ml: 0 }}>
            <Typography>Hurdles:</Typography>
          </Box>
          {props.hurdles.map((hurdle, index) => (
            <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
              <Tooltip title="Remove">
                <IconButton
                  color="error"
                  onClick={() => props.removeHurdle(hurdle)}
                >
                  <RemoveCircle />
                </IconButton>
              </Tooltip>
              <Typography>{hurdle}</Typography>
            </Box>
          ))}

          <AddText
            placeholder="New Hurdle"
            onAdd={() => {props.addHurdle(HandlerInputValue)
              setHandlerInputValue("")
            }}
            focus={() => handlerFocusHandler()}
            blur={() => handlerBlurHandler()}
            disabled={props.beId === hardId ? HandlerDisabled : false}
            change={(e) => handlerChangeHandler(e, props.beId)}
            value={props.beId === hardId ? HandlerInputValue : ""}
            groupText={HandlerText}
            inputColor={props.beId === hardId ? HandlerInputColor : ""}
          />
        </Paper>
      </CardContent>
    </Card>
  );
}
