import { Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import React from 'react';
import { Add, Hiking } from '@mui/icons-material';

export default function DesignLens(props) {

    return(
        <Card sx={{width: "20rem", m: 4}}>
            <CardHeader sx={{bgcolor: "primary.light"}} title={props.title} subheader={props.motivator} action={<AddProblem addProblem={props.addProblem}/>} avatar={<Hiking fontSize="large"/>} titleTypographyProps={{fontSize: "1.2rem"}}/>
            <CardContent>
                <Typography>{props.description}</Typography>
            </CardContent>
        </Card>
    )
}

function AddProblem(props) {

    return(
        <IconButton onClick={props.addProblem}>
            <Add/>
        </IconButton>
    )
}