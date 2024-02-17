import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

// project imports
import { protectedFetch as axios } from 'utils/axios';
import { permissionsRoutes } from 'constants/servicesRoutes';

const defaultValues = {
  permissions: []
};
const permissionsContext = createContext(defaultValues);

export const usePermissions = () => useContext(permissionsContext);

PermissionsProvider.propTypes = {
  children: PropTypes.node
};

function PermissionsProvider({ children }) {
  const { data: permissions } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const response = await axios.get(permissionsRoutes.list);
      return response.data;
    }
  });
  return <permissionsContext.Provider value={permissions}>{children}</permissionsContext.Provider>;
}

export default PermissionsProvider;
