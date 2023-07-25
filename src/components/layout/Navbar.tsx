import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import { CgClose } from 'react-icons/cg';
import { HiChevronDown, HiOutlineMenuAlt3 } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { getToken } from '@/lib/cookies';

import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { events } from '@/constant/event';

export default function Navbar() {
  const token = getToken();
  const [isLogin, setIsLogin] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState('home');

  React.useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  const toggleShowNav = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 2040) {
        setActive('contact');
      } else {
        setActive('home');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='font-secondary sticky top-0 z-[100] w-full bg-[#24202D]'>
      <div className='layout flex h-14 flex-row items-center justify-between md:h-20'>
        {!isOpen && <div className='w-7 md:hidden'></div>}
        <UnstyledLink
          href='/'
          className='flex flex-row items-center gap-2 md:gap-4'
        >
          <NextImage src='/images/logo.png' alt='logo' width={42} height={42} />
        </UnstyledLink>

        {/* Desktop Navbar */}
        <nav className='hidden md:block'>
          <ul className='flex flex-row items-center justify-between gap-6 text-base'>
            <li>
              <UnstyledLink href='/' className='flex p-2.5'>
                <Typography
                  color='white'
                  className={clsxm(
                    ['hover:brightness-90'],
                    active === 'home' && 'font-bold'
                  )}
                >
                  Home
                </Typography>
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink href='#contact' className='flex p-2.5'>
                <Typography
                  color='white'
                  className={clsxm(
                    ['hover:brightness-90'],
                    active === 'contact' && 'font-bold'
                  )}
                >
                  Contact
                </Typography>
              </UnstyledLink>
            </li>
            <li>
              <Menu className='relative' as='div'>
                <Menu.Button className='p-2.5 outline-none'>
                  {({ open }) => (
                    <Typography
                      color='white'
                      className='flex flex-row items-center gap-2.5 hover:brightness-90'
                    >
                      Events
                      <HiChevronDown
                        className={clsxm(
                          'text-xl transition duration-200 ease-in-out',
                          open && 'rotate-180'
                        )}
                      />
                    </Typography>
                  )}
                </Menu.Button>

                <Transition
                  as={React.Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    className={clsxm(
                      'shadow-80 absolute mt-2 w-max origin-top rounded-xl bg-typo p-4',
                      'grid grid-cols-2 gap-x-5 gap-y-4',
                      'left-1/2 -translate-x-1/2 focus:outline-none'
                    )}
                  >
                    {events.map(({ name, href, color }) => (
                      <Menu.Item
                        key={name}
                        as='button'
                        className='flex space-y-3 rounded-md hover:bg-typo'
                      >
                        {({ active }) => (
                          <UnstyledLink
                            href={href}
                            className={clsxm(
                              'max-w-xs space-y-3 rounded-xl p-3 text-start',
                              active && 'bg-typo-secondary'
                            )}
                          >
                            <Typography variant='c1'>
                              <span className={color}>{name}</span>
                            </Typography>
                          </UnstyledLink>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            <div className='flex flex-row gap-4'>
              {!isLogin ? (
                <>
                  <ButtonLink
                    href='/login'
                    size='base'
                    className='bg-typo-white border-0'
                  >
                    <Typography color='white' className='text-center'>
                      Login/Signup
                    </Typography>
                  </ButtonLink>
                </>
              ) : (
                <ButtonLink
                  href='/dashboard'
                  size='base'
                  className='border-white bg-transparent text-white'
                >
                  Dashboard
                </ButtonLink>
              )}
            </div>
          </ul>
        </nav>

        {!isOpen && (
          <IconButton
            icon={HiOutlineMenuAlt3}
            className='md:hidden'
            iconClassName='text-white'
            onClick={toggleShowNav}
          />
        )}
      </div>

      {/* Mobile Nav */}
      <div
        className={clsxm(
          'fixed left-0 top-0 flex flex-col items-center gap-12',
          'h-screen w-full bg-typo px-4 pb-24 pt-10 md:hidden',
          'transition duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <UnstyledLink
          href='/'
          className='flex flex-row items-center gap-2 md:gap-4'
        >
          <NextImage
            src='/images/logo.png'
            alt='logo'
            width='42'
            height='42'
            className='w-7 md:w-10'
          />
          {/* <Typography
            font='montserrat'
            variant='p'
            color='white'
            className='text-xs'
          >
            GEOSENTRIC 2023
          </Typography> */}
        </UnstyledLink>

        <nav className='w-full flex-1'>
          <ul className='space-y-4'>
            <div className='w-full space-y-4 p-2.5 text-base'>
              <li>
                <Menu className='relative' as='div'>
                  <Menu.Button className='outline-none'>
                    {({ open }) => (
                      <Typography
                        color='white'
                        className='flex flex-row items-center gap-2.5 hover:brightness-90'
                      >
                        Events
                        <HiChevronDown
                          className={clsxm(
                            'text-xl transition duration-200 ease-in-out',
                            open && 'rotate-180 '
                          )}
                        />
                      </Typography>
                    )}
                  </Menu.Button>

                  <Menu.Items
                    className={clsxm(
                      'mt-2 w-max origin-top px-4',
                      'bg-typo text-start focus:outline-none'
                    )}
                  >
                    {events.map(({ name, href, color, hover }) => (
                      <Menu.Item
                        key={name}
                        as='button'
                        className='flex flex-col gap-2'
                      >
                        <UnstyledLink
                          href={href}
                          className={clsxm('rounded-xl py-2.5')}
                        >
                          <Typography
                            color='white'
                            variant='c1'
                            className='text-xs hover:brightness-90'
                          >
                            <span className={`${color} ${hover}`}>{name}</span>
                          </Typography>
                        </UnstyledLink>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </li>
              <li>
                <UnstyledLink href='#contact' className='flex'>
                  <Typography color='white' className='hover:brightness-90'>
                    Contact
                  </Typography>
                </UnstyledLink>
              </li>
            </div>
            <div className='flex flex-col gap-4'>
              {!isLogin ? (
                <>
                  <ButtonLink
                    href='/login'
                    size='base'
                    className='bg-typo-white border-0'
                  >
                    <Typography
                      color='white'
                      className='text-center'
                      variant='s3'
                    >
                      Login/Signup
                    </Typography>
                  </ButtonLink>
                </>
              ) : (
                <ButtonLink
                  href='/dashboard'
                  size='base'
                  className='border-typo-white text-typo-white bg-transparent'
                >
                  <Typography
                    color='white'
                    className='text-center'
                    variant='s3'
                  >
                    Dashboard
                  </Typography>
                </ButtonLink>
              )}
            </div>
          </ul>
        </nav>

        <IconButton
          icon={CgClose}
          className='rounded-full border-white'
          iconClassName='text-white'
          onClick={toggleShowNav}
        />
      </div>
    </header>
  );
}
