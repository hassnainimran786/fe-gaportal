import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography, Button } from '@mui/material';
import { routeConsts } from 'constants/routeConsts';
function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h2" sx={{ mb: 1, color: 'text.secondary' }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
        Page not found
      </Typography>
      <Button variant="contained" LinkComponent={Link} color="primary" to={routeConsts.auth.index}>
        Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
