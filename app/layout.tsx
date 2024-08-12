import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeMeet | The Best Video Conferencing WebApp',
  description: 'WeMeet is the best video conferencing web for remote teams',
  icons: {
    icon: '/icons/logo1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/logo1.png',
            socialButtonsVariant: 'iconButton',
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#0ca47c',
            colorBackground: '#1c1f2e',
            colorInputBackground: '#252a41',
            colorInputText: '#fff',
          },
        }}>
        <body
          className={`${inter.className} bg-dark-2
          `}
          style={{
            background: 'linear-gradient(to top left, #152331, #000000)',
          }}>
          {children}
          <Toaster />
        </body>
        <Analytics />
      </ClerkProvider>
    </html>
  );
}
