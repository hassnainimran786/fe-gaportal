import moment from 'moment';
// ui-material
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// project imports
import { renderClient, userStatusObj } from './customerComponents';
import CustomChip from 'ui-component/extended/Chip';
// assets
// import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export function getUserColumns() {
  return [
    {
      flex: 1.5,
      minWidth: 230,
      field: 'name',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { name, email } = row;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <div>
                <Typography noWrap component="a" variant="body2" sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}>
                  {name}
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
    // {
    //   flex: 0.2,
    //   field: 'role',
    //   minWidth: 175,
    //   headerName: 'Role',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         {userRoleObj[row.role]}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.role}
    //         </Typography>
    //       </Box>
    //     );
    //   }
    // },
    {
      flex: 1,
      minWidth: 150,
      headerName: 'Plan',
      field: 'packageName',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ textTransform: 'capitalize' }}>
            {row.packageName}
          </Typography>
        );
      }
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip skin="light" size="small" label={row.status} color={userStatusObj[row.status]} sx={{ textTransform: 'capitalize' }} />
        );
      }
    },
    // {
    //   flex: 1.5,
    //   minWidth: 120,
    //   field: 'updatedBy',
    //   headerName: 'Updated By'
    // },
    {
      flex: 1.2,
      minWidth: 120,
      field: 'updatedAt',
      headerName: 'Update At',
      renderCell: ({ row }) => {
        const { updatedAt } = row;
        const date = moment(updatedAt);
        return (
          <Tooltip title={date.format('MMMM Do YYYY, h:mm a')}>
            <Typography noWrap sx={{ textTransform: 'capitalize' }}>
              {date.format('MMMM Do YYYY')}
            </Typography>
          </Tooltip>
        );
      }
    }
    // {
    //   flex: 1,
    //   minWidth: 120,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: () => (
    //     <IconButton size="small" onClick={handleRowOptionsClick}>
    //       <MoreVertOutlinedIcon />
    //     </IconButton>
    //   )
    // }
  ];
}
