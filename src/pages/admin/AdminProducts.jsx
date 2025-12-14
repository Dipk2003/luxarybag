import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) {
      toast({ title: "Error fetching products", description: error.message, variant: "destructive" });
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const productData = { ...currentProduct };
    // Ensure numeric types
    productData.price = parseFloat(productData.price);
    productData.original_price = parseFloat(productData.original_price);
    productData.discount = parseInt(productData.discount);
    
    // Simple mock image array handling for demo if not set
    if (!productData.images || productData.images.length === 0) {
        productData.images = ['https://images.unsplash.com/photo-1590739209058-1a3661361a6e']; 
    }

    let error;
    if (isEditing) {
      const { error: updateError } = await supabase
        .from('products')
        .update(productData)
        .eq('id', currentProduct.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('products')
        .insert([productData]);
      error = insertError;
    }

    if (error) {
      toast({ title: "Error saving product", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Product updated" : "Product created" });
      setShowForm(false);
      fetchProducts();
    }
  };

  const openEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };

  const openCreate = () => {
    setCurrentProduct({
       name: '',
       slug: '',
       price: 0,
       original_price: 0,
       discount: 0,
       category: 'shoulder-bags',
       description: '',
       in_stock: true,
       featured: false
    });
    setIsEditing(false);
    setShowForm(true);
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
              <h1 className="text-2xl font-bold">Manage Products</h1>
            </div>
            <Button onClick={openCreate} className="bg-yellow-600 hover:bg-yellow-700">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isEditing ? 'Edit Product' : 'New Product'}</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="w-4 h-4" /></Button>
                </div>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input required className="w-full p-2 border rounded" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input required className="w-full p-2 border rounded" value={currentProduct.slug} onChange={e => setCurrentProduct({...currentProduct, slug: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input type="number" required className="w-full p-2 border rounded" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Original Price</label>
                        <input type="number" className="w-full p-2 border rounded" value={currentProduct.original_price} onChange={e => setCurrentProduct({...currentProduct, original_price: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="w-full p-2 border rounded" value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}>
                            <option value="shoulder-bags">Shoulder Bags</option>
                            <option value="tote-bags">Tote Bags</option>
                            <option value="crossbody-bags">Crossbody Bags</option>
                            <option value="clutches">Clutches</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount %</label>
                        <input type="number" className="w-full p-2 border rounded" value={currentProduct.discount} onChange={e => setCurrentProduct({...currentProduct, discount: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full p-2 border rounded" rows="3" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={currentProduct.in_stock} onChange={e => setCurrentProduct({...currentProduct, in_stock: e.target.checked})} />
                            In Stock
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={currentProduct.featured} onChange={e => setCurrentProduct({...currentProduct, featured: e.target.checked})} />
                            Featured
                        </label>
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700 w-full">Save Product</Button>
                    </div>
                </form>
            </div>
        )}

        {loading ? (
             <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button onClick={() => openEdit(product)} size="sm" variant="outline">Edit</Button>
                        <Button onClick={() => handleDelete(product.id)} size="sm" variant="outline" className="text-red-600">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;