'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Globe, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock register logic
    login(email, name);
    toast.success("Account created successfully!");
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-[2.5rem] border-border/50 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-2 mb-10">
              <h1 className="text-4xl font-bold font-outfit uppercase tracking-tighter">Create Account</h1>
              <p className="text-muted-foreground italic">Join the NovaStore community today</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="pl-10 rounded-xl h-12 bg-muted/40 border-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="pl-10 rounded-xl h-12 bg-muted/40 border-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 rounded-xl h-12 bg-muted/40 border-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 py-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-xs text-muted-foreground leading-none cursor-pointer">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>

              <Button type="submit" className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or register with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="rounded-xl h-12">
                <Globe className="w-4 h-4 mr-2" /> Google
              </Button>
              <Button variant="outline" className="rounded-xl h-12">
                <Code className="w-4 h-4 mr-2" /> Github
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-10">
              Already have an account? <Link href="/auth/login" className="text-primary font-bold hover:underline underline-offset-4">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
