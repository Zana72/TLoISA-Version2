import { Box, Modal, Paper, Typography, Button } from "@mui/material";
import React from "react";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
export default function WarningModal(props) {
  const navigate = useNavigate();
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
          maxWidth: "50rem",
        }}
      >
        <Box>
          <Typography align="center">
            You already created activity-target pairs. Bei creating new pairs,
            you overwrite all data from the old target pairs. Do you really want
            to proceed?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                socket.emit("pairs", props.sessionId);
                props.handleClose();
                socket.emit("new-pairs");
                socket.emit("note",props.sessionId );
                
                navigate("/activities/prioritize");
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
