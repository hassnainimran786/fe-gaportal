import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

// material-ui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import { getUserColumns } from './customerColumns';
import CustomerFilters from './customerFilters';
import { gridSpacing } from 'store/constant';
import TableHeader from 'ui-component/tableHeader';
import { protectedFetch as axios } from 'utils/axios';
import { customerRoutes } from 'constants/servicesRoutes';
import TableSkeleton from 'ui-component/TableSkeleton';

// assets
import SyncIcon from '@mui/icons-material/Sync';
import HistoryIcon from '@mui/icons-material/History';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

// const rows = [
//   {
//     id: 1,
//     name: 'Hamza Ali',
//     username: 'hamza1',
//     email: 'hamza1@gmail.com',
//     role: 'admin',
//     status: 'active',
//     plan: 'Enterprise'
//   },
//   {
//     id: 2,
//     name: 'Nabeel Ahmed',
//     username: 'nabeel99',
//     email: 'nabeelahmed1699@gmail.com',
//     role: 'author',
//     status: 'pending',
//     plan: 'Team'
//   },
//   {
//     id: 3,
//     name: 'Faizan Farooq',
//     username: 'faizan',
//     email: 'farooqahmed@gmail.com',
//     role: 'maintainer',
//     status: 'inactive',
//     plan: 'Company'
//   },
//   {
//     id: 4,
//     name: 'John Doe',
//     username: 'john.doe',
//     email: 'john.doe@example.com',
//     role: 'editor',
//     status: 'active',
//     plan: 'Basic'
//   },
//   {
//     id: 5,
//     name: 'Alice Smith',
//     username: 'alice.smith',
//     email: 'alice.smith@example.com',
//     role: 'subscriber',
//     status: 'pending',
//     plan: 'Free'
//   },
//   // Add more users with various roles and statuses
//   {
//     id: 6,
//     name: 'Bob Johnson',
//     username: 'bob.johnson',
//     email: 'bob.johnson@example.com',
//     role: 'admin',
//     status: 'active',
//     plan: 'Enterprise'
//   },
//   {
//     id: 7,
//     name: 'Eva Davis',
//     username: 'eva.davis',
//     email: 'eva.davis@example.com',
//     role: 'editor',
//     status: 'pending',
//     plan: 'Team'
//   },
//   {
//     id: 8,
//     name: 'Chris White',
//     username: 'chris.white',
//     email: 'chris.white@example.com',
//     role: 'maintainer',
//     status: 'inactive',
//     plan: 'Company'
//   },
//   {
//     id: 9,
//     name: 'Grace Miller',
//     username: 'grace.miller',
//     email: 'grace.miller@example.com',
//     role: 'author',
//     status: 'active',
//     plan: 'Basic'
//   },
//   {
//     id: 10,
//     name: 'Daniel Brown',
//     username: 'daniel.brown',
//     email: 'daniel.brown@example.com',
//     role: 'subscriber',
//     status: 'pending',
//     plan: 'Free'
//   }
// ];

const CustomersList = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);
  const [plan, setPlan] = useState('');
  const [status, setStatus] = useState('');
  const [searchUserValue, setSearchUserValue] = useState('');

  const { isPending: isCustomerLoading, data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await axios.get(customerRoutes.list);
      return response.data;
    }
  });
  function handleRowOptionsClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleRowOptionsClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    handleRowOptionsClose();
  }
  const handleFilter = useCallback((e) => {
    setSearchUserValue(e.target.value);
  }, []);

  const handlePlanChange = useCallback((e) => {
    setPlan(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);
  const filteredRow = useMemo(() => {
    if (customers && Object.keys(customers).length > 0) {
      let tempRow = [...customers];
      if (plan) {
        tempRow = tempRow.filter((item) => item.packageId === plan);
      }
      if (status) {
        tempRow = tempRow.filter((item) => item.status === status);
      }
      if (searchUserValue) {
        tempRow = tempRow.filter((item) => item.name.toLowerCase().includes(searchUserValue.toLowerCase()));
      }
      return tempRow;
    }
    return [];
  }, [searchUserValue, plan, status, customers]);
  return (
    <Fragment>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Customers" />
            <CardContent>
              <CustomerFilters plan={plan} handlePlanChange={handlePlanChange} status={status} handleStatusChange={handleStatusChange} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {isCustomerLoading ? (
            <TableSkeleton />
          ) : (
            <Card sx={{ '& .MuiDataGrid-root': { borderRadius: 2, borderColor: 'transparent' } }}>
              <CardContent>
                <TableHeader
                  textFieldProps={{
                    placeholder: 'Search',
                    value: searchUserValue,
                    onChange: handleFilter,
                    sx: { maxWidth: '20rem', ml: 'auto' }
                  }}
                />
              </CardContent>
              <DataGrid
                autoHeight
                disableSelectionOnClick
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnFilter
                rows={filteredRow}
                columns={getUserColumns(handleRowOptionsClick)}
                rowsPerPageOptions={[10, 25, 50]}
                getRowId={(row) => row._id}
                localeText={{ noRowsLabel: 'No Customer(s) Found' }}
              />
            </Card>
          )}
        </Grid>
      </Grid>
      <Menu
        keepMounted
        disablePortal
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleRowOptionsClose}>
          <ModeEditOutlineOutlinedIcon fontSize="small" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <SyncIcon fontSize="small" sx={{ mr: 2 }} />
          Sync
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <HistoryIcon fontSize="small" sx={{ mr: 2 }} />
          Login History
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default CustomersList;
