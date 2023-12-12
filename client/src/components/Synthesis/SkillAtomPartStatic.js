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
import { HelpOutline } from "@mui/icons-material";

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
    <Box>
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

export default function SkillAtomPartStatic(props) {
  console.log(props);

  return (
    <Card
      sx={{ height: "13rem", width: "15rem", overflowY: "auto" }}
      elevation={8}
    >
      <CardHeader
        title={props.title}
        action={<ExplanationHelper info={props.info} />}
        avatar={props.icon}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {props.points &&
            props.points.map((point) => (
              <Typography align="center" key={point._id}>
                - {point.text}
              </Typography>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
}
