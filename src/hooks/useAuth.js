import { useContext } from 'react';

// project imports
import { AuthContext } from 'context/authContext';

/**
 * Custom hook that returns the authentication context.
 * @returns {AuthContext} The authentication context.
 */
const useAuth = () => useContext(AuthContext);

export default useAuth;
