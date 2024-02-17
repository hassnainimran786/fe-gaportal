import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRoles } from 'context/rolesContext';
// ============================|| USER FILTERS ||============================ //
UserFilters.propTypes = {
  role: PropTypes.string,
  handleRoleChange: PropTypes.func,
  plan: PropTypes.string,
  handlePlanChange: PropTypes.func,
  status: PropTypes.string,
  handleStatusChange: PropTypes.func
};
function UserFilters({ role, handleRoleChange, status, handleStatusChange }) {
  const roles = useRoles();

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="role-select">Select Role</InputLabel>
          <Select
            fullWidth
            value={role}
            id="select-role"
            label="Select Role"
            labelId="role-select"
            onChange={handleRoleChange}
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value="">Select Role</MenuItem>
            {roles &&
              roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.roleName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="status-select">Select Status</InputLabel>
          <Select
            fullWidth
            value={status}
            id="select-status"
            label="Select Status"
            labelId="status-select"
            onChange={handleStatusChange}
            inputProps={{ placeholder: 'Select Status' }}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inActive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default UserFilters;
