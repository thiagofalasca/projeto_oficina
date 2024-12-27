import AppLogo from '@/components/AppLogo';
import MobileNav from '@/components/root/MobileNav';
import SideNav from '@/components/root/SideNav';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full font-inter">
      <SideNav />
      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between border-b bg-gray-50 p-5 md:hidden">
          <AppLogo type="mobile" />
          <MobileNav />
        </div>
        <div className="h-screen w-full overflow-y-scroll p-8">{children}</div>
      </div>
    </main>
  );
}
