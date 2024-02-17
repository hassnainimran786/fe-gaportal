import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

// project imports
import { protectedFetch as axios } from 'utils/axios';
import { rolesRoutes } from 'constants/servicesRoutes';

const defaultValues = {
  roles: []
};
const rolesContext = createContext(defaultValues);

export const useRoles = () => useContext(rolesContext);

RolesProvider.propTypes = {
  children: PropTypes.node
};

function RolesProvider({ children }) {
  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await axios.get(rolesRoutes.list);
      return response.data;
    }
  });

  return <rolesContext.Provider value={roles}>{children}</rolesContext.Provider>;
}

export default RolesProvider;
