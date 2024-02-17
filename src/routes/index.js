import { useRoutes } from 'react-router-dom';

// routes
import { useMainRoutes } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import SpecialRoutes from './SpecialRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const routes = useMainRoutes();
  // return useRoutes([MainRoutes, AuthenticationRoutes, SpecialRoutes]);
  return useRoutes([routes, AuthenticationRoutes, SpecialRoutes]);
}
