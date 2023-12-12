import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////

const Dashboard = ({ sessions }) => {
  const navigate = useNavigate();
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [sessionName, setSessionName] = useState("");
  const [sessionId, setSessionId] = useState("");
  console.log(sessionName);
  //////////////////////////////////////
  const sessionChangeHandler = (setState, e) => {
    setState(e.target.value);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box sx={{  }} className="dash-box">

      <Box className="create-session">
        <Box className="new-session">
          <TextField
            id="filled-basic"
            label="session name"
            variant="filled"
            className="createSInput"
            onChange={(e) => sessionChangeHandler(setSessionName, e)}
            value={sessionName}
            
          />

          <Button
            variant="contained"
            onClick={() => {
              console.log(sessionName);
              if (sessionName !== "") {
                
                console.log(sessionName);
                socket.emit("createSession", {sessionName:sessionName.toString(),username:localStorage.getItem("userName")});
               setSessionName("")
               localStorage.setItem("sessionOwner",localStorage.getItem("userName"))
               navigate("/strategy/goal");

              }
            }}
          >
            {" "}
            Create Session{" "}
          </Button>
        </Box>
        <Box className="share-session">
          <TextField
            id="filled-basic"
            label="session id"
            variant="filled"
            className="createSInput"
            onChange={(e) => sessionChangeHandler(setSessionId, e)}
            value={sessionId}
            placeholder = "must be 24 ch"
          />
          <Button
            variant="contained"
            onClick={() => {
              socket.emit("getSession", {id:sessionId.toString(),username:localStorage.getItem("userName")} );
              navigate("/strategy/goal");
            }}
          >
            {" "}
            share Session{" "}
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="left">Subject</StyledTableCell>
              <StyledTableCell align="left">Time</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((row, index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.timestamp}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    onClick={() => {
                      socket.emit("getSession",{id:row._id,username:localStorage.getItem("userName")});
                      navigate("/strategy/goal");
                    }}
                  >
                    view
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
