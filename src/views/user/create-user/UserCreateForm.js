import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
// material-ui
import {
  Box,
  Stack,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Grid,
  InputAdornment,
  FormControlLabel,
  Switch,
  Typography,
  Skeleton,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project imports
import { gridSpacing } from 'store/constant';
import { useRoles } from 'context/rolesContext';
import PermissionsSetter from './permissionsSetter';
import { routeConsts } from 'constants/routeConsts';
import { usePermissions } from 'context/permissionsContext';

// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useEffect } from 'react';

// ============================|| FIREBASE - LOGIN ||============================ //
const StyledFormHelper = styled(FormHelperText)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.2),
  color: `${theme.palette.error.dark} !important`,
  borderRadius: '4px',
  minWidth: '100px',
  textAlign: 'center',
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(2),
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '30px',
  gap: theme.spacing(0.7)
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}));

const defaultValues = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  status: true,
  roleId: '#' // default value for select
};

UserCreateForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool,
  isEdit: PropTypes.bool
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().max(255).required('Username is required'),
  email: Yup.string().max(255).email('Enter valid email').required('Email is required'),
  password: Yup.string().when('isEdit', {
    is: false,
    then: Yup.string().max(255).required('Password is required'),
    otherwise: Yup.string().max(255)
  }),
  confirmPassword: Yup.string().when(['isEdit', 'password'], {
    is: (isEdit, password) => !isEdit && password,
    then: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    otherwise: Yup.string()
  }),
  roleId: Yup.string().required('Role is required'),
  status: Yup.boolean().required('Activation status is required')
});

function UserCreateForm({ onSubmit, isPending, isEdit, ...others }) {
  const roles = useRoles();
  const permissions = usePermissions();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const [userPermissions, setUserPermissions] = useState([]);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (location.state) {
      setInitialValues((prev) => ({
        ...prev,
        ...location.state,
        password: '',
        confirmPassword: '',
        status: location.state.status === 'active'
      }));
      setUserPermissions(location.state.permissions);
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (!isEdit && values.password === '') {
        return formik.setErrors({ password: 'Password is required' });
      }
      if (values.roleId === '#') {
        return formik.setErrors({ roleId: 'Role is required' });
      }
      onSubmit({ ...values, permissions: userPermissions });
      formik.resetForm();
      navigate(routeConsts.user.index + routeConsts.user.children.manageUser);
    },
    enableReinitialize: true
  });

  function handlePermissionChange(permissionsToSet, index, title) {
    setUserPermissions((prev) => {
      const newPermissions = [...prev];
      // if the permissionsToSet is empty, remove the module from the array
      if (permissionsToSet.length === 0) {
        const permissions = newPermissions.filter((permission) => permission?.title !== title);
        return permissions;
      }

      const permissionModule = _.cloneDeep(permissions[index]);
      permissionModule.children = permissionsToSet;
      newPermissions[index] = permissionModule;
      return newPermissions;
    });
  }
  const { errors, touched, values, handleSubmit, handleChange, handleBlur } = formik;
  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit} {...others}>
        <Grid container spacing={gridSpacing}>
          {/* username */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.userName && errors.userName)}>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                placeholder="Username"
                value={values.userName}
                name="userName"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.userName && errors.userName && (
                <FormHelperText error id="standard-weight-helper-text-username">
                  {errors.userName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* email */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                placeholder="Email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* password */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
              <OutlinedInput
                autoComplete="new-password"
                id="outlined-adornment-password"
                type={showPassword.password ? 'text' : 'password'}
                placeholder="Password"
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOpenOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}>
                      {showPassword.password ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* confirmPassword */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)}>
              <OutlinedInput
                id="outlined-adornment-confirmPassword"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <LockOpenOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
                      {showPassword.confirmPassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-confirmPassword">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* status */}
          <Grid item xs={12} md={6}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: `1px solid ${theme.palette.action.disabled}`,
                borderRadius: 1,
                background: theme.palette.grey[50],
                px: 1,
                py: 0.7
              }}
            >
              <Typography variant="legend">Status</Typography>
              <FormControlLabel
                sx={{ width: '100%', justifyContent: 'flex-end' }}
                control={<Switch name="status" checked={values.status} onChange={handleChange} onBlur={handleBlur} />}
                label={values.status ? 'active' : 'inactive'}
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" minHeight={32}>
              {touched.status && errors.status && (
                <StyledFormHelper id="standard-weight-helper-text-status">
                  <ErrorOutlineIcon />
                  <span>{errors.status}</span>
                </StyledFormHelper>
              )}
            </Stack>
          </Grid>
          {/* roles */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={Boolean(touched.roleId && errors.roleId)}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.roleId}
                name="roleId"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select Role"
              >
                <MenuItem value="#">Select Role</MenuItem>
                {roles ? (
                  roles.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.roleName}
                    </MenuItem>
                  ))
                ) : (
                  <div>
                    <MenuItem value="2">
                      <Skeleton />
                    </MenuItem>
                    <MenuItem value="1">
                      <Skeleton />
                    </MenuItem>
                    <MenuItem value="3">
                      <Skeleton />
                    </MenuItem>
                  </div>
                )}
              </Select>
              {touched.roleId && errors.roleId && (
                <FormHelperText error id="standard-weight-helper-selector-roleId">
                  {errors.roleId}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        {/* permissions */}
        <StyledGrid>
          {permissions &&
            permissions.map((module, index) => {
              return (
                <Stack key={module._id} sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 4 }}>
                  <PermissionsSetter
                    module={module}
                    values={userPermissions[index]}
                    handleChange={(value) => handlePermissionChange(value, index, module.title)}
                  />
                </Stack>
              );
            })}
        </StyledGrid>
        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }} spacing={2}>
          <Button disabled={isPending} size="large" type="submit" variant="contained">
            {isEdit ? 'Update' : 'Submit'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="large"
            color="silver"
            disabled={isPending}
            onClick={() => navigate(routeConsts.user.index + routeConsts.user.children.manageUser)}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Fragment>
  );
}

export default UserCreateForm;
