import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// material-ui
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import { getUserColumns } from './userColumns';
import UserFilters from './userFilters';
import { gridSpacing } from 'store/constant';
import TableHeader from 'ui-component/tableHeader';
import { routeConsts } from 'constants/routeConsts';
import { protectedFetch as axios } from 'utils/axios';
import { user } from 'constants/servicesRoutes';
import Modal from 'ui-component/customModal';
import useUser from 'hooks/useUser';
// icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TableSkeleton from 'ui-component/TableSkeleton';

const ManageUsers = () => {
  // ** State
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [searchUserValue, setSearchUserValue] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const userdata = useUser();

  const openWarning = () => setShowWarning(true);
  const closeWarning = () => setShowWarning(false);

  const { data: users, isPending: isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get(user.list);
      return response.data;
    }
  });
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(user.delete + `/${id}`);
      return response.data;
    },
    onSuccess: () => {
      closeWarning();
      queryClient.invalidateQueries('users');
    }
  });
  const handleFilter = useCallback((e) => {
    setSearchUserValue(e.target.value);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);

  const handleEdit = (row) => {
    navigate(`${routeConsts.user.index + routeConsts.user.children.editUser}`, { state: row });
  };

  const handleDelete = (row) => {
    setSelectedUser(row._id);
    openWarning();
  };

  const filteredRow = useMemo(() => {
    if (isFetching) return [];
    if (!users) return [];
    let tempRow = [...users];
    if (role) {
      tempRow = tempRow.filter((item) => item.roleId === role);
    }
    if (status) {
      tempRow = tempRow.filter((item) => item.status === status);
    }
    if (searchUserValue) {
      tempRow = tempRow.filter((item) => item.userName.toLowerCase().includes(searchUserValue.toLowerCase()));
    }
    return tempRow;
  }, [searchUserValue, role, status, users, isFetching]);

  const permissions = useMemo(() => {
    if (userdata && userdata.permissions[0]?.all) return userdata.permissions[0];
    if (userdata) {
      return userdata.permissions.find((permission) => permission.title === 'User');
    }
    return {};
  }, [userdata]);

  const isAuthorizedForCreate = useMemo(() => {
    if (userdata.permissions[0]?.all) return true;
    let permissions = userdata.permissions.find((permission) => permission.title === 'User');
    permissions = permissions.children.find((permission) => permission.title === 'Add Users');
    if (permissions) {
      return permissions.children.findIndex((permission) => permission.title === 'Save') > -1;
    }
    return false;
  }, [userdata]);

  return (
    <Fragment>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Manage Users" />
            <CardContent>
              <UserFilters role={role} handleRoleChange={handleRoleChange} status={status} handleStatusChange={handleStatusChange} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ '& .MuiDataGrid-root': { borderRadius: 2, borderColor: 'transparent' } }}>
            <CardContent sx={{ p: 2 }}>
              <TableHeader
                textFieldProps={{ placeholder: 'Search user', value: searchUserValue, onChange: handleFilter }}
                showEndButton={isAuthorizedForCreate}
                endButtonLabel="Add user"
                endButtonProps={{
                  onClick: () => navigate(`${routeConsts.user.index + routeConsts.user.children.createUser}`)
                }}
              />
            </CardContent>
            {isFetching ? (
              <TableSkeleton />
            ) : (
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={filteredRow}
                columns={getUserColumns({
                  handleEdit: handleEdit,
                  handleDelete: handleDelete,
                  isPending: isDeleting || isFetching,
                  permissions
                })}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[10, 25, 50]}
                localeText={{ noRowsLabel: 'No User(s) Found' }}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      <Modal open={showWarning} onClose={closeWarning}>
        <Stack direction="row" alignItems="center">
          <WarningAmberIcon fontSize="large" color="error" />
          <Typography variant="h3">Warning</Typography>
        </Stack>
        <Typography paragraph>Are you sure you want to delete this user?</Typography>
        <Stack alignItems="flex-end">
          <Stack direction="row" alignItems="center" gap={2}>
            <Button variant="contained" onClick={() => deleteUser(selectedUser)} disabled={isDeleting}>
              Delete
            </Button>
            <Button variant="outlined" onClick={closeWarning} disabled={isDeleting}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Fragment>
  );
};

export default ManageUsers;
