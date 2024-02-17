import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
// material-ui
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// project imports
// import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PackageCreateForm from './packageCreationForm';
import useUser from 'hooks/useUser';

const CreateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userdata = useUser();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (userdata && !userdata.permissions[0]?.all && !location.state?._id) {
      let permissions = userdata?.permissions.find((permission) => permission?.title === 'Package');
      permissions = permissions.children.find((permission) => permission?.title === 'Add Packages');
      const isCreate = permissions.children.findIndex((permission) => permission?.title === 'Save') > -1;
      if (!isCreate) {
        toast.warning('You are not authorized to create packages');
        navigate(-1);
      }
    }

    if (location.state?._id) {
      if (!userdata.permissions[0]?.all) {
        let permissions = userdata?.permissions.find((permission) => permission?.title === 'Package');
        permissions = permissions.children.find((permission) => permission?.title === 'Manage Packages');
        const isEdit = permissions?.children.findIndex((permission) => permission?.title === 'Edit') > -1;
        if (!isEdit) {
          toast.warning('You are not authorized to edit packages');
          navigate(-1);
        }
      }
      setIsEdit(location.state._id);
    }
  }, [location, navigate, userdata]);

  return (
    <MainCard title={isEdit ? 'Edit Package' : 'Create Package'} onBack={() => navigate(-1)}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <PackageCreateForm />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default CreateUser;
