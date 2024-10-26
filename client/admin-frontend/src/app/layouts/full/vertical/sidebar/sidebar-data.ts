import { NavItem } from './nav-item/nav-item';

// Define navigation items for each role
const adminNavItems: NavItem[] = [
  { navCap: 'Trang chủ' },
  {
    displayName: 'Thống kê',
    iconName: 'aperture',
    route: 'dashboards/dashboard1',
  },
  {
    displayName: 'Cửa hàng',
    iconName: 'shopping-cart',
    route: '/store/management',
  },
  { displayName: 'Đơn hàng', iconName: 'file-invoice', route: 'apps/invoice' },
  { displayName: 'Tin nhắn', iconName: 'message-2', route: 'apps/chat' },
  { displayName: 'Quản lý giao hàng', iconName: 'truck', route: 'apps/todo' },
];

const sellerNavItems: NavItem[] = [
  { navCap: 'Trang chủ' },
  {
    displayName: 'Thống kê',
    iconName: 'aperture',
    route: 'dashboards/dashboard1',
  },
  {
    displayName: 'Cửa hàng',
    iconName: 'shopping-cart',
    route: '/store/management',
  },
  { displayName: 'Tin nhắn', iconName: 'message-2', route: 'apps/chat' },
];

const deliverNavItems: NavItem[] = [
  { navCap: 'Trang chủ' },
  { displayName: 'Quản lý giao hàng', iconName: 'truck', route: 'apps/todo' },

  { displayName: 'Đơn hàng', iconName: 'file-invoice', route: 'apps/invoice' },
];

// Function to get navigation items based on role
export function getNavItemsByRole(role: string): NavItem[] {
  switch (role) {
    case 'admin':
      return adminNavItems;
    case 'seller':
      return sellerNavItems;
    case 'deliver':
      return deliverNavItems;
    default:
      return [];
  }
}

// Example usage: Assume you have a service to get the current user's role
// const userRole = userService.getCurrentUserRole();
// export const navItems = getNavItemsByRole(userRole);
