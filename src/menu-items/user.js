// assets
import { IconKey, IconUser } from '@tabler/icons';
import { routeConsts } from 'constants/routeConsts';
import { getRouteConsts } from 'utils/get-route-conts';
// constant
const icons = {
  IconKey,
  IconUser
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const user = {
  id: getRouteConsts(routeConsts.user.index),
  title: 'User',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: getRouteConsts(routeConsts.user.index),
      title: 'User',
      type: 'item',
      icon: icons.IconUser,
      url: `${routeConsts.user.index}${routeConsts.user.children.manageUser}`
      // children: [
      //   {
      //     id: getRouteConsts(routeConsts.user.children.createUser),
      //     title: 'Create User',
      //     type: 'item',
      //     url: `${routeConsts.user.index}${routeConsts.user.children.createUser}`
      //     // target: true
      //   },
      //   {
      //     id: getRouteConsts(routeConsts.user.children.manageUser),
      //     title: 'Manage User',
      //     type: 'item',
      //     url: `${routeConsts.user.index}${routeConsts.user.children.manageUser}`
      //     // target: true
      //   }
      // ]
    }
  ]
};

export default user;
