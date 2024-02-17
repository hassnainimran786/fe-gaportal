import { lazy, useEffect, useState } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { routeConsts } from 'constants/routeConsts';
import { getRouteConsts } from 'utils/get-route-conts';
import ProtectedRoutes from './ProtectedRoutes';
import useUser from 'hooks/useUser';

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ComingSoon = Loadable(lazy(() => import('views/special-pages/coming-soon')));
const CreateUser = Loadable(lazy(() => import('views/user/create-user')));
const ManageUsers = Loadable(lazy(() => import('views/user/manage-users')));
const CustomersList = Loadable(lazy(() => import('views/customer/customers-list')));
const CreatePackage = Loadable(lazy(() => import('views/packages/create-packages')));
const PackagesList = Loadable(lazy(() => import('views/packages/view-packages')));
// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: getRouteConsts(routeConsts.user.index),
  children: [
    {
      path: getRouteConsts(routeConsts.user.children.createUser),
      element: <CreateUser />
    },
    {
      path: getRouteConsts(routeConsts.user.children.editUser),
      element: <CreateUser />
    },
    {
      path: getRouteConsts(routeConsts.user.children.manageUser),
      element: <ManageUsers />
    }
  ]
};
const CustomerRoutes = {
  path: getRouteConsts(routeConsts.customer.index),
  children: [
    {
      path: getRouteConsts(routeConsts.customer.children.viewCustomer),
      element: <CustomersList />
    }
  ]
};

const PackageRoutes = {
  path: getRouteConsts(routeConsts.package.index),
  children: [
    {
      path: getRouteConsts(routeConsts.package.children.createPackage),
      element: <CreatePackage />
    },
    {
      path: getRouteConsts(routeConsts.package.children.editPackage),
      element: <CreatePackage />
    },
    {
      path: getRouteConsts(routeConsts.package.children.packagesList),
      element: <PackagesList />
    }
  ]
};

const dashboardRoutes = {
  index: true,
  element: <ComingSoon />
};

const MainRoutes = {
  element: <ProtectedRoutes />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: []
    }
  ]
};
function handlePermissions(newRoutes, user) {
  if (user && user.permissions[0]?.all) {
    newRoutes.children[0].children.push(dashboardRoutes);
    newRoutes.children[0].children.push(UserRoutes);
    newRoutes.children[0].children.push(CustomerRoutes);
    newRoutes.children[0].children.push(PackageRoutes);
    return newRoutes;
  }
  if (user && user.permissions && user.permissions.findIndex((permission) => permission?.title === 'Dashboard') > -1) {
    newRoutes.children[0].children.push(dashboardRoutes);
  }
  if (user && user.permissions && user.permissions.findIndex((permission) => permission?.title === 'User') > -1) {
    newRoutes.children[0].children.push(UserRoutes);
  }
  if (user && user.permissions && user.permissions.findIndex((permission) => permission?.title === 'Customer') > -1) {
    newRoutes.children[0].children.push(CustomerRoutes);
  }
  if (user && user.permissions && user.permissions.findIndex((permission) => permission?.title === 'Package') > -1) {
    newRoutes.children[0].children.push(PackageRoutes);
  }
  return newRoutes;
}

export const useMainRoutes = () => {
  const [routes, setRoutes] = useState(MainRoutes);
  const user = useUser();

  useEffect(() => {
    setRoutes((prev) => {
      const newRoutes = { ...prev };
      // if (!user) {
      //   const token = localStorage.getItem(config.tokenName);
      //   if (token) {
      //     const decodedToken = jwtDecode(token);
      //     decodedToken.flattenObject = flattenObject(decodedToken.permissions);
      //     return handlePermissions(newRoutes, decodedToken);
      //   }
      // }
      return handlePermissions(newRoutes, user);
    });
  }, [user]);

  return routes;
};
export default MainRoutes;
