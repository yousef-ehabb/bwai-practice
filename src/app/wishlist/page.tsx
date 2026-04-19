'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6"
        >
          <Heart className="w-10 h-10 text-muted-foreground" />
        </motion.div>
        <h1 className="text-3xl font-bold font-outfit mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          Save items you love here and they'll be waiting for you when you're ready to buy.
        </p>
        <Button 
          className="rounded-full px-8" 
          size="lg"
          render={
            <Link href="/products">Explore Collections</Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold font-outfit">My Wishlist</h1>
          <p className="text-muted-foreground">{items.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center">
          <Button 
            variant="ghost"
            render={
              <Link href="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}
