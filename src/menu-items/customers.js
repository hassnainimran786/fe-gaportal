// assets
import { IconUserCheck } from '@tabler/icons';
import { routeConsts } from 'constants/routeConsts';
import { getRouteConsts } from 'utils/get-route-conts';

// constant
const icons = {
  IconUserCheck
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const customers = {
  id: getRouteConsts(routeConsts.customer.index),
  title: 'Customer',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: getRouteConsts(routeConsts.customer.children.viewCustomer),
      title: 'Customers',
      type: 'item',
      url: `${routeConsts.customer.index}${routeConsts.customer.children.viewCustomer}`,
      icon: icons.IconUserCheck,
      breadcrumbs: true
      // target: true
    }
  ]
};

export default customers;
