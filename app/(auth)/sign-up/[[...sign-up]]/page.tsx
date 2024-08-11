import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <SignUp forceRedirectUrl='/' />
    </main>
  );
};

export default SignUpPage;
