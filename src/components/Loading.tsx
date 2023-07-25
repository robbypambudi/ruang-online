import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <CgSpinner className='animate-spin text-4xl' />
      <h1 className='font-mono text-[2rem] font-bold leading-none'>
        Loading
        <span className='animate-pulse'>...</span>
      </h1>
    </div>
  );
}
