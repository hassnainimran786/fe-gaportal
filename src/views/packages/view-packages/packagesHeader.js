import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

PackagesHeader.propTypes = {
  widths: PropTypes.object,
  actions: PropTypes.object
};
function PackagesHeader({ widths, actions }) {
  const strictWidths = useMemo(() => {
    if (!actions.editPermission) {
      delete widths.actions;
    }
    return widths;
  }, [widths, actions]);
  return (
    <Stack
      direction="row"
      bgcolor="primary.light"
      color="grey.600"
      minHeight={50}
      alignItems="center"
      gap={4}
      px={2}
      sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
    >
      {Object.keys(strictWidths).map((key) => (
        <Typography
          key={key}
          variant="subtitle1"
          component="div"
          fontSize={12}
          fontWeight={600}
          minWidth={key === 'name' ? widths[key].width + 60 : widths[key].width}
          textAlign={key === 'name' ? 'left' : 'center'}
          textTransform="uppercase"
          sx={{ flex: widths[key].flex, minWidth: widths[key].width }}
        >
          {key === 'dragIcon' ? '' : key}
        </Typography>
      ))}
    </Stack>
  );
}

export default PackagesHeader;
