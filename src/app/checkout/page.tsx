'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  ChevronRight, 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Step = 'shipping' | 'payment' | 'success';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useUserStore();

  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Button 
          className="mt-4"
          render={
            <Link href="/products">Back to Shopping</Link>
          }
        />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    // Mock order creation
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      date: new Date().toISOString(),
      status: 'Processing' as const,
      total,
      items: [...items],
      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`,
        street: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: 'USA',
      }
    };
    
    addOrder(newOrder);
    setCurrentStep('success');
    clearCart();
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className={`flex items-center gap-2 ${currentStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${currentStep === 'shipping' ? 'border-primary bg-primary/10' : 'border-muted'}`}>1</div>
        <span className="font-semibold hidden sm:inline">Shipping</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${currentStep === 'payment' ? 'border-primary bg-primary/10' : 'border-muted'}`}>2</div>
        <span className="font-semibold hidden sm:inline">Payment</span>
      </div>
       <ChevronRight className="w-4 h-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 ${currentStep === 'success' ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${currentStep === 'success' ? 'border-primary bg-primary/10' : 'border-muted'}`}>3</div>
        <span className="font-semibold hidden sm:inline">Complete</span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      {currentStep !== 'success' && <StepIndicator />}

      <AnimatePresence mode="wait">
        {currentStep === 'shipping' && (
          <motion.div 
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold font-outfit">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold font-outfit">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="sm:col-span-2 grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St, Suite 400" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" placeholder="10001" value={formData.zipCode} onChange={(e) => setFormData({...formData, zipCode: e.target.value})} />
                  </div>
                </div>
              </section>

              <div className="flex justify-between pt-6">
                 <Button 
                   variant="ghost"
                   render={
                     <Link href="/cart">Back to Cart</Link>
                   }
                 />
                 <Button size="lg" className="rounded-xl px-10" onClick={() => setCurrentStep('payment')}>
                   Continue to Payment <ArrowRight className="ml-2 w-4 h-4" />
                 </Button>
              </div>
            </div>

            <OrderSummary total={total} subtotal={subtotal} shipping={shipping} tax={tax} />
          </motion.div>
        )}

        {currentStep === 'payment' && (
          <motion.div 
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                <h2 className="text-2xl font-bold font-outfit">Payment Method</h2>
                <RadioGroup defaultValue="card" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <CreditCard className="mb-3 h-6 w-6" />
                    <span className="font-bold">Credit Card</span>
                  </Label>
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-2xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                    <div className="mb-3 h-6 w-6 flex items-center justify-center font-black italic text-primary">P</div>
                    <span className="font-bold">PayPal</span>
                  </Label>
                </RadioGroup>

                <div className="space-y-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between pt-6">
                 <Button variant="ghost" onClick={() => setCurrentStep('shipping')}>
                   <ArrowLeft className="mr-2 w-4 h-4" /> Back to Shipping
                 </Button>
                 <Button size="lg" className="rounded-xl px-10" onClick={handlePlaceOrder}>
                   Complete Purchase <ShieldCheck className="ml-2 w-4 h-4" />
                 </Button>
              </div>
            </div>

            <OrderSummary total={total} subtotal={subtotal} shipping={shipping} tax={tax} />
          </motion.div>
        )}

        {currentStep === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg max-w-md mb-10">
              Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="rounded-xl"
                render={
                  <Link href="/account/orders">View My Orders</Link>
                }
              />
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-xl"
                render={
                  <Link href="/products">Continue Shopping</Link>
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderSummary({ subtotal, total, shipping, tax }: any) {
  return (
    <aside className="space-y-6">
      <Card className="rounded-3xl border-border/50 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <h3 className="text-xl font-bold font-outfit">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-extrabold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
        <p>Your payment information is encrypted and securely processed. No data is stored on our servers.</p>
      </div>
    </aside>
  );
}
