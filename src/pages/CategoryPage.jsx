import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBar from '@/components/TrustBar';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const normalize = (v) => (v || '').toLowerCase().trim();

const isValidHttpUrl = (value) => {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

// Party/Bridal pages = collections (bags mapped)
const COLLECTION_MAP = {
  party: ['clutches', 'shoulder-bags', 'crossbody-bags'],
  'party-wear': ['clutches', 'shoulder-bags', 'crossbody-bags'],
  bridal: ['clutches', 'shoulder-bags'],
  'bridal-wear': ['clutches', 'shoulder-bags'],
};

const ALIAS_CATEGORY_NAME = {
  party: 'Party Wear',
  'party-wear': 'Party Wear',
  bridal: 'Bridal Collection',
  'bridal-wear': 'Bridal Collection',
};

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const pageSlug = normalize(slug);

  const { products, categories, faqs, loading } = useSupabaseData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
      </div>
    );
  }

  const category =
    categories.find((c) => normalize(c.slug) === pageSlug) ||
    categories.find((c) => normalize(c.slug) === normalize(pageSlug.replace('-wear', ''))) ||
    categories.find((c) => normalize(c.slug) === normalize(`${pageSlug}-wear`));

  const categoryProducts =
    pageSlug === 'all'
      ? products
      : products.filter((p) => {
          const pc = normalize(p.category);
          const mapped = COLLECTION_MAP[pageSlug];

          if (mapped && mapped.length) return mapped.includes(pc) || pc === pageSlug;
          return pc === pageSlug;
        });

  const displayName = category?.name || ALIAS_CATEGORY_NAME[pageSlug] || 'All Bags';

  return (
    <>
      <Helmet>
        <title>{displayName} - Premium Luxury Collection | thebagvoid</title>
        <meta
          name="description"
          content={`Browse our ${displayName} collection of premium products. Free delivery, COD available, easy returns.`}
        />
      </Helmet>

      <div className="min-h-screen pb-20 md:pb-0">
        <TrustBar />
        <Header />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{displayName}</h1>
          <p className="text-gray-600 mb-8">Discover {categoryProducts.length} premium products</p>

          {categoryProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Products for this category will appear here once added.
              </p>
              <Link
                to="/category/all"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product, index) => {
                const firstImg = product?.images?.[0];
                const imgSrc = isValidHttpUrl(firstImg)
                  ? firstImg
                  : 'https://images.unsplash.com/photo-1635865165118-917ed9e20936?auto=format&fit=crop&w=800&q=80';

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/product/${product.slug}`} className="group block">
                      <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100 relative">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={product.name}
                          src={imgSrc}
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.slice(0, 4).map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
