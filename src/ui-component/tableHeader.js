import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

TableHeader.propTypes = {
  showStartButton: PropTypes.bool,
  startButtonLabel: PropTypes.string,
  showEndButton: PropTypes.bool,
  endButtonLabel: PropTypes.string,
  startButtonProps: PropTypes.object,
  endButtonProps: PropTypes.object,
  textFieldProps: PropTypes.object
};

function TableHeader(props) {
  // ** Props
  const { showStartButton, startButtonLabel, showEndButton, endButtonLabel, startButtonProps, endButtonProps, textFieldProps } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: showStartButton ? 'space-between' : 'flex-end'
      }}
    >
      {showStartButton && (
        <Button sx={{ mr: 4, mb: { xs: 2, sm: 0, md: 2, lg: 0 } }} variant="outlined" {...startButtonProps}>
          {startButtonLabel}
        </Button>
      )}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'flex-end', md: 'flex-start' },
          alignItems: 'center',
          width: showEndButton ? 'auto' : '100%',
          gap: showEndButton ? '1rem' : '0rem'
          // maxWidth: showEndButton ? '30rem' : '100%'
        }}
      >
        <TextField
          fullWidth={!showEndButton && showStartButton}
          size="small"
          sx={{ ml: !showEndButton && !showStartButton ? 'auto' : '' }}
          {...textFieldProps}
        />

        {showEndButton && (
          <Button variant="contained" {...endButtonProps}>
            {endButtonLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default TableHeader;
