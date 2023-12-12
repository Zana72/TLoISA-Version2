import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function Ideation() {

    return(
        <Box sx={{m: 4}}>
            <Typography variant="h1" className="supTitleH1">Ideation</Typography>
            <Outlet />
        </Box>
    )
}