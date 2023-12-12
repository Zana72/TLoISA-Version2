import { Add } from "@mui/icons-material";
import { IconButton, TextField, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

// import { socket } from "../../socket";

export default function AddText(props) {
  // const [text, setText] = useState("");
  //   const [disabled, setDisabled] = useState(false);
  //   const [inputValue, setInputValue] = useState("");
  // const handleAdd = () => {
  //   props.onAdd;
  // };

  //   const focusHandler = () => {
  //     socket.emit("disable input");
  //   };

  //   const blurHandler = () => {
  //     socket.emit("enable input");
  //   };

  //   const changeHandler = (e) => {
  //     setText(e.target.value);
  //     socket.emit("typing", { message: e.target.value });
  //   };
  //   useEffect(() => {
  //     socket.on("disable", () => {
  //       setDisabled(true);
  //     });
  //     socket.on("enable", () => {
  //       setDisabled(false);
  //     });

  //     socket.on("typing", (data) => {
  //       //   setDisabled(true);

  //       setInputValue(data.message);
  //     });
  //   }, [disabled]);
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        className={`${props.customClass && props.customClass}`}
        placeholder={props.placeholder}
        variant="standard"
        value={props.value}
        onFocus={props.focus}
        onBlur={props.blur}
        disabled={props.disabled}
        onChange={props.change}
        inputProps={{
          style: {
            color: `${props.inputColor}`,
            WebkitTextFillColor: `${props.inputColor}`,
          },
        }}
        error={props.inputColor == "#90EE90" ? true : false}
      />
      <IconButton
        onClick={() => props.onAdd()}
        disabled={props.groupText === ""}
        className="icon-black"
      >
        <Add style={props.addStyle}/>
      </IconButton>
    </Box>
  );
}
