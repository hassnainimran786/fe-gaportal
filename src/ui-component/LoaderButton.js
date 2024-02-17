import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import { Stack, Typography, CircularProgress } from '@mui/material';

const LoaderButton = ({ isLoading = false, children, ...other }) => {
  return (
    <Button disabled={isLoading} {...other} sx={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}>
      {isLoading ? (
        <Stack direction="row" alignItems="center">
          <CircularProgress size={29} color="dark" />
          <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
            Loading...
          </Typography>
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
};
LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node
};
LoaderButton.defaultProps = {
  isLoading: false
};
export default LoaderButton;
