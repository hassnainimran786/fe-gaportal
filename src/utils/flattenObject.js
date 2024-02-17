import { routeConsts } from 'constants/routeConsts';

export function flattenObject(obj) {
  let flatArray = [];

  function flatten(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flatten(obj[key]);
      } else {
        flatArray.push(obj[key]);
      }
    }
  }

  flatten(obj);
  return flatArray;
}

export function exessivePermissions(obj) {
  if (obj[0]?.all) {
    return ['all'];
  }
  let flatArray = [];
  // user edit permissions
  let userEdit = obj.find((permission) => permission?.title === 'User');
  userEdit = userEdit.children.find((permission) => permission?.title === 'Manage Users');
  const isUserEdit = userEdit?.children.findIndex((permission) => permission?.title === 'Edit') > -1;
  if (isUserEdit) {
    const splittedArray = routeConsts.user.children.editUser.split('/');
    flatArray.push(splittedArray[splittedArray.length - 1]);
  }

  // package edit permissions
  let packageEdit = obj.find((permission) => permission?.title === 'Package');
  packageEdit = packageEdit.children.find((permission) => permission?.title === 'Manage Packages');
  const isPackageEdit = packageEdit?.children.findIndex((permission) => permission?.title === 'Edit') > -1;
  if (isPackageEdit) {
    const splittedArray = routeConsts.package.children.editPackage.split('/');
    flatArray.push(splittedArray[splittedArray.length - 1]);
  }
  return [...flattenObject(obj), ...flatArray];
}
