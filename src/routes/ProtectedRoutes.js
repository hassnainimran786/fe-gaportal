import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

// project imports
import { routeConsts } from 'constants/routeConsts';
import PermissionsProvider from 'context/permissionsContext';
import RolesProvider from 'context/rolesContext';
import useUser from 'hooks/useUser';
import config from '../config';

const ProtectedRoutes = () => {
  const location = useLocation();
  const user = useUser();

  const redirectToNextRoute = (user) => {
    if (user && user.permissions) {
      if (user.flattenObject.includes(routeConsts.user.children.manageUser.slice(1))) {
        return <Navigate to={routeConsts.user.index + routeConsts.user.children.manageUser} />;
      }
      // if (user.flattenObject.includes(routeConsts.user.children.createUser.slice(1))) {
      //   return <Navigate to={routeConsts.user.index + routeConsts.user.children.createUser} />;
      // }
      if (user.flattenObject.includes(routeConsts.customer.children.viewCustomer.slice(1))) {
        return <Navigate to={routeConsts.customer.index + routeConsts.customer.children.viewCustomer} />;
      }
      // if (user.flattenObject.includes(routeConsts.package.children.createPackage.slice(1))) {
      //   return <Navigate to={routeConsts.package.index + routeConsts.package.children.createPackage} />;
      // }
      if (user.flattenObject.includes(routeConsts.package.children.packagesList.slice(1))) {
        return <Navigate to={routeConsts.package.index + routeConsts.package.children.packagesList} />;
      }
      return <Navigate to={routeConsts.specialPages.index + routeConsts.specialPages.children.accessDenied} />;
    }
  };

  const checkPermission = (user) => {
    if (location.pathname === '/') {
      if (user && user.flattenObject && user.flattenObject.includes('dashboard')) {
        return <Outlet />;
      }
      return redirectToNextRoute(user);
    }
    let locationWithoutSlash = location.pathname.slice(1);
    locationWithoutSlash = locationWithoutSlash.split('/');
    if (user && user.flattenObject) {
      if (user.flattenObject.includes(locationWithoutSlash[locationWithoutSlash.length - 1])) {
        return <Outlet />;
      }
      <Navigate to={routeConsts.specialPages.index + routeConsts.specialPages.children.accessDenied} />;
    }
    return <Navigate to={routeConsts.specialPages.index + routeConsts.specialPages.children.accessDenied} />;
  };

  if (user && user.permissions[0]?.all) {
    return (
      <PermissionsProvider>
        <RolesProvider>
          <Outlet />
        </RolesProvider>
      </PermissionsProvider>
    );
  }

  if (!user && localStorage.getItem(config.tokenName) === null) {
    return <Navigate to={routeConsts.auth.children.login} state={{ from: location.pathname }} />;
  }

  return (
    <PermissionsProvider>
      <RolesProvider>{checkPermission(user)}</RolesProvider>
    </PermissionsProvider>
  );
};

export default ProtectedRoutes;
