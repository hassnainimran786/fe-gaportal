import React from 'react';
import { Paper } from '@mui/material';
import ComingSoonImg from 'assets/images/coming-soon.jpg';

const ComingSoon = () => {
  return (
    <Paper
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': { maxWidth: '60%', height: 'auto' }
      }}
    >
      <img src={ComingSoonImg} alt="Coming Soon" />
    </Paper>
  );
};

export default ComingSoon;
