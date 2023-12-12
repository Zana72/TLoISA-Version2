import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Popover,
} from "@mui/material";
import AddText from "../Helper/AddText";
import { HelpOutline, RemoveCircle } from "@mui/icons-material";

function ExplanationHelper(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box >
      <IconButton onClick={handleClick}>
        <HelpOutline />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box sx={{ m: 2, maxWidth: "20rem" }}>
          <Typography>{props.info}</Typography>
        </Box>
      </Popover>
    </Box>
  );
}

export default function SkillAtomPart(props) {
  const [dynamicElevation, setDynamicElevation] = useState(4);

  const handleActivation = () => {
    props.onClick();
    setDynamicElevation(4);
  };

  if (props.isActive) {
    return (
      <Card className= "SkillAtomPart"
        sx={{
          position: "absolute",
          height: "13rem",
          width: "15rem",
          top: props.top,
          left: props.left,
          overflow: "auto",
        }}
        elevation={8}
      >
        <CardHeader
          title={props.title}
          action={<ExplanationHelper info={props.info} />}
          avatar={props.icon}
        />
        <Divider />
        <CardContent>
          {props.points &&
            props.points.map((point, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: index === 0 ? 0 : 1,
                }}
                key={index}
              >
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => props.removePoint(point._id)}
                >
                  <RemoveCircle />
                </IconButton>
                <Typography align="center" key={point._id}>
                  {point.text}
                </Typography>
              </Box>
            ))}
          {!props.textOnly && (
            <AddText
              placeholder={props.addPlaceholder}
              onAdd={() => props.addPoint()}
              focus={() => props.focus()}
              blur={() => props.blur()}
              disabled={props.disabled}
              change={(e) => props.change(e)}
              value={props.value}
              groupText={props.groupText}
              inputColor={props.inputColor}
            />
          )}
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className= "SkillAtomPart"
        sx={{
          position: "absolute",
          height: "13rem",
          width: "15rem",
          top: props.top,
          left: props.left,
          overflow: "auto",
          "&:hover": { cursor: "pointer" },
        }}
        elevation={dynamicElevation}
        onMouseOver={() => setDynamicElevation(8)}
        onMouseLeave={() => setDynamicElevation(4)}
        onClick={handleActivation}
      >
        <CardHeader
          title={props.title}
          action={<ExplanationHelper info={props.info} />}
          avatar={props.icon}
        />
        <Divider />
        <CardContent>
          {props.points &&
            props.points.map((point, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: parseInt(index) === 0 ? 0 : 1,
                }}
                key={index}
              >
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => props.removePoint(point._id)}
                >
                  <RemoveCircle />
                </IconButton>
                <Typography align="center" key={point._id}>
                  {point.text}
                </Typography>
              </Box>
            ))}
        </CardContent>
      </Card>
    );
  }
}
