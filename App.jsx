import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import ShoppingCart from '@/components/ShoppingCart';
import AuthModal from '@/components/AuthModal';
import ComputerAnimation from '@/components/ComputerAnimation';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const productsHook = useProducts();
  const cartHook = useCart();
  const authHook = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>TechStore Pro - Computadoras de Alta Gama</title>
        <meta name="description" content="Descubre las mejores computadoras gaming, workstations y laptops. Precios increíbles y tecnología de vanguardia." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
        <ComputerAnimation />
        <Header 
          onCartClick={() => cartHook.setIsCartOpen(true)}
          onFilterClick={() => setIsFilterOpen(true)}
          totalCartItems={cartHook.getTotalItems()}
          user={authHook.user}
          onAuthClick={() => authHook.setIsAuthModalOpen(true)}
          onLogout={authHook.logout}
        />
        
        <FilterSidebar 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          {...productsHook}
        />
        
        <ShoppingCart {...cartHook} />

        <AuthModal {...authHook} />

        <main className="container mx-auto px-4 py-8 relative z-10">
          <Hero onSearch={productsHook.setSearchTerm} />
          <ProductGrid 
            products={productsHook.products}
            addToCart={cartHook.addToCart}
            addingToCartId={cartHook.addingToCartId}
            setSortBy={productsHook.setSortBy}
            sortBy={productsHook.sortBy}
          />
        </main>

        <Toaster />
      </div>
    </>
  );
}

export default App;