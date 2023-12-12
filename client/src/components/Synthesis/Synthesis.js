import { Typography, Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Synthesis() {
    return(
        <Box sx={{m: 4}}>
            <Typography variant="h1" className="supTitleH1">
                Synthesis
            </Typography>
            <Outlet />
        </Box>

    )
}