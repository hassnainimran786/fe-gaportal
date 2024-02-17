import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';

// project imports
import useAuth from './useAuth';
import config from '../config';
import { routeConsts } from 'constants/routeConsts';
import { flattenObject } from 'utils/flattenObject';

const useUser = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenName = config.tokenName;

  useEffect(() => {
    const checkUserAuthentication = () => {
      const token = localStorage.getItem(tokenName);

      if (!user && token) {
        try {
          const decodedToken = jwtDecode(token);
          decodedToken.flattenObject = flattenObject(decodedToken.permissions);
          setUser(decodedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else if (!token) {
        const loginPageRoute = routeConsts.auth.children.login;
        navigate(loginPageRoute, { state: { from: location.pathname } });
      }
    };

    checkUserAuthentication();
  }, [user, setUser, tokenName, navigate, location.pathname]);

  return user;
};

export default useUser;
