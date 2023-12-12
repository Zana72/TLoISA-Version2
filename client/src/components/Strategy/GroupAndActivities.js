import { Outlet} from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function GroupAndActivities(props) {

    return(
        <Box>
            <Typography variant="h2" className="supTitleH2">Define Target Group and Activities</Typography>
            <Outlet/>
        </Box>
    )
}