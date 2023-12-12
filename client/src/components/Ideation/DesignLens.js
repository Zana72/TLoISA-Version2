import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Hiking } from "@mui/icons-material";

export default function DesignLens(props) {
//   const renderQuestions = () => {
//     let questions = [];
   
//       for (let question of props.questions) {
//         questions.push(
//           <ListItem key={question}>
//             <ListItemText>{question}</ListItemText>
//           </ListItem>
//         );
//       }

//       return questions;
    
//   };

  return (
    <Card sx={{ width: "40rem", m: 4, ml: 0 }}>
      <CardHeader
        sx={{ bgcolor: "primary.light" }}
        title={props.title}
        subheader={props.motivator}
        avatar={<Hiking fontSize="large" />}
        titleTypographyProps={{ fontSize: "1.2rem" }}
      />
      <CardContent>
        <Typography>{props.description}</Typography>
        <List>
        {props.questions.map((question,index)=>(
            <ListItem key={index}>
            <ListItemText>{question}</ListItemText>
          </ListItem>

        ))}
        
        {/*renderQuestions()*/}
        
        
        </List>
      </CardContent>
    </Card>
  );
}
