'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ['/admin/login', '/admin/setup'];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && !publicPaths.includes(pathname)) {
        router.replace('/admin/login');
      } else {
        setChecking(false);
      }
    });
    return () => unsub();
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
