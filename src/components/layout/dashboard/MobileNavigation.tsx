import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { HiOutlineChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Navigation from '@/components/layout/dashboard/Navigation';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

export default function MobileNavigation() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <>
      <div className='sticky top-0 z-10 flex h-20 flex-shrink-0 justify-between bg-black lg:hidden'>
        <button
          type='button'
          className='focus-visible:ring-primary-main absolute top-[50%] h-20 -translate-y-[50%] px-4 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset lg:hidden'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only '>Open sidebar</span>
          <HiOutlineMenu className='h-6 w-6 text-white' aria-hidden='true' />
        </button>
        <div className='flex flex-1 items-center justify-center'>
          <UnstyledLink href='/'>
            <NextImage
              src='/images/logo.png'
              width={42}
              height={42}
              alt='logo'
            />
          </UnstyledLink>
        </div>
      </div>

      {/* Navigation Dialog */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex bg-surface-base lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-surface-base bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex w-full max-w-full flex-1 flex-col pb-4 pt-5'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute right-0 top-0 mr-0 pt-8'>
                  <Button
                    className='hover:bg-transparent active:bg-transparent'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <HiOutlineChevronDoubleLeft className='text-xl text-black' />
                    <span className='sr-only'>Close sidebar</span>
                  </Button>
                </div>
              </Transition.Child>
              <div className='flex flex-shrink-0 items-center justify-center gap-2 px-4'>
                <section className='flex-start mt-16 flex w-full items-center gap-4 px-4 md:px-6'>
                  <NextImage
                    src='/images/avatar.png'
                    width={50}
                    height={50}
                    alt='profile'
                  />
                  <div className='text-black'>
                    <Typography variant='c1' className='font-bold text-black'>
                      {user?.name ?? 'Not Logged in'}
                    </Typography>
                    <Typography variant='c2' className='text-black'>
                      {user?.email ?? 'testing@gmail.com'}
                    </Typography>
                  </div>
                </section>
              </div>
              <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                <Navigation className='text-black' sidebarOpen={sidebarOpen} />
              </div>
              <div className='w-full'>
                <Button
                  className=' mx-auto flex justify-center '
                  onClick={handleLogout}
                  leftIcon={BiLogOut}
                  variant='ghost'
                >
                  <Typography>Log Out</Typography>
                </Button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
