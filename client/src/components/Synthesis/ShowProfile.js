import { Article } from '@mui/icons-material';
import { Popover, Box, IconButton } from '@mui/material';
import React, { useState } from 'react';

export default function ShowProfile(props) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <Box sx={{position: "fixed", top: props.top, right: props.right}}>
            <IconButton color="primary" aria-describedby={id} onClick={handleClick}><Article fontSize="large"/></IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{m: 2}}>
                    {props.profile}
                </Box>
            </Popover>
        </Box>
    )
}