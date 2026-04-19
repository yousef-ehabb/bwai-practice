'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, ShieldCheck, Headphones, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/mock';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-muted">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-30 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1 text-sm font-semibold mb-4">
                Seasonal Sale - Up to 50% Off
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-outfit">
                Elevate Your <span className="text-primary">Lifestyle</span> With Nova
              </h1>
              <p className="text-xl text-muted-foreground mt-4 leading-relaxed max-w-lg">
                Discover a curated collection of premium products designed for the modern individual. Quality meets aesthetic.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="rounded-full px-8"
                  render={
                    <Link href="/products">
                      Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8"
                  render={
                    <Link href="/products?category=Fashion">
                      View Lookbook
                    </Link>
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating element animation */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-1/4 hidden lg:block"
        >
          <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6 bg-muted/30 rounded-3xl border border-border/50">
          {[
            { icon: <Truck className="w-6 h-6 text-primary" />, title: 'Free Delivery', desc: 'Orders over $100' },
            { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: 'Secure Payment', desc: '100% Secure Transaction' },
            { icon: <Zap className="w-6 h-6 text-primary" />, title: 'Fast Shipping', desc: 'Within 24-48 hours' },
            { icon: <Headphones className="w-6 h-6 text-primary" />, title: '24/7 Support', desc: 'Expert assistance' },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-background rounded-2xl shadow-sm mb-1">{feature.icon}</div>
              <h3 className="font-bold text-sm uppercase tracking-wider">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-outfit">Top Categories</h2>
            <p className="text-muted-foreground">Find what you&apos;re looking for by browsing our collections.</p>
          </div>
          <Button 
            variant="link" 
            className="text-primary font-semibold"
            render={
              <Link href="/products">Explore all <ArrowRight className="ml-2 w-4 h-4" /></Link>
            }
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <motion.div
              key={category}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={`/products?category=${category}`} className="block space-y-4">
                <div className="aspect-[4/5] bg-muted rounded-3xl relative overflow-hidden flex items-center justify-center">
                  <span className="text-8xl font-black text-background/10 select-none group-hover:scale-125 transition-transform duration-500">
                    {category[0]}
                  </span>
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                </div>
                <h3 className="font-bold text-center group-hover:text-primary transition-colors">{category}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-outfit">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked selection of our top-rated items.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-primary py-16 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 group">
          <div className="absolute inset-0 z-0">
             <Image 
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop" 
              alt="Promo background"
              fill
              className="object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
          
          <div className="relative z-10 flex-1 space-y-6">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-md">Limited Edition</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-outfit leading-tight">
              Sound Innovation Like <br /> Never Before
            </h2>
            <p className="text-white/80 text-lg max-w-md">
              Upgrade your audio experience with the all-new Quantum Pro series. Pre-order now and get 20% off.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full px-8 shadow-xl">
              Pre-order Now
            </Button>
          </div>
          
          <div className="relative z-10 flex-1 flex justify-center">
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="relative w-72 h-72 md:w-96 md:h-96"
            >
               <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse" />
               <Image 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
                alt="Promo Product"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-outfit">New Arrivals</h2>
            <p className="text-muted-foreground">The latest trends and tech, fresh in stock.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
