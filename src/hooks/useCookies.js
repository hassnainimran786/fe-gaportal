import Cookies from 'js-cookie';

/**
 * Custom hook for managing cookies.
 * @returns {Object} An object containing functions to set, get, and remove cookies.
 */
const useCookies = () => {
  // Function to set a cookie
  const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, options);
  };

  // Function to get the value of a cookie
  const getCookie = (name) => {
    return Cookies.get(name);
  };

  // Function to remove a cookie
  const removeCookie = (name) => {
    Cookies.remove(name);
  };

  return {
    setCookie,
    getCookie,
    removeCookie
  };
};

export default useCookies;
