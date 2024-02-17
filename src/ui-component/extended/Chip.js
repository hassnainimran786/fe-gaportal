import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import MuiChip from '@mui/material/Chip';
// ** Hooks Imports

import useBgColor from 'hooks/useBgColor';

Chip.propTypes = {
  color: PropTypes.string
};
function Chip(props) {
  const { color } = props;
  const bgColors = useBgColor();

  const colors = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  };

  return <MuiChip {...props} variant="filled" className="MuiChip-light" sx={color ? Object.assign(colors[color]) : sx} />;
}

export default Chip;
