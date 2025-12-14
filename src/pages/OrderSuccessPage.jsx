import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const OrderSuccessPage = () => {
  const { orderId } = useParams();

  const handleDownloadInvoice = () => {
    toast({
      title: "Downloading Invoice...",
      description: "Your invoice PDF is being generated."
    });
    // In a real app, this would trigger a backend PDF generation endpoint
  };

  const handleWhatsAppUpdate = () => {
    const message = encodeURIComponent(`Hi, I just placed order #${orderId}. Can you please confirm the shipping timeline?`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for shopping with LuxeBag. Your order <span className="font-bold text-black">#{orderId}</span> has been placed successfully.
          </p>

          <div className="space-y-3 mb-8">
            <Button onClick={handleDownloadInvoice} variant="outline" className="w-full border-dashed">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            
            <Button onClick={handleWhatsAppUpdate} className="w-full bg-green-500 hover:bg-green-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Updates on WhatsApp
            </Button>
          </div>

          <Link to="/">
            <Button variant="link" className="text-yellow-600">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccessPage;