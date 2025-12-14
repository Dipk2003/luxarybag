import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminInstagram = () => {
  const [settings, setSettings] = useState({ feed_url: '', trusted_badge_text: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('instagram_settings').select('*').single();
    if (!error && data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
      // Upsert logic for single row settings
      const { error } = await supabase
        .from('instagram_settings')
        .upsert([{ ...settings, id: 1 }]); // Force ID 1 for singleton

      if (error) {
           toast({ title: "Error saving settings", description: error.message, variant: "destructive" });
      } else {
           toast({ title: "Settings saved" });
      }
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
            <h1 className="text-2xl font-bold">Instagram Feed Settings</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
            {loading ? <Loader2 className="animate-spin" /> : (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4">Configuration</h2>
                    <div>
                        <label className="block text-sm font-medium mb-1">Feed URL / ID</label>
                        <input className="w-full p-2 border rounded" value={settings.feed_url || ''} onChange={e => setSettings({...settings, feed_url: e.target.value})} placeholder="Instagram User ID or API URL" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Trust Badge Text</label>
                        <input className="w-full p-2 border rounded" value={settings.trusted_badge_text || ''} onChange={e => setSettings({...settings, trusted_badge_text: e.target.value})} placeholder="e.g. Follow us @LuxeBag" />
                    </div>
                    <Button onClick={handleSave} className="bg-yellow-600 hover:bg-yellow-700">
                        Save Settings
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminInstagram;