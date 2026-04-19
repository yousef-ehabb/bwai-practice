'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!hasHydrated) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6"
        >
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </motion.div>
        <h1 className="text-3xl font-bold font-outfit mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          It looks like you have not added anything to your cart yet. Explore our curated collections to find something special.
        </p>
        <Button 
          className="rounded-full px-8" 
          size="lg"
          render={
            <Link href="/products">Continue Shopping</Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold font-outfit">Shopping Cart</h1>
          <Badge className="rounded-full px-4 py-1">
            {getTotalItems()} Items
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-3xl border border-border/50 overflow-hidden">
              <div className="p-6 space-y-8">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b last:border-0 last:pb-0"
                    >
                      <Link href={`/products/${item.id}`} className="relative w-32 h-32 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </Link>

                      <div className="flex-grow space-y-1 text-center sm:text-left w-full">
                        <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <div className="pt-2">
                           <span className="font-bold text-lg text-primary">${(item.discountPrice || item.price).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-center">
                        <div className="flex items-center border rounded-xl p-1 bg-muted/30">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <Button 
              variant="ghost" 
              className="rounded-xl"
              render={
                <Link href="/products">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              }
            />
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-[2rem] border-border/50 shadow-xl shadow-muted/50 overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-bold font-outfit">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span className="text-foreground font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-extrabold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20"
                  render={
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border ${className}`}>
      {children}
    </span>
  )
}
