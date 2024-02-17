import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Stack, Box } from '@mui/material';
import { styled } from '@mui/system';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// List of icons to display
import iconList from 'constants/icons';

const StyledButton = styled('button')(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.action.disabled}`,
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.grey[50],
  padding: `${theme.spacing(1.6)} ${theme.spacing(1.5)}`,
  color: theme.palette.grey[500],
  fontSize: '0.93rem',
  display: 'flex',
  justifyContent: 'space-between',
  textTransform: 'none', // Prevent text transformation
  cursor: 'pointer'
}));

IconSelector.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string
};

function IconSelector({ handleChange, value = '' }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    handleChange(iconName);
    handleClose();
  };

  const selectedIconObj = useMemo(() => {
    if (!selectedIcon) return null;
    const selectedObj = iconList.find((icon) => icon.name === selectedIcon);
    return selectedObj;
  }, [selectedIcon]);

  useEffect(() => {
    if (value) setSelectedIcon(value);
  }, [value]);

  return (
    <div style={{ width: '100%' }}>
      <StyledButton onClick={handleClick} type="button">
        <Stack direction="row" alignItems="center" gap={1}>
          <FormatListBulletedIcon />
          <Box>Feature List Icon</Box>
        </Stack>
        {selectedIcon && selectedIconObj[selectedIcon]}
      </StyledButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: '100%'
          }
        }}
      >
        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {iconList.map((icon) => (
            <Box height={50} width={50} key={icon.name}>
              <MenuItem onClick={() => handleIconSelect(icon.name)}>{icon[icon.name]}</MenuItem>
            </Box>
          ))}
        </Stack>
      </Menu>
    </div>
  );
}

export default IconSelector;
