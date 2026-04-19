'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  ChevronRight, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function OrdersHistoryPage() {
  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Please log in to view your orders</h2>
        <Button asChild className="mt-4"><Link href="/auth/login">Login Now</Link></Button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle2 className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Shipped': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold font-outfit">Order History</h1>
            <p className="text-muted-foreground">Manage and track your recent orders.</p>
          </div>
          <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-2xl border border-border/50">
             <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
               {user.name[0]}
             </div>
             <div>
               <p className="font-bold">{user.name}</p>
               <p className="text-xs text-muted-foreground">{user.email}</p>
             </div>
          </div>
        </div>

        {user.orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/20 rounded-[2rem] border border-dashed border-border/50">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">No orders yet</h2>
            <p className="text-muted-foreground max-w-xs mt-2">Looking for something? Explore our premium collection and start shopping.</p>
            <Button asChild className="mt-8 rounded-xl px-10"><Link href="/products">Shop Now</Link></Button>
          </div>
        ) : (
          <div className="space-y-8">
            {user.orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-[2rem] border-border/50 overflow-hidden shadow-lg shadow-muted/20">
                  <CardHeader className="bg-muted/30 pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Order ID</p>
                          <p className="font-bold font-mono">{order.id}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Date Placed</p>
                          <p className="font-bold flex items-center gap-2">
                             <Calendar className="w-4 h-4 text-muted-foreground" />
                             {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Total Amount</p>
                          <p className="text-xl font-black text-primary">${order.total.toFixed(2)}</p>
                        </div>
                        <Badge className={`rounded-xl px-4 py-2 flex items-center gap-2 border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted">
                                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                  <p className="font-bold text-sm line-clamp-1">{item.title}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} • ${(item.discountPrice || item.price).toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Shipping To</h4>
                           <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 text-sm space-y-1">
                              <p className="font-bold">{order.shippingAddress.fullName}</p>
                              <p>{order.shippingAddress.street}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                              <p>{order.shippingAddress.country}</p>
                           </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="rounded-xl">Track Order</Button>
                           <Button variant="outline" size="sm" className="rounded-xl">Invoice</Button>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-xl font-bold group">
                           View Details <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
