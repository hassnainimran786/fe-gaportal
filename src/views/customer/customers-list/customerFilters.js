import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

// material-ui
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// project imports
import { packageRoutes } from 'constants/servicesRoutes';
import { protectedFetch as axios } from 'utils/axios';
// ============================|| USER FILTERS ||============================ //
CustomerFilters.propTypes = {
  plan: PropTypes.string,
  handlePlanChange: PropTypes.func,
  status: PropTypes.string,
  handleStatusChange: PropTypes.func
};
function CustomerFilters({ plan, handlePlanChange, status, handleStatusChange }) {
  const { isPending: isPackagesLoading, data: packages } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axios.get(packageRoutes.list);
      return response.data;
    }
  });

  return (
    <Grid container spacing={{ xs: 2, md: 3, xl: 6 }}>
      <Grid item sm={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="plan-select">Select Package</InputLabel>
          <Select
            fullWidth
            value={plan}
            id="select-plan"
            label="Select Package"
            labelId="plan-select"
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Select Plan' }}
          >
            <MenuItem value="">All</MenuItem>
            {isPackagesLoading ? (
              <MenuItem value="">Loading...</MenuItem>
            ) : (
              packages &&
              packages.map((Package) => {
                return (
                  <MenuItem value={Package._id} key={Package._id}>
                    {Package.name}
                  </MenuItem>
                );
              })
            )}
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
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default CustomerFilters;
