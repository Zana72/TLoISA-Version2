import { RateReview } from '@mui/icons-material';
import { Popover, Box, IconButton, Typography, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import AddText from '../Helper/AddText';

export default function FinalIdeas(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [finalIdeas, setFinalIdeas] = useState([])

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderFinalIdeas = () => {
        let ideas = [];

        for (let idea of finalIdeas) {
            ideas.push(
                <Box sx={{m: 2}}>
                    <Typography>{idea}</Typography>
                </Box>
            )
        }

        return ideas;
    }

    return(
        <Box sx={{position: "fixed", top: props.top, right: props.right}}>
            <Tooltip title="Collect final ideas">
                <IconButton color="primary" aria-describedby={id} onClick={handleClick}><RateReview fontSize="large"/></IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{m: 2, mt: 3, minWidth: "20rem"}}>
                    <Typography variant="h2">Final Ideas</Typography>
                    <Typography variant="subtitle2">Collect your final ideas</Typography>
                    {renderFinalIdeas()}
                    <AddText placeholder="New final idea" onAdd={(newIdea) => setFinalIdeas([...finalIdeas, newIdea])}/>
                </Box>
            </Popover>
        </Box>
    )
}