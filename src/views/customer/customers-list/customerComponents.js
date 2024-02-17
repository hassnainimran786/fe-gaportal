import React from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

// project imports
import CustomAvatar from 'ui-component/extended/Avatar';

// assets
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { getInitials } from 'utils/get-initials';

export const userRoleObj = {
  admin: <LaptopOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'error.main' }} />,
  author: <SettingsOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'warning.main' }} />,
  editor: <EditOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'info.main' }} />,
  maintainer: <DonutLargeOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'success.main' }} />,
  subscriber: <PermIdentityOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'primary.main' }} />
};

export const userStatusObj = {
  active: 'success',
  inactive: 'secondary'
};

// ** Styled component for the link for the avatar with image
export const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}));

export // ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}));

export // ** renders client column
const renderClient = (row) => {
  return (
    <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
      <CustomAvatar skin="light" color="secondary" sx={{ width: 30, height: 30, fontSize: '14px' }}>
        {getInitials(row.name)}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  );
};

// ** Styled component for the link inside menu
export const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}));
