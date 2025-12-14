export const useMockData = () => {
  const products = [
    {
      id: 1,
      name: 'Classic Leather Tote',
      slug: 'classic-leather-tote',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      category: 'tote-bags',
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: 156,
      description: 'Timeless elegance meets functionality in this spacious leather tote. Perfect for work or weekend getaways.',
      imageDescription: 'Premium brown leather tote bag with gold hardware',
      images: [
        'Premium brown leather tote bag with gold hardware front view',
        'Premium brown leather tote bag interior compartments',
        'Premium brown leather tote bag side profile',
        'Premium brown leather tote bag worn by model'
      ]
    },
    {
      id: 2,
      name: 'Luxury Chain Shoulder Bag',
      slug: 'luxury-chain-shoulder-bag',
      price: 9999,
      originalPrice: 12999,
      discount: 23,
      category: 'shoulder-bags',
      inStock: true,
      featured: true,
      rating: 4.9,
      reviews: 203,
      description: 'Sophisticated shoulder bag with elegant chain strap. Crafted from premium materials for the discerning fashionista.',
      imageDescription: 'Black quilted leather shoulder bag with gold chain strap',
      images: [
        'Black quilted leather shoulder bag with gold chain strap',
        'Black quilted leather shoulder bag interior view',
        'Black quilted leather shoulder bag detail shot',
        'Black quilted leather shoulder bag lifestyle photo'
      ]
    },
    {
      id: 3,
      name: 'Minimalist Crossbody',
      slug: 'minimalist-crossbody',
      price: 7999,
      originalPrice: 9999,
      discount: 20,
      category: 'crossbody-bags',
      inStock: true,
      featured: false,
      rating: 4.7,
      reviews: 89,
      description: 'Clean lines and modern design define this versatile crossbody bag. Perfect for day-to-night transitions.',
      imageDescription: 'Beige minimalist crossbody bag with adjustable strap',
      images: [
        'Beige minimalist crossbody bag with adjustable strap',
        'Beige minimalist crossbody bag open compartment',
        'Beige minimalist crossbody bag side angle',
        'Beige minimalist crossbody bag on model'
      ]
    },
    {
      id: 4,
      name: 'Designer Evening Clutch',
      slug: 'designer-evening-clutch',
      price: 6999,
      originalPrice: 8999,
      discount: 22,
      category: 'clutches',
      inStock: true,
      featured: true,
      rating: 4.9,
      reviews: 127,
      description: 'Make a statement with this elegant evening clutch. Features exquisite detailing and premium craftsmanship.',
      imageDescription: 'Gold metallic evening clutch with crystal embellishments',
      images: [
        'Gold metallic evening clutch with crystal embellishments',
        'Gold metallic evening clutch interior satin lining',
        'Gold metallic evening clutch close up details',
        'Gold metallic evening clutch held by model'
      ]
    },
    {
      id: 5,
      name: 'Professional Work Bag',
      slug: 'professional-work-bag',
      price: 14999,
      originalPrice: 17999,
      discount: 17,
      category: 'tote-bags',
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: 174,
      description: 'Structured tote designed for the modern professional. Multiple compartments keep you organized all day.',
      imageDescription: 'Black structured leather work tote with laptop compartment',
      images: [
        'Black structured leather work tote with laptop compartment',
        'Black structured leather work tote interior organization',
        'Black structured leather work tote side view',
        'Black structured leather work tote professional setting'
      ]
    },
    {
      id: 6,
      name: 'Vintage Satchel',
      slug: 'vintage-satchel',
      price: 11999,
      originalPrice: 14999,
      discount: 20,
      category: 'shoulder-bags',
      inStock: true,
      featured: false,
      rating: 4.7,
      reviews: 98,
      description: 'Classic satchel with vintage-inspired details. Handcrafted from genuine leather for lasting beauty.',
      imageDescription: 'Brown vintage leather satchel with brass buckles',
      images: [
        'Brown vintage leather satchel with brass buckles',
        'Brown vintage leather satchel open flap interior',
        'Brown vintage leather satchel detail craftsmanship',
        'Brown vintage leather satchel casual outfit'
      ]
    },
    {
      id: 7,
      name: 'Chic Bucket Bag',
      slug: 'chic-bucket-bag',
      price: 8999,
      originalPrice: 10999,
      discount: 18,
      category: 'shoulder-bags',
      inStock: true,
      featured: true,
      rating: 4.6,
      reviews: 112,
      description: 'Contemporary bucket bag with drawstring closure. Spacious interior meets fashion-forward design.',
      imageDescription: 'Tan leather bucket bag with drawstring top',
      images: [
        'Tan leather bucket bag with drawstring top',
        'Tan leather bucket bag interior spacious',
        'Tan leather bucket bag worn crossbody',
        'Tan leather bucket bag street style'
      ]
    },
    {
      id: 8,
      name: 'Elegant Hobo Bag',
      slug: 'elegant-hobo-bag',
      price: 10999,
      originalPrice: 13999,
      discount: 21,
      category: 'shoulder-bags',
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: 145,
      description: 'Relaxed sophistication in a slouchy hobo silhouette. Soft leather construction for ultimate comfort.',
      imageDescription: 'Burgundy soft leather hobo bag with tassel detail',
      images: [
        'Burgundy soft leather hobo bag with tassel detail',
        'Burgundy soft leather hobo bag interior pockets',
        'Burgundy soft leather hobo bag shoulder strap',
        'Burgundy soft leather hobo bag lifestyle photo'
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      productId: 1,
      product: 'Classic Leather Tote',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely love this bag! The quality is exceptional and it holds all my daily essentials. Worth every penny!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      productId: 2,
      product: 'Luxury Chain Shoulder Bag',
      name: 'Anjali Verma',
      rating: 5,
      comment: 'This is my third purchase from LuxeBag. The craftsmanship is outstanding and delivery was super fast!',
      date: '2024-01-12',
      verified: true
    },
    {
      id: 3,
      productId: 3,
      product: 'Minimalist Crossbody',
      name: 'Sneha Patel',
      rating: 4,
      comment: 'Beautiful bag and great quality. The color is exactly as shown. Highly recommend!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 4,
      productId: 4,
      product: 'Designer Evening Clutch',
      name: 'Kavya Reddy',
      rating: 5,
      comment: 'Perfect for special occasions! Received so many compliments. The packaging was also premium.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: 5,
      productId: 5,
      product: 'Professional Work Bag',
      name: 'Meera Gupta',
      rating: 5,
      comment: 'Best work bag I\'ve ever owned. So many compartments and looks professional. Love it!',
      date: '2024-01-05',
      verified: true
    }
  ];

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
      question: 'Are your bags genuine leather?',
      answer: 'Yes, all our premium bags are crafted from 100% genuine leather with quality certification.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'We deliver within 3-5 business days across India. Express delivery is also available.'
    },
    {
      question: 'Do you have a physical store?',
      answer: 'We are currently online-only, which allows us to offer premium quality at competitive prices.'
    }
  ];

  const categories = [
    { name: 'All Bags', slug: 'all', count: 8 },
    { name: 'Shoulder Bags', slug: 'shoulder-bags', count: 4 },
    { name: 'Tote Bags', slug: 'tote-bags', count: 2 },
    { name: 'Crossbody Bags', slug: 'crossbody-bags', count: 1 },
    { name: 'Clutches', slug: 'clutches', count: 1 }
  ];

  return { products, reviews, faqs, categories };
};