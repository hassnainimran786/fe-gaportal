import React from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

// project imports
import CustomAvatar from 'ui-component/extended/Avatar';
import { getInitials } from 'utils/get-initials';

// assets
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';

export const selfHosting = {
  enabled: <DownloadDoneOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'success.main' }} />,
  disabled: <DisabledByDefaultOutlinedIcon fontSize="small" sx={{ mr: 3, color: 'error.main' }} />
};

export const packageStatusObj = {
  active: 'success',
  inActive: 'error'
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
