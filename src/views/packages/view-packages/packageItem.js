import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// mui-material
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// project imports
import CustomChip from 'ui-component/extended/Chip';
import { selfHosting, packageStatusObj } from './packageComponents';
// assets
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

PackageItem.propTypes = {
  Package: PropTypes.object,
  widths: PropTypes.object,
  actions: PropTypes.object
};
function PackageItem({ Package, widths, actions }) {
  const color = {
    free: 'success',
    paid: 'warning'
  };
  const { updatedAt } = Package;
  const date = moment(updatedAt);
  return (
    <Stack direction="row" gap={4} width="100%">
      <Stack justifyContent="center" minWidth={widths.dragIcon.width} flex={widths.dragIcon.flex}>
        <ListItemIcon>
          <DragIndicatorOutlinedIcon />
        </ListItemIcon>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2} flex={widths.name.flex} minWidth={widths.name.width}>
        <Stack direction="row" alignItems="center" gap={1} minWidth={120}>
          <ListItemText primary={Package.name} />
        </Stack>
        <CustomChip skin="light" size="small" label={Package.packageType} color={color[Package.packageType]} />
      </Stack>
      <Stack minWidth={widths.price.width} justifyContent="center" flex={widths.price.flex}>
        <Typography noWrap align="center" sx={{ color: 'text.secondary' }} variant="subtitle1">
          {Package.price}
        </Typography>
      </Stack>
      <Stack minWidth={widths['self hosting'].width} alignItems="center" justifyContent="center" flex={widths['self hosting'].flex}>
        {selfHosting[Package.selfHosting]}
      </Stack>
      <Stack minWidth={widths.status.width} alignItems="center" justifyContent="center" flex={widths.status.flex}>
        <CustomChip skin="light" size="small" label={Package.status} color={packageStatusObj[Package.status]} />
      </Stack>
      <Stack minWidth={widths['last updated'].width} textAlign="center" justifyContent="center" flex={widths['last updated'].flex}>
        <Tooltip title={date.format('MMMM Do YYYY, h:mm a')}>
          <Typography noWrap sx={{ textTransform: 'capitalize' }}>
            {date.format('MMMM Do YYYY')}
          </Typography>
        </Tooltip>
      </Stack>
      {actions.editPermission && (
        <Stack minWidth={widths.actions.width} alignItems="center" justifyContent="center" flex={widths.actions.flex}>
          <IconButton onClick={() => actions.edit.fn(Package._id)}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}

export default PackageItem;
