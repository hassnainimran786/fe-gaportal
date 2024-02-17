export const routeConsts = {
  auth: {
    index: '/',
    children: {
      login: '/login',
      register: '/register',
      forgotPassword: '/forgot-password',
      resetPassword: '/reset-password'
    }
  },
  user: {
    index: '/user',
    children: {
      createUser: '/add-user',
      editUser: '/edit-user',
      manageUser: '/manage-users'
    }
  },
  customer: {
    index: '/customer',
    children: {
      viewCustomer: '/view-customers'
    }
  },
  package: {
    index: '/package',
    children: {
      createPackage: '/add-packages',
      editPackage: '/edit-packages',
      packagesList: '/manage-packages'
    }
  },
  specialPages: {
    index: '/special-pages',
    children: {
      comingSoon: '/coming-soon',
      error404: '/404',
      error500: '/500',
      accessDenied: '/access-denied'
    }
  }
};
