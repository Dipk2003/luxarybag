import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', slug: '', content: '', meta_description: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
      e.preventDefault();
      const { error } = await supabase.from('blog_posts').insert([newPost]);
      if (error) {
          toast({ title: "Error creating post", description: error.message, variant: "destructive" });
      } else {
          toast({ title: "Blog post created" });
          setShowForm(false);
          setNewPost({ title: '', slug: '', content: '', meta_description: '' });
          fetchPosts();
      }
  };

  const handleDelete = async (id) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
       if (error) {
          toast({ title: "Error deleting post", description: error.message, variant: "destructive" });
      } else {
          toast({ title: "Post deleted" });
          fetchPosts();
      }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Blog Management</h1>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-yellow-600 hover:bg-yellow-700">
              <Plus className="w-4 h-4 mr-2" /> Create Post
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">New Blog Post</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="w-4 h-4" /></Button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input className="w-full p-2 border rounded" required value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input className="w-full p-2 border rounded" required value={newPost.slug} onChange={e => setNewPost({...newPost, slug: e.target.value})} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Meta Description</label>
                        <textarea className="w-full p-2 border rounded" required value={newPost.meta_description} onChange={e => setNewPost({...newPost, meta_description: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <textarea className="w-full p-2 border rounded" rows="6" required value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
                    </div>
                    <Button type="submit">Publish Post</Button>
                </form>
            </div>
        )}

        {loading ? (
             <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 mb-4">No blog posts yet</p>
          </div>
        ) : (
             <div className="space-y-4">
                 {posts.map(post => (
                     <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                         <div>
                             <h3 className="font-bold text-lg">{post.title}</h3>
                             <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                         </div>
                         <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                     </div>
                 ))}
             </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;