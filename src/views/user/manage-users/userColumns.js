// ui-material
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project imports
import { renderClient, userRoleObj, userStatusObj } from './userComponents';
import CustomChip from 'ui-component/extended/Chip';

// assets
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export function getUserColumns(actions) {
  const columns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'userName',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { userName, email } = row;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <div>
                <Typography noWrap component="a" variant="body2" sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}>
                  {userName}
                </Typography>
              </div>
              <div>
                <Typography noWrap component="a" variant="caption" sx={{ textDecoration: 'none' }}>
                  {email}
                </Typography>
              </div>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.2,
      field: 'role',
      minWidth: 175,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {userRoleObj[row.roleDetail.name]}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.roleDetail.name}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip skin="light" size="small" label={row.status} color={userStatusObj[row.status]} sx={{ textTransform: 'capitalize' }} />
        );
      }
    }
    // {
    //   flex: 0.15,
    //   minWidth: 120,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => (
    //     <Stack direction="row" alignItems="center" gap={2}>
    //       <IconButton size="small" onClick={() => actions.handleEdit(row)} disabled={actions.isPending}>
    //         <ModeEditOutlineOutlinedIcon color="secondary" />
    //       </IconButton>
    //       <IconButton size="small" onClick={() => actions.handleDelete(row)} disabled={actions.isPending}>
    //         <DeleteOutlineOutlinedIcon color="error" />
    //       </IconButton>
    //     </Stack>
    //   )
    // }
  ];
  if (actions.permissions?.all) {
    columns.push(actionsConditionally('all', actions));
    return columns;
  }
  const featurePermissions = actions.permissions.children.find((permission) => permission.title === 'Manage Users');
  const isEdit = featurePermissions?.children.findIndex((permission) => permission.title === 'Edit') > -1;
  const isDelete = featurePermissions?.children.findIndex((permission) => permission.title === 'Delete') > -1;
  if (isEdit && isDelete) {
    columns.push(actionsConditionally('isEdit&&isDelete', actions));
    return columns;
  }
  if (isEdit && !isDelete) {
    columns.push(actionsConditionally('isEdit', actions));
    return columns;
  }
  if (!isEdit && isDelete) {
    columns.push(actionsConditionally('isDelete', actions));
    return columns;
  }
  return columns;
}

function actionsConditionally(permissions, actions) {
  if (permissions === 'all' || permissions === 'isEdit&&isDelete') {
    return {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton size="small" onClick={() => actions.handleEdit(row)} disabled={actions.isPending}>
            <ModeEditOutlineOutlinedIcon color="secondary" />
          </IconButton>
          <IconButton size="small" onClick={() => actions.handleDelete(row)} disabled={actions.isPending}>
            <DeleteOutlineOutlinedIcon color="error" />
          </IconButton>
        </Stack>
      )
    };
  }
  if (permissions === 'isEdit') {
    return {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton size="small" onClick={() => actions.handleEdit(row)} disabled={actions.isPending}>
            <ModeEditOutlineOutlinedIcon color="secondary" />
          </IconButton>
        </Stack>
      )
    };
  }
  if (permissions === 'isDelete') {
    return {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton size="small" onClick={() => actions.handleDelete(row)} disabled={actions.isPending}>
            <DeleteOutlineOutlinedIcon color="error" />
          </IconButton>
        </Stack>
      )
    };
  }
}
