import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Star, Loader2, Instagram, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBar from '@/components/TrustBar';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const HomePage = () => {
  const { products, reviews, loading } = useSupabaseData();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const newArrivals = products.filter(p => p.is_new_arrival).slice(0, 4);
  const bestSellers = products.filter(p => p.is_best_seller).slice(0, 4);

  // Fallback if flags aren't set yet
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : products.slice(0, 4);
  const displayBestSellers = bestSellers.length > 0 ? bestSellers : products.slice(4, 8);

  const stats = [
    { label: "Followers", value: "8.9k+" },
    { label: "Happy Customers", value: "1200+" },
    { label: "5-Star Reviews", value: "500+" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-yellow-600 mx-auto mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Loading Luxury...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>LuxeBag by Raiya - Premium Bridal & Party Clutches</title>
        <meta name="description" content="Shop premium luxury bags, bridal clutches, and designer handbags. 8.9k+ followers on Instagram. Free delivery across India." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <TrustBar />
        <Header />

        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-center justify-center">
          <motion.div 
            style={{ y, opacity }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              className="w-full h-full object-cover"
              alt="Luxury bridal clutch collection"
              src="https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/2b67cd3e9474e7ff638b2e8894e8e145.jpg" 
            />
          </motion.div>
          
          <div className="relative z-20 container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-white"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block py-1 px-3 border border-white/30 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium mb-6"
              >
                ✨ New Bridal Collection 2025
              </motion.span>
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
              >
                Elegance in Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Detail</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-2xl mb-10 text-gray-100 font-light max-w-2xl mx-auto"
              >
                Handcrafted luxury clutches & potlis for the modern bride and bridesmaid.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/category/bridal">
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-yellow-900/20 hover:shadow-yellow-900/40 transition-all">
                    Shop Bridal
                  </Button>
                </Link>
                <Link to="/category/custom-bags">
                   <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                    Personalized Bags
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-20"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Social Proof Counters */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {stats.map((stat, index) => (
                <div key={index} className="text-center py-4 md:py-0">
                  <motion.h3 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                    className="text-4xl font-bold text-yellow-600 mb-1"
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals - Horizontal Scroll on Mobile */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-500 text-lg">Fresh styles just landed for you</p>
            </motion.div>
            <Link to="/shop" className="hidden md:flex items-center text-yellow-700 font-semibold hover:text-yellow-800 transition-colors group">
              View All <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayNewArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop">
               <Button variant="outline" className="w-full">View All Products</Button>
            </Link>
          </div>
        </section>

        {/* Categories Section with Hover Effects */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Shop by Category</h2>
                <div className="w-20 h-1 bg-yellow-600 mx-auto rounded-full" />
             </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Bridal Clutches', image: 'https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/3c64d413a60a7a499dc8fef249681406.jpg', link: '/category/bridal' },
                { name: 'Custom Bags', image: 'https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/75caa9e33ad2dbd72fdad0788414ca92.jpg', link: '/category/custom-bags' },
                { name: 'Crystal Bags', image: 'https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/24ae7b2fcdf8886464d0efdd117da35f.jpg', link: '/category/party' },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl"
                >
                  <Link to={category.link}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                      <h3 className="text-3xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{category.name}</h3>
                      <div className="flex items-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        <span className="font-medium mr-2">Explore Collection</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-24 container mx-auto px-4">
           <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-yellow-900 rounded-3xl p-8 md:p-16 text-center text-white mb-16 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Best Sellers of the Season</h2>
                <p className="text-yellow-100 text-lg max-w-2xl mx-auto mb-8">Curated favorites loved by our customers. These pieces are selling out fast!</p>
                <Link to="/shop">
                   <Button size="lg" className="bg-white text-yellow-900 hover:bg-yellow-50 font-bold px-10">Shop Best Sellers</Button>
                </Link>
              </div>
           </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {displayBestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* Trust & Reviews Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                >
                   <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose LuxeBag?</h2>
                   <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      We believe luxury should be accessible without compromising on quality. Every bag is a masterpiece, handcrafted with precision and checked for perfection.
                   </p>
                   
                   <div className="space-y-6">
                      {[
                        { icon: ShieldCheck, title: "100% Quality Assurance", desc: "Every piece goes through a rigorous 3-step quality check." },
                        { icon: Truck, title: "Free Express Shipping", desc: "We deliver across India for free, typically within 3-5 days." },
                        { icon: Award, title: "Artisan Craftsmanship", desc: "Handmade by skilled artisans using premium materials." }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-start"
                        >
                           <div className="bg-yellow-100 p-3 rounded-xl mr-4 text-yellow-700">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <div>
                              <h3 className="font-bold text-lg">{item.title}</h3>
                              <p className="text-gray-500">{item.desc}</p>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative"
                >
                   <div className="absolute -top-6 -right-6 bg-yellow-500 text-white p-4 rounded-xl shadow-lg transform rotate-6">
                      <Star className="w-8 h-8 fill-white" />
                   </div>
                   
                   <h3 className="text-2xl font-bold mb-6">Customer Love</h3>
                   <div className="h-[400px] overflow-y-auto pr-2 space-y-6 scrollbar-hide">
                      {reviews.slice(0, 5).map((review, i) => (
                         <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex text-yellow-400 mb-2">
                               {[...Array(5)].map((_, j) => (
                                 <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-yellow-400' : 'text-gray-200'}`} />
                               ))}
                            </div>
                            <p className="text-gray-700 italic mb-3">"{review.comment}"</p>
                            <div className="flex items-center">
                               <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-xs">
                                  {review.name.charAt(0)}
                               </div>
                               <div className="ml-3">
                                  <p className="text-sm font-bold">{review.name}</p>
                                  <p className="text-xs text-gray-400">{review.date}</p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                   <Link to="/reviews" className="block mt-6 text-center">
                      <Button variant="outline" className="w-full hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200">Read All Reviews</Button>
                   </Link>
                </motion.div>
             </div>
          </div>
        </section>

        {/* Instagram Feed */}
        <section className="py-20 container mx-auto px-4 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white mb-6">
                 <Instagram className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">@onli.nebags07</h2>
              <p className="text-gray-600 mb-10">Join our 8.9k+ followers on Instagram</p>
           </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {[
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/3c64d413a60a7a499dc8fef249681406.jpg",
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/2b67cd3e9474e7ff638b2e8894e8e145.jpg",
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/63de81d16d2bb72e954767add3b8488e.jpg",
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/24ae7b2fcdf8886464d0efdd117da35f.jpg",
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/9a6cb87842a6cd55327103a3031f6c7d.jpg",
              "https://horizons-cdn.hostinger.com/d435e4f2-61a6-4ee4-851f-b5e36caf4333/24d4fa3d7be4007fc823fa460010711f.jpg"
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="aspect-square overflow-hidden rounded-xl cursor-pointer relative group shadow-md hover:shadow-xl transition-all"
              >
                <img 
                  className="w-full h-full object-cover"
                  alt={`Instagram post ${index + 1}`}
                  src={img} 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <Instagram className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10">
             <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 rounded-full shadow-lg shadow-purple-200">
                   Follow on Instagram
                </Button>
             </a>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-gray-50">
           <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
              <div className="space-y-4">
                 {[
                    { q: "How long does delivery take?", a: "We offer free delivery across India which typically takes 3-5 business days. Express shipping options are also available." },
                    { q: "Is Cash on Delivery available?", a: "Yes! You can pay via Cash on Delivery (COD) for all orders with no extra charges." },
                    { q: "What is your return policy?", a: "We have a hassle-free 7-day return policy. If you don't love it, you can return it easily." },
                    { q: "Are the bags exactly as shown in photos?", a: "Absolutely. We take great pride in our photography to ensure it represents the product accurately. What you see is what you get." }
                 ].map((faq, i) => (
                    <AccordionItem key={i} question={faq.q} answer={faq.a} />
                 ))}
              </div>
           </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

const ProductCard = ({ product, index = 0 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5 }}
    className="group"
  >
    <Link to={`/product/${product.slug}`} className="block h-full">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          alt={product.name}
          src={product.images && product.images[0] ? product.images[0] : "https://via.placeholder.com/400"} 
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            -{product.discount}%
          </span>
        )}
        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
           <Button size="sm" className="w-full bg-white/90 text-black hover:bg-white backdrop-blur-sm shadow-lg font-semibold">
              View Details
           </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
             <div className="flex items-center gap-2">
                <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
                {product.original_price && (
                  <span className="text-sm text-gray-400 line-through">₹{product.original_price.toLocaleString()}</span>
                )}
             </div>
          </div>
          <div className="flex items-center text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
             <Star className="w-3 h-3 fill-yellow-600 mr-1" />
             {product.rating}
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AccordionItem = ({ question, answer }) => {
   const [isOpen, setIsOpen] = React.useState(false);
   
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
         >
            <span className="font-semibold text-lg">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
            </motion.div>
         </button>
         <motion.div 
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            className="overflow-hidden"
         >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
               {answer}
            </div>
         </motion.div>
      </div>
   );
};

export default HomePage;
