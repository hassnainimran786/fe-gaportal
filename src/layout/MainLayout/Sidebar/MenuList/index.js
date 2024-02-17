import _ from 'lodash';
// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useUser from 'hooks/useUser';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const user = useUser();

  function checkPermission(permissions, navItems) {
    let newItems = _.cloneDeep(navItems);
    if (permissions[0]?.all) {
      return newItems;
    }
    if (permissions && permissions.length > 0) {
      if (permissions.findIndex((item) => item?.title === 'User') < 0) {
        newItems = newItems.filter((item) => item?.title !== 'User');
      }
      if (permissions.findIndex((item) => item?.title === 'Package') < 0) {
        newItems = newItems.filter((item) => item?.title !== 'Package');
      }
      if (permissions.findIndex((item) => item?.title === 'Customer') < 0) {
        newItems = newItems.filter((item) => item?.title !== 'Customer');
      }
      if (permissions.findIndex((item) => item?.title === 'Dashboard') < 0) {
        newItems = newItems.filter((item) => item?.title !== 'Dashboard');
      }
      return newItems;
    }
  }

  const navItems = checkPermission(user.permissions, menuItem.items).map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
