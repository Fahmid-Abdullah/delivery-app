"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';

function NavBar() {
  const { user } = useUser();

  return (
    <div className='flex justify-between px-4 py-1'>
      <div>
        <a href="/"><Image src='/logo.png' alt='logo' width={120} height={60} /></a>
      </div>
      <div className='flex mt-2 gap-10'>
        {user && <a href="/dashboard"><h2>Dashboard</h2></a>}
      </div>
      <UserButton className='' afterSignOutUrl='/'/>
    </div>
  );
}

export default NavBar;
