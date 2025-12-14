import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  Star, 
  FileText, 
  Settings, 
  Instagram,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useMode } from '@/contexts/ModeContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { mode, toggleMode } = useMode();
  const { logout } = useAdminAuth();
  const stats = [
    { label: 'Total Products', value: '8', icon: Package },
    { label: 'Total Leads', value: '0', icon: Users },
    { label: 'Reviews', value: '5', icon: Star },
    { label: 'Blog Posts', value: '0', icon: FileText },
  ];

  const menuItems = [
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Leads', href: '/admin/leads', icon: Users },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Instagram', href: '/admin/instagram', icon: Instagram },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Mode:</span>
                <button
                  onClick={() => toggleMode(mode === 'STARTER' ? 'GROWTH' : 'STARTER')}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                    mode === 'GROWTH' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}
                >
                  {mode === 'GROWTH' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  {mode}
                </button>
              </div>
              <Button onClick={logout} variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <item.icon className="w-6 h-6 text-yellow-600" />
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;