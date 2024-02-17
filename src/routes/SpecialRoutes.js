import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { routeConsts } from 'constants/routeConsts';
import PermissionsDenied from 'views/special-pages/permission-denied';

// login option 3 routing
const NotFoundPage = Loadable(lazy(() => import('views/special-pages/404')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const SpecialRoutes = {
  element: <MinimalLayout />,
  children: [
    {
      path: '*',
      element: <NotFoundPage />
    },
    {
      path: routeConsts.specialPages.index + routeConsts.specialPages.children.accessDenied,
      element: <PermissionsDenied />
    }
  ]
};

export default SpecialRoutes;
