import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { grey } from "@mui/material/colors";
import { socket } from "../../socket";

export default function ActivitiesPrioritize(props) {
  // console.log(props);
 
  const moveUp = (prio) => {
    if (prio > 0) {
      socket.emit("moveUp", {
        prio1: prio,
        prio2: prio - 1,
        sessionId: props.sessionId,
      });
    }
  };

  const moveDown = (prio) => {
    if (prio < props.activityTargetPairs.length - 1) {
      socket.emit("moveDown", {
        prio1: prio,
        prio2: prio + 1,
        sessionId: props.sessionId,
      });
    }
  };

  const getRowColor = (active) => {
    if (active === true) {
      return "#FFC107";
    } else {
      return grey[0];
    }
  };
  return (
    <Box sx={{ m: 3 }} className="priorities">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Target Group</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Move</TableCell>
              <TableCell>Pick Focus Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
       
            {props.activityTargetPairs.map((row) => (
              <TableRow
                key={row.priority}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: getRowColor(row.active),
                }}
              >
                <TableCell>{row.targetGroup}</TableCell>
                <TableCell>{row.activity}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>
                  {row.priority > 0 && (
                    <IconButton onClick={() => moveUp(row.priority)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                  )}
                  {row.priority < props.activityTargetPairs.length - 1 && (
                    <IconButton onClick={() => moveDown(row.priority)}>
                      <ArrowDownwardIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {props.activeActivityId !== row._id ? (
                    <Button
                      onClick={() => {
                        socket.emit("pick-pairs", {id: row._id, sessionId :props.sessionId});
                       
                      }}
                    >
                      Pick
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
