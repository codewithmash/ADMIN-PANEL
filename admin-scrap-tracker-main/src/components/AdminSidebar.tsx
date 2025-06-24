
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Handshake,
  Truck,
  BarChart4,
  Settings,
  LogOut,
  Recycle,
  Building,
  FileText,
  Inbox,
  FileSearch,
  Star,
  MapPin,
  ShoppingCart
} from 'lucide-react';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Partners', href: '/partners', icon: Handshake },
    { name: 'Admins', href: '/admins', icon: Users },
    { name: 'Zones', href: '/admin/zones', icon: MapPin },
    { name: 'stores', href: '/admin/stores', icon: Truck },
    // { name: 'Scrap Collection', href: '/collections', icon: Truck },
    { name: 'Scrap Types', href: '/scrap-types', icon: Recycle },
    { name: 'Scrap Buyers', href: '/scrap-buyers', icon: Users },
    { name: 'Society Campaigns', href: '/society-campaigns', icon: Building },
    { name: 'Bulk Orders', href: '/bulk-orders', icon: Truck },
    { name: 'Customer Orders', href: '/admin/customer-orders', icon: ShoppingCart },
    { name: 'Customer Enquiries', href: '/enquiries', icon: Inbox },
    { name: 'Ratings', href: '/ratings', icon: Star },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart4 },
    // { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-admin-primary text-white h-screen transition-all duration-300 border-r border-gray-700",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <Link to="/dashboard" className="text-xl font-bold whitespace-nowrap">
            Scrap Admin
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-gray-700"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-2 py-3 rounded-md transition-colors",
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-100 hover:bg-blue-800 hover:text-white",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        {!collapsed && (
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-2">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-gray-300">{user?.isAdmin ? 'Admin' : 'User'}</p>
            </div>
          </div>
        )}
        <Button 
          variant="ghost" 
          size={collapsed ? "icon" : "default"} 
          onClick={logout}
          className="w-full text-white hover:bg-blue-800 justify-start"
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
          {!collapsed && <span>Log out</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
