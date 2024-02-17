import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { Box, Typography, Button, Stack } from '@mui/material';
import { routeConsts } from 'constants/routeConsts';
import useAuth from 'hooks/useAuth';

function PermissionsDenied() {
  const { logout } = useAuth();

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
        403
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
        You do not have permission to access this page
      </Typography>
      <Stack direction="row" gap={2}>
        <Button variant="contained" LinkComponent={Link} color="primary" to={routeConsts.auth.index}>
          Back to Home
        </Button>
        <Button onClick={logout} color="primary">
          Logout
        </Button>
      </Stack>
    </Box>
  );
}

export default PermissionsDenied;
