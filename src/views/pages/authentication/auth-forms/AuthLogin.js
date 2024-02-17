import { useState } from 'react';
import { toast } from 'sonner';
// material-ui
import { Box, Grid, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import LoaderButton from 'ui-component/LoaderButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

const initialValues = {
  userName: '',
  password: ''
};

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: 1,
    borderColor: theme.palette.action.disabled
  }
}));

function PasswordLogin({ ...others }) {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login
  });

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } = formik;
  const submitForm = (event) => {
    event.preventDefault();
    if (values.userName === '' || values.password === '') {
      toast.error('Please fill all the required fields!');
    }
    handleSubmit(event);
  };
  return (
    <>
      <form noValidate onSubmit={submitForm} {...others}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel htmlFor="outlined-adornment-userName-login">
              Username{' '}
              <Typography variant="subtitle2" component={'span'} sx={{ color: 'error.main' }}>
                *
              </Typography>
            </InputLabel>
            <FormControl fullWidth error={Boolean(touched.userName && errors.userName)}>
              <CustomOutlinedInput
                autoComplete="off"
                autoFocus
                id="outlined-adornment-userName-login"
                type="userName"
                value={values.userName}
                name="userName"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password{' '}
              <Typography variant="subtitle2" component={'span'} sx={{ color: 'error.main' }}>
                *
              </Typography>
            </InputLabel>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
              <CustomOutlinedInput
                autoComplete="off"
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
                required
              />
            </FormControl>
          </Grid>
        </Grid>

        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          <AnimateButton>
            <LoaderButton
              isLoading={isLoading}
              disableElevation
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log in
            </LoaderButton>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
}

export default PasswordLogin;
