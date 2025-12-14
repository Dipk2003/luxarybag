import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMode } from '@/contexts/ModeContext';
import { toast } from '@/components/ui/use-toast';

const AdminSettings = () => {
  const { mode, toggleMode } = useMode();

  const handleSave = () => {
    toast({
      title: "Settings saved successfully!",
      description: "Your changes have been applied."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">Store Mode</h2>
          <div className="space-y-4">
            <div 
              onClick={() => toggleMode('STARTER')}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                mode === 'STARTER' ? 'border-yellow-600 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">STARTER Mode</span>
                {mode === 'STARTER' && (
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Active</span>
                )}
              </div>
              <p className="text-gray-600">
                WhatsApp-first catalog. Display products with WhatsApp inquiry button. Perfect for starting out.
              </p>
            </div>

            <div 
              onClick={() => toggleMode('GROWTH')}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                mode === 'GROWTH' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">GROWTH Mode</span>
                {mode === 'GROWTH' && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Active</span>
                )}
              </div>
              <p className="text-gray-600">
                Full ecommerce with shopping cart, checkout, and payment processing. Scale your business.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Store Name</label>
              <input
                type="text"
                defaultValue="LuxeBag"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                defaultValue="info@luxebag.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
              />
            </div>
            <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;