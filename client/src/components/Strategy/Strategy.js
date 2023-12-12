import { Box, Typography } from '@mui/material';
import React from 'react';
import { Outlet} from 'react-router-dom';

export default function Strategy(props) {

    return(
        <Box sx={{m: 4}}>        
            <Box  className="priorities">
                <Typography variant="h1" className="supTitleH1">Strategy</Typography>
                <Outlet />
            </Box>
        </Box>

    )
}