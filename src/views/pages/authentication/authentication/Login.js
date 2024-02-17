// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
// import Logo from 'ui-component/Logo';
import FormLogin from '../auth-forms/AuthLogin';
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Stack justifyContent="center" alignItems="center" minHeight="100vh">
        <FormContainer matchDownSM={matchDownSM} theme={theme} tagline="Welcome to GA Portal">
          <FormLogin />
        </FormContainer>
      </Stack>
    </AuthWrapper1>
  );
};

export default Login;

FormContainer.propTypes = {
  matchDownSM: PropTypes.bool,
  theme: PropTypes.object,
  tagline: PropTypes.string,
  children: PropTypes.node
};
function FormContainer({ matchDownSM, tagline, children }) {
  return (
    <AuthCardWrapper>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
            <Grid item>
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                <Typography gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                  {tagline}
                </Typography>
                <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                  Login in to your account
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={6}>
          {children}
        </Grid>
      </Grid>
    </AuthCardWrapper>
  );
}
