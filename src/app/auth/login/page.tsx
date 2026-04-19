'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Mock login logic
    login(email, "Demo User");
    toast.success("Succesfully logged in!");
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-[2.5rem] border-border/50 shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-2 mb-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-3xl mx-auto mb-6 shadow-xl shadow-primary/20">
                N
              </div>
              <h1 className="text-3xl font-bold font-outfit">Welcome Back</h1>
              <p className="text-muted-foreground">Log in to your NovaStore account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
                  </div>
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

              <Button type="submit" className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20">
                Sign In
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
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
              Don&apos;t have an account? <Link href="/auth/register" className="text-primary font-bold hover:underline underline-offset-4">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
