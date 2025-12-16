import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const BlogPostPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Blog Post - thebagvoid</title>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Button onClick={() => navigate('/blog')}>
              Back to Blog
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;