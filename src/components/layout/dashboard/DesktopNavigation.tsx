import { useRouter } from 'next/navigation';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineChevronRight } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Navigation from '@/components/layout/dashboard/Navigation';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/logo';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

export default function DesktopNavigation() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const logout = useAuthStore.useLogout();
  const user = useAuthStore.useUser();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <div
      className={clsxm(
        [
          'z-10 hidden bg-surface-base shadow-lg lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:pb-4 lg:pt-[54px]',
        ],
        sidebarOpen ? 'lg:w-72' : 'lg:w-24'
      )}
    >
      <div className='relative mt-8 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center'>
          <UnstyledLink
            href='/'
            className='flex flex-row items-center gap-2 md:gap-4'
          >
            <Logo className='object-contain' />
            {sidebarOpen && (
              <Typography
                variant='h2'
                className='ml-2.5 font-bold text-black'
                font='poppins'
              >
                Ruang Online 2023
              </Typography>
            )}
          </UnstyledLink>
        </div>
        <section className='flex-start mt-8 flex items-center gap-4 rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:mx-20 md:px-6 md:py-3'>
          <NextImage
            src='/images/avatar.png'
            width={40}
            height={40}
            alt='profile'
            className='hidden lg:block'
          />
          {sidebarOpen && (
            <div className='text-black'>
              <Typography className='font-bold text-black'>
                {user ? user.name : 'Not logged in'}
              </Typography>
              <Typography variant='c2' className='text-black md:leading-tight'>
                {user ? user.email : 'testing@gmail.com'}
              </Typography>
              <ButtonLink
                href='/dashboard/change-password'
                variant='secondary'
                size='sm'
                className='mt-2'
              >
                <Typography variant='c2'>Change Password</Typography>
              </ButtonLink>
            </div>
          )}
        </section>
      </div>
      {/* Sidebar component */}
      <div className='mt-8 flex h-0 flex-1 flex-col overflow-y-auto'>
        {/* Navigation */}
        <Navigation className='text-black' sidebarOpen={sidebarOpen} />
      </div>
      <div className='mb-16 px-1'>
        <Button variant='ghost' className='w-full ' onClick={handleLogout}>
          <Typography variant='b3' className='flex items-center text-red-500'>
            <BiLogOut className='mr-2 inline-block' size={16} />
            Logout
          </Typography>
        </Button>
      </div>
      <div
        className={clsxm(
          [
            'bg-transparentt z-[-1] hidden animate-pulse rounded-lg pl-20 lg:absolute lg:mt-[49vh] lg:block',
          ],
          sidebarOpen && ['lg:pl-72']
        )}
      >
        <MdOutlineChevronRight
          className={clsxm(
            [' h-8 w-8 cursor-pointer text-red-500'],
            sidebarOpen && ['rotate-180 transform delay-100 ease-in-out'],
            !sidebarOpen && ['translate-x-2 delay-100 ease-in-out']
          )}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
}
