import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useSupabaseData = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [instagramSettings, setInstagramSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false });
        
        if (productsError) throw productsError;
        
        // Fetch Reviews with Product names
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*, products(name)')
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;

        // Fetch Blog Posts
        const { data: blogData, error: blogError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (blogError) throw blogError;

        // Fetch Settings
        const { data: settingsData } = await supabase
          .from('instagram_settings')
          .select('*')
          .single();

        setProducts(productsData || []);
        
        // Transform reviews
        const formattedReviews = (reviewsData || []).map(review => ({
          ...review,
          product: review.products?.name || 'Unknown Product',
          date: new Date(review.created_at).toLocaleDateString()
        }));
        
        setReviews(formattedReviews);
        setBlogPosts(blogData || []);
        setInstagramSettings(settingsData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const faqs = [
    {
      question: 'Do you offer free delivery?',
      answer: 'Yes! We offer free delivery across all of India for all orders.'
    },
    {
      question: 'Is Cash on Delivery available?',
      answer: 'Absolutely! COD is available on all orders. Pay when you receive your product.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer easy 7-day returns. If you\'re not satisfied, simply return the product for a full refund.'
    },
    {
      question: 'How do Custom Bags work?',
      answer: 'Select your preferred color and enter the name/text you want embroidered on the product page. We will create it just for you!'
    }
  ];

  // Updated Categories Logic
  const categories = [
    { name: 'All Bags', slug: 'all', count: products.length },
    { name: 'Custom Bags', slug: 'custom-bags', count: products.filter(p => p.category === 'Custom Bags').length },
    { name: 'Bridal', slug: 'bridal', count: products.filter(p => p.category === 'Bridal').length },
    { name: 'Party', slug: 'party', count: products.filter(p => p.category === 'Party').length },
    { name: 'Wedding', slug: 'wedding', count: products.filter(p => p.category === 'Wedding').length }
  ];

  return { products, reviews, blogPosts, faqs, categories, instagramSettings, loading, error };
};