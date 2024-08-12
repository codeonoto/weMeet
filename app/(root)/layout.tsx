import StreamVideoProvider from '@/providers/StreamClientProvider';
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      <Analytics />
    </main>
  );
};

export default RootLayout;
