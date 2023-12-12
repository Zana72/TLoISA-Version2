import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Box, Tooltip } from "@mui/material";
import { green, red, blue } from "@mui/material/colors";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function Profile(props) {
  /// ///////////////////////////////////////////////////////////////////////////////////////
  const [allChain, setAllChain] = useState([]);
  useEffect(() => {
    setAllChain(
      props.id
        ? props.behaviorChain.filter(
            (beh) => beh.pairsId === props.id
          )
        : []
    );
  }, [props.id, props.behaviorChain]);
  /////////////////////////////////////////////////////////////////////////////////////////////////
  let uniqueList = [];
 

  return (
    <Box>
      <Typography variant="h2">Target Activity Profile</Typography>
      <Paper sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Goal</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{props.goal}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Metric</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{props.metric}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Activity</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{props.activity}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Targetgroup</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{props.targetGroup}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>
              Behavior Chain
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mb: 2,
              }}
            >
              {allChain.map((be, index) => (
                <Box
                  index={index}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {be.priority !== 0 && (
                    <DoubleArrowIcon
                      index={index + "_arrow"}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  )}
                  <Paper
                    sx={{
                      display: "flex",
                      bgcolor: blue[200],
                      p: 0.8,
                      mr: 1,
                      mb: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    elevation={!be.fitAnswers.includes(false) ? 4 : 0}
                  >
                    {!be.fitAnswers.includes(false) && (
                      <Tooltip title="Fits Gamification">
                        <SportsEsportsIcon />
                      </Tooltip>
                    )}
                    <Typography>{be.name}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Motivators</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mb: 2,
              }}
            >
            {allChain.length > 0 &&
                allChain.map((be, i)=>
                be.motivations.map((hurd, index) =>
                !uniqueList.includes(hurd) ? (
                  <Paper
                    sx={{ bgcolor: green[200], p: 0.8, mr: 1, mb: 1 }}
                    key={hurd}
                  >
                    <Typography>{hurd}</Typography>
                  </Paper>
                ) : (
                  ""
                )
              )
                )
               }
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500, mb: 2 }}>Hurdles</Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mb: 2,
              }}
            >
              {allChain.length > 0 &&
                allChain.map((be, i)=>
                be.hurdler.map((hurd, index) =>
                !uniqueList.includes(hurd) ? (
                  <Paper
                    sx={{ bgcolor: red[200], p: 0.8, mr: 1, mb: 1 }}
                    key={hurd}
                  >
                    <Typography>{hurd}</Typography>
                  </Paper>
                ) : (
                  ""
                )
              )
                )
               }
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

