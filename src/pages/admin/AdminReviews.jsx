import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
        .from('reviews')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching reviews", description: error.message, variant: "destructive" });
    } else {
       // Flatten product name
       const formatted = data.map(r => ({ ...r, product: r.products?.name }));
       setReviews(formatted);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) {
          toast({ title: "Error deleting review", description: error.message, variant: "destructive" });
      } else {
          toast({ title: "Review deleted" });
          fetchReviews();
      }
  };

  const toggleVerify = async (review) => {
      const { error } = await supabase
        .from('reviews')
        .update({ verified: !review.verified })
        .eq('id', review.id);

      if (error) {
          toast({ title: "Error updating status", description: error.message, variant: "destructive" });
      } else {
          fetchReviews();
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
            <h1 className="text-2xl font-bold">Manage Reviews</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
             <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
        ) : (
            <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start justify-between mb-4">
                    <div>
                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                        />
                        ))}
                    </div>
                    <p className="font-semibold mb-1">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.product || "Unknown Product"}</p>
                    </div>
                    <div className="flex gap-2">
                    <Button onClick={() => toggleVerify(review)} size="sm" variant={review.verified ? "default" : "outline"}>
                        {review.verified ? 'Verified' : 'Verify'}
                    </Button>
                    <Button onClick={() => handleDelete(review.id)} size="sm" variant="outline" className="text-red-600">Delete</Button>
                    </div>
                </div>
                <p className="text-gray-700 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;