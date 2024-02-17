import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';

// project imports
import { authRoutes } from 'constants/servicesRoutes';
import { routeConsts } from 'constants/routeConsts';
import { unProtectedFetch as axios } from 'utils/axios';
import config from '../config';
import { exessivePermissions } from 'utils/flattenObject';

const defaultAuth = {
  login: () => {},
  logout: () => {},
  isLoading: false,
  user: null,
  setUser: () => {}
};

export const AuthContext = createContext(defaultAuth);

/**
 * AuthProvider component that provides authentication context to its children.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the AuthProvider.
 * @returns {ReactNode} The wrapped child components with authentication context.
 */

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const tokenName = config.tokenName;

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post(authRoutes.login, credentials);
      return response.data;
    },
    onSuccess: onSuccess
  });

  function onSuccess(data) {
    const decodedToken = jwtDecode(data);
    decodedToken.flattenObject = exessivePermissions(decodedToken.permissions);
    setUser(decodedToken);
    localStorage.setItem(tokenName, data);
    const storedRoute = location.state?.from || '/';
    if (storedRoute === '/login' || storedRoute === '/register') {
      navigate(routeConsts.auth.index, { replace: true });
      return;
    }
    navigate(storedRoute, { replace: true });
  }

  function logout() {
    localStorage.removeItem(tokenName);
    setUser(null);
    const loginPageRoute = routeConsts.auth.children.login;
    navigate(loginPageRoute, { replace: true });
  }

  const value = {
    login: mutate,
    logout,
    user,
    setUser,
    isLoading: isPending
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
