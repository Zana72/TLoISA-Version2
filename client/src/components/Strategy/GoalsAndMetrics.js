import { Check, Edit } from "@mui/icons-material";
import { TextField, Box, Typography, Paper, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

export default function GoalsAndMetrics(props) {


  // Goal
  const [goalWriting, setGoalWriting] = useState(false);
  const [goalDisabled, setGoalDisabled] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState("");
  const [goalInputColor, setGoalInputColor] = useState("");
  // Metric
  const [metricWriting, setMetricWriting] = useState(false);
  const [metricDisabled, setMetricDisabled] = useState(false);
  const [metricInputValue, setMetricInputValue] = useState("");
  const [metricInputColor, setMetricInputColor] = useState("");


  const saveGoal = () => {
    socket.emit("createGoal", { value: goalInputValue, id: props.sessionId });
    setGoalWriting(false);
    socket.emit("close goal", props.sessionId);
  };

  const saveMetric = () => {
    socket.emit("createMetric", { value: metricInputValue, id: props.sessionId });
    setMetricWriting(false);
    socket.emit("close metric", props.sessionId);
  };
  // Goal
  const goalWritingHandler = (writing) => {
    setGoalWriting(writing);
    socket.emit("goal writing", { writing, id: props.sessionId });
  };

  const goalFocusHandler = () => {
    socket.emit("goal disable input", { color: "#90EE90", id: props.sessionId });
  };
  const goalBlurHandler = () => {

    socket.emit("goal enable input", props.sessionId);

  };

  const goalChangeHandler = (e) => {
    setGoalInputValue(e.target.value);
    socket.emit("goal typing", { goal: e.target.value, id: props.sessionId });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Goal
  const metricWritingHandler = (writing) => {
    setMetricWriting(writing);
    socket.emit("metric writing", { writing, id: props.sessionId });
  };

  const metricFocusHandler = () => {
    socket.emit("metric disable input", { color: "#90EE90", id: props.sessionId });
  };
  const metricBlurHandler = () => {
    socket.emit("metric enable input");
  };

  const metricChangeHandler = (e) => {
    setMetricInputValue(e.target.value);
    socket.emit("metric typing", { metric: e.target.value, id: props.sessionId });
  };

  const effect = async () => {
    // GOAL HANDLING
    socket.on("goal writing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {

        setGoalWriting(data.writing);
      }
    });

    socket.on("goal disable", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setGoalDisabled(true);
        setGoalInputColor(data.color);

      }
    });

    socket.on("close goal", (data) => {
      console.log()

      if (data === localStorage.getItem("sessionId")) {
        setGoalWriting(false);
        setGoalInputValue("");

      }
    });
    socket.on("goal enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setGoalDisabled(false);
        setGoalInputColor("");
      }

    });
    socket.on("goal typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setGoalInputValue(data.goal);
      }
    });

    // METRIC HANDLING

    socket.on("metric writing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setMetricWriting(data.writing);
      }
    });
    socket.on("close metric", (data) => {
     

      if (data === localStorage.getItem("sessionId")) {
        setMetricWriting(false);
        setMetricInputValue("");

      }
    });
    socket.on("metric disable", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setMetricDisabled(true);
        setMetricInputColor(data.color);
      }

    });
    socket.on("metric enable", (data) => {
      if (data === localStorage.getItem("sessionId")) {
        setMetricDisabled(false);
        setMetricInputColor("");
      }
    });
    socket.on("metric typing", (data) => {
      if (data.id === localStorage.getItem("sessionId")) {
        setMetricInputValue(data.metric);
      }
    });
    socket.on("setWriting", (data) => {

      if (data.id === localStorage.getItem("sessionId")) {
        setGoalWriting(false);
      }
    });
  };

  useEffect(() => {
    effect()
  }, []);

  const renderElement = (
    title,
    isWriting,
    setIsWriting,
    focusHandler,
    blurHandler,
    changeHandler,
    disabled,
    inputValue,
    inputColor,
    value,
    placeholder,
    save
  ) => {
    if (isWriting) {
      return (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 5,
            mb: 4,
            alignItems: "center",
            justifyContent: "space-between",
            width: "20rem",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={(e) => changeHandler(e)}
            onFocus={() => focusHandler()}
            onBlur={() => blurHandler()}
            placeholder={placeholder}
            required
            multiline
            disabled={disabled}
            inputProps={{
              style: {
                color: `${inputColor}`,
                WebkitTextFillColor: `${inputColor}`,
              },
            }}
            error={inputColor === "#90EE90" ? true : false}
          />
          <IconButton
            sx={{ mt: 2, width: "fit-content" }}
            color="primary"
            onClick={() => save()}
          >
            <Check />
          </IconButton>
        </Paper>
      );
    } else {
      return (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 5,
            mb: 4,
            alignItems: "center",
            justifyContent: "space-between",
            width: "20rem",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography align="center" sx={{ color: "black" }}>
            {value}
          </Typography>
          <IconButton
            sx={{ mt: 2, width: "fit-content" }}
            color="primary"
            onClick={() => {
              setIsWriting(true);
            }}
          >
            <Edit />
          </IconButton>
        </Paper>
      );
    }
  };

  return (
    <Box>
      <Typography variant="h2" className="supTitleH2">
        Define Goal and Metric
      </Typography>
      <Box
        sx={{
          display: "flex",
          m: 2,
          justifyContent: "space-evenly",
          mt: 5,
          flexWrap: "wrap",
        }}
      >
        {renderElement(
          "Define a goal",
          goalWriting,
          goalWritingHandler,
          goalFocusHandler,
          goalBlurHandler,
          goalChangeHandler,
          goalDisabled,
          goalInputValue,
          goalInputColor,
          props.goal,

          "goal...",
          saveGoal
        )}
        {renderElement(
          "Define a metric",
          metricWriting,
          metricWritingHandler,
          metricFocusHandler,
          metricBlurHandler,
          metricChangeHandler,
          metricDisabled,
          metricInputValue,
          metricInputColor,
          props.metric,

          "metric...",
          saveMetric
        )}
      </Box>
    </Box>
  );
}
