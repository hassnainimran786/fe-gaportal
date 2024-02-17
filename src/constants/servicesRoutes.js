export const authRoutes = {
  login: '/auth',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password'
};
export const packageRoutes = {
  create: '/package',
  list: '/package',
  edit: '/package/',
  delete: '/package/',
  view: '/package/:id',
  updatePrecedence: '/package'
};

export const customerRoutes = {
  create: '/customer',
  list: '/customer',
  edit: '/customer/',
  delete: '/customer/',
  view: '/customer/:id'
};

export const rolesRoutes = {
  create: '/roles',
  list: '/roles',
  edit: '/roles/:id',
  delete: '/roles/:id',
  view: '/roles/:id'
};

export const permissionsRoutes = {
  create: '/permissions',
  list: '/permissions',
  edit: '/permissions/:id',
  delete: '/permissions/:id',
  view: '/permissions/:id'
};

export const user = {
  create: '/user',
  list: '/user',
  get: '/user/:id',
  edit: '/user',
  delete: '/user',
  view: '/user/:id'
};
