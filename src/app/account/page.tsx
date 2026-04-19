'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account/orders');
    } else {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <p className="text-muted-foreground animate-pulse">Redirecting to your account profile...</p>
    </div>
  );
}
