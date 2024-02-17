const applicationPrefix = 'ga-portal-';
const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/ga-poral/default'
  basename: '',
  defaultPath: '/',
  fontFamily: `'Montserrat', sans-serif`,
  borderRadius: 12,
  backendServiceBaseURL: process.env.REACT_APP_BACKEND_SERVICE_BASE_URL,
  tokenName: `${applicationPrefix}auth-token-portal`,
  permissionsName: `${applicationPrefix}permissions-portal`
};

export default config;
