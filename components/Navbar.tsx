import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full px-6 py-4 lg:px-10 '>
      <Link
        href='/'
        className='flex items-center gap-1'>
        <Image
          src='/icons/logo1.png'
          alt='weMeet logo'
          width={32}
          height={32}
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
          weMeet
        </p>
      </Link>

      <div className='flex-between gap-5'>
        {/* Clerk - User Management */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
