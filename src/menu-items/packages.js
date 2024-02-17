// assets
import { IconPackage } from '@tabler/icons';
import { routeConsts } from 'constants/routeConsts';
import { getRouteConsts } from 'utils/get-route-conts';
// constant
const icons = {
  IconPackage
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const packages = {
  id: getRouteConsts(routeConsts.package.index),
  title: 'Package',
  caption: 'Package Caption',
  type: 'group',
  children: [
    {
      id: getRouteConsts(routeConsts.package.index),
      title: 'Packages',
      type: 'item',
      icon: icons.IconPackage,
      url: `${routeConsts.package.index}${routeConsts.package.children.packagesList}`
      // children: [
      //   {
      //     id: getRouteConsts(routeConsts.package.children.createPackage),
      //     title: 'Create Packages',
      //     type: 'item',
      //     url: `${routeConsts.package.index}${routeConsts.package.children.createPackage}`
      //     // target: true
      //   },
      //   {
      //     id: getRouteConsts(routeConsts.package.children.packagesList),
      //     title: 'Packages List',
      //     type: 'item',
      //     url: `${routeConsts.package.index}${routeConsts.package.children.packagesList}`
      //     // target: true
      //   }
      // ]
    }
  ]
};

export default packages;
