'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.title} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!isFavorite) {
      toast.success(`${product.title} added to wishlist`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-blue-500 hover:bg-blue-600 border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
            New
          </Badge>
        )}
        {product.discountPrice && (
          <Badge variant="destructive" className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
            Sale -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-background/80 text-foreground/50 hover:text-red-500'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" className="rounded-full shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
        </div>

        <Link href={`/products/${product.id}`} className="block group/title">
          <h3 className="font-semibold text-base line-clamp-1 group-hover/title:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-primary">${product.discountPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full rounded-xl mt-2 group/btn relative overflow-hidden"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
