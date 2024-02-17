import React, { useState, useCallback, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// material-ui
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';

// project imports
// import { getPackageColumns } from './packageColumns';
// import UserFilters from './packageFilters';
import TableHeader from 'ui-component/tableHeader';
import { protectedFetch as axios } from 'utils/axios';
import { packageRoutes } from 'constants/servicesRoutes';
import TableSkeleton from 'ui-component/TableSkeleton';
import { routeConsts } from 'constants/routeConsts';
import MainCard from 'ui-component/cards/MainCard';
import PackagesTable from './packagesTable';
import useUser from 'hooks/useUser';

// assets
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const PackagesList = () => {
  const queryClient = useQueryClient();
  // const [hosting, setselfHosting] = useState('');
  // const [status, setStatus] = useState('');
  // const [packageType, setPackageType] = useState('');
  const [searchUserValue, setSearchUserValue] = useState('');
  const [isPrecedenceChange, setIsPrecedenceChange] = useState(null);
  const userdata = useUser();
  // const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { isPending: isPackagesLoading, data: packages } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axios.get(packageRoutes.list);
      return response.data;
    }
  });

  // const { mutate: deletePackage, isPending: isDeleting } = useMutation({
  //   mutationFn: async () => {
  //     const response = await axios.delete(packageRoutes.delete + selectedRow._id);
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     toast.success('Package deleted successfully');
  //     handleRowOptionsClose();
  //     queryClient.invalidateQueries('packages');
  //   }
  // });

  const { mutate: editPackage, isPending: isFetchingEdit } = useMutation({
    mutationFn: async (_id) => {
      const response = await axios.get(packageRoutes.edit + _id);
      return response.data;
    },
    onSuccess: (data) => {
      navigate(routeConsts.package.index + routeConsts.package.children.editPackage, {
        state: { ...data, packageLength: packages.length }
      });
    }
  });

  const { mutate: updatePrecedence, isPending: isPrecendingUpdating } = useMutation({
    mutationFn: async () => {
      const modifiedData = isPrecedenceChange?.data.map((item) => ({ _id: item._id, precedence: item.precedence, title: item.name }));
      const response = await axios.patch(packageRoutes.updatePrecedence, modifiedData);
      return response.data;
    },
    onSuccess: () => {
      setIsPrecedenceChange({ state: false, data: null });
      toast.success('Package precedence updated successfully');
      // queryClient.invalidateQueries({ queryKey: ['packages'] });
    }
  });

  const handleFilter = useCallback((e) => {
    setSearchUserValue(e.target.value);
  }, []);

  // const handleHostingChange = useCallback((e) => {
  //   setselfHosting(e.target.value);
  // }, []);

  // const handleStatusChange = useCallback((e) => {
  //   setStatus(e.target.value);
  // }, []);

  // const handlePackageTypeChange = useCallback((e) => {
  //   setPackageType(e.target.value);
  // }, []);
  const filteredRow = useMemo(() => {
    if (packages && Object.keys(packages).length > 0) {
      let tempRow = [...packages];
      // if (hosting) {
      //   tempRow = tempRow.filter((item) => item.selfHosting === hosting);
      // }
      // if (status) {
      //   tempRow = tempRow.filter((item) => item.status === status);
      // }
      // if (packageType) {
      //   tempRow = tempRow.filter((item) => item.packageType === packageType);
      // }
      if (searchUserValue) {
        tempRow = tempRow.filter((item) => item.name.toLowerCase().includes(searchUserValue.toLowerCase()));
      }
      if (isPrecedenceChange?.state) {
        tempRow = isPrecedenceChange.data;
      }
      return tempRow;
    }
    return [];
  }, [packages, searchUserValue, isPrecedenceChange]);

  function onListChange(updateList) {
    queryClient.setQueryData(['packages'], updateList);
    setIsPrecedenceChange({ state: true, data: updateList });
  }
  const isAuthorizedForCreate = useMemo(() => {
    if (userdata.permissions[0]?.all) return true;
    let permissions = userdata.permissions.find((permission) => permission?.title === 'Package');
    permissions = permissions.children.find((permission) => permission?.title === 'Add Packages');
    if (permissions) {
      return permissions.children.findIndex((permission) => permission.title === 'Save') > -1;
    }
    return false;
  }, [userdata]);
  const isAuthorizedForEdit = useMemo(() => {
    if (userdata.permissions[0]?.all) return true;
    let permissions = userdata.permissions.find((permission) => permission?.title === 'Package');
    permissions = permissions.children.find((permission) => permission?.title === 'Manage Packages');
    if (!permissions) return false;
    return permissions.children.findIndex((permission) => permission.title === 'Edit') > -1;
  }, [userdata]);
  return (
    <MainCard title="Packages" content={false}>
      {/* <Grid item xs={12}>
          <Card>
            <CardHeader title="Filters" />
            <CardContent>
              <UserFilters
                hosting={hosting}
                handleHostingChange={handleHostingChange}
                status={status}
                handleStatusChange={handleStatusChange}
                packageType={packageType}
                handlePackageTypeChange={handlePackageTypeChange}
              />
            </CardContent>
          </Card>
        </Grid> */}

      <Box sx={{ '& .MuiDataGrid-root': { borderRadius: 2, borderColor: 'transparent' } }}>
        {isPackagesLoading ? (
          <TableSkeleton />
        ) : (
          <Fragment>
            <CardContent sx={{ p: 2 }}>
              <TableHeader
                textFieldProps={{ placeholder: 'Search', value: searchUserValue, onChange: handleFilter }}
                showStartButton={isPrecedenceChange?.state && isAuthorizedForEdit}
                startButtonLabel="update precedence"
                startButtonProps={{
                  disabled: isPrecendingUpdating,
                  onClick: () => updatePrecedence()
                }}
                showEndButton={isAuthorizedForCreate}
                endButtonLabel="add package"
                endButtonProps={{
                  disabled: packages && packages.length >= 3,
                  onClick: () =>
                    navigate(`${routeConsts.package.index + routeConsts.package.children.createPackage}`, {
                      state: { packageLength: packages?.length ?? 0 }
                    })
                }}
              />
            </CardContent>

            <PackagesTable
              packageList={filteredRow}
              handleListChange={onListChange}
              actions={{ edit: { fn: editPackage, state: isFetchingEdit }, editPermission: isAuthorizedForEdit }}
            />
          </Fragment>
        )}
      </Box>
    </MainCard>
  );
};

export default PackagesList;
