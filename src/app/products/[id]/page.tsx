'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Minus, 
  Plus,
  ChevronRight,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { PRODUCTS, REVIEWS } from '@/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id === id);

  const [mainImage, setMainImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setIsLoaded(true);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => router.push('/products')} className="mt-4">Back to Products</Button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} ${product.title} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <button onClick={() => router.push('/')} className="hover:text-primary">Home</button>
        <ChevronRight className="w-4 h-4" />
        <button onClick={() => router.push('/products')} className="hover:text-primary">Products</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted border border-border/50"
          >
            <Image 
              src={mainImage} 
              alt={product.title}
              fill
              className="object-cover transition-all duration-700"
            />
            {product.discountPrice && (
              <Badge variant="destructive" className="absolute top-6 left-6 px-4 py-1 text-sm font-bold uppercase rounded-full">
                Save ${Math.round(product.price - product.discountPrice)}
              </Badge>
            )}
          </motion.div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                  mainImage === img ? 'border-primary shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${product.title} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between gap-4">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={isFavorite ? "destructive" : "outline"} 
                  size="icon" 
                  className="rounded-full h-10 w-10 transition-all"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star className="w-5 h-5 fill-current" />
                <span>{product.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <button className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
                {product.reviewCount} customer reviews
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-extrabold text-primary">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-muted-foreground line-through decoration-muted-foreground/40">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-4xl font-extrabold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed pt-4">
              {product.description}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Configuration */}
          <div className="space-y-8 flex-grow">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-2xl p-1 bg-muted/40">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-10 w-10"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.stock} items in stock
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 rounded-2xl h-14 text-lg font-bold shadow-xl shadow-primary/20" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 rounded-2xl h-14 text-lg font-bold">
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-bold">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <RotateCcw className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-bold">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Hassle-free exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="mt-20">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-14 p-0 gap-8">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-bold text-lg">Description</TabsTrigger>
            <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-bold text-lg">Details</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-bold text-lg">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-10">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">Elevate your experience</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Take your productivity and leisure to the next level with the {product.title}. 
                Expertly crafted using premium materials and cutting-edge technology, this product 
                is designed to exceed expectations and fit seamlessly into your modern lifestyle.
              </p>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Premium materials for durability</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Sleek, modern design aesthetic</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Multi-functional performance</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="details" className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 {Object.entries(product.details).map(([key, value]) => (
                   <div key={key} className="flex justify-between border-b pb-2">
                     <span className="font-semibold capitalize text-muted-foreground">{key}:</span>
                     <span className="font-medium">{String(value)}</span>
                   </div>
                 ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-10">
             <div className="space-y-8">
                {REVIEWS.filter(r => r.productId === product.id).map((review) => (
                  <div key={review.id} className="space-y-2 border-b pb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {review.userName[0]}
                        </div>
                        <div>
                          <p className="font-bold">{review.userName}</p>
                          <div className="flex items-center gap-1 text-yellow-500">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : ""}`} />
                             ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground pl-12">{review.comment}</p>
                  </div>
                ))}
             </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold font-outfit mb-10">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
