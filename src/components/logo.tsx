import * as React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

type LogoProps = {
  className?: string;
  src?: string;
};

export default function Logo({ className, src }: LogoProps) {
  return (
    <NextImage
      src={src ? src : '/images/logo.png'}
      className={clsxm('w-44 md:w-[34px]', className)}
      width='340'
      height='340'
      layout='responsive'
      objectFit='contain'
      alt='logo'
      title='logo'
    />
  );
}
