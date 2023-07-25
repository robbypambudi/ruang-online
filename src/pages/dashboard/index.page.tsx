import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { generateToastQuery } from '@/lib/toast';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default withAuth(DashboardPage, 'USER', true);

function DashboardPage() {
  return (
    <DashboardLayout>
      <Seo templateTitle='Dashboard' />
      <div>
        <header className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <IconLink
              href='/dashboard'
              icon={FiArrowLeft}
              iconClassName='text-gray-500'
            />
            <div className='flex flex-col'>
              <Breadcrumb crumbs={['/dashboard']} />
              <Typography variant='h2' className='font-bold'>
                Welcome Back
              </Typography>
            </div>
          </div>
        </header>

        <div className='mt-4 flex min-h-[calc(100vh-210px)] flex-col items-center justify-center gap-x-4 md:flex-row'>
          <div className='mt-5 flex min-h-[380px] max-w-[500px] flex-col items-center justify-center gap-3 rounded-md bg-white p-4 px-8 py-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] transition-all duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <NextImage
              src='/images/dashboard/geolympic.png'
              alt='geolympic logo'
              width={121}
              height={121}
              className='w-16'
            />
            <Typography variant='h2' className='font-bold'>
              Geolympic 2023
            </Typography>
            <Typography className='mt-2'>
              GEOLYMPIC (Geomatics Science and Exploration Olympiad) is an
              academic olympiad in the field of basic application of geomatics
              science held by HIMAGE-ITS.
            </Typography>
            <ButtonLink
              href='/dashboard/geolympic'
              className='mt-4 border border-purple-500 text-purple-500 transition-all duration-300 ease-in-out hover:bg-purple-500 hover:text-white'
              variant='outline'
            >
              Register Now
            </ButtonLink>
          </div>
          <div className='mt-5 flex min-h-[380px] max-w-[500px] flex-col items-center justify-center gap-3 rounded-md bg-white p-4 px-8 py-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] transition-all duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <NextImage
              src='/images/dashboard/geopost.png'
              alt='geopost logo'
              width={121}
              height={121}
              className='w-16'
            />
            <Typography variant='h6' className='font-bold'>
              Geopost 2023
            </Typography>
            <Typography className='mt-2'>
              The Geocentric poster competition, namely the Geocentric Digital
              Poster Competition, is a digital poster competition for the
              general public in Indonesia. This competition aims to channel
              skills and creativity for the community and students as outlined
              in the form of digital posters
            </Typography>
            <ButtonLink
              href={generateToastQuery({
                message: 'Coming Soon!',
                type: 'success',
                url: '/dashboard',
              })}
              className='mt-4 border border-purple-500 text-purple-500 transition-all duration-300 ease-in-out hover:bg-purple-500 hover:text-white'
              variant='outline'
            >
              Register Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
