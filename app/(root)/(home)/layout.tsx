import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'WeMeet | The Best Video Conferencing WebApp',
  description: 'WeMeet is the best video conferencing web for remote teams',
  icons: {
    icon: '/icons/logo1.png',
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pd-14 sm:px-14'>
          <div className='w-full '>{children}</div>
        </section>
      </div>
      <Analytics />
    </main>
  );
};

export default HomeLayout;
