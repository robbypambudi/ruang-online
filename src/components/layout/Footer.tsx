'use client';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { events, quickLinks, socials } from '@/constant/event';

export default function Footer() {
  return (
    <footer className='z-[100] w-full bg-typo'>
      <div className='layout flex flex-col gap-6 divide-y divide-typo-secondary py-12'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:pb-20'>
          <div className='flex flex-row items-center gap-4'>
            <NextImage
              src='/images/logo.png'
              alt='logo'
              width='42'
              height='37'
            ></NextImage>
            <Typography color='white' className='text-lg'>
              Ruang Online
            </Typography>
          </div>
          <div className='flex flex-col gap-6 md:flex-row md:gap-24'>
            <div className='flex flex-col'>
              <Typography color='secondary' variant='c1' className='text-sm'>
                EVENTS
              </Typography>
              <ul className='mt-2.5 flex flex-col gap-y-2.5'>
                {events.map((event) => (
                  <li key={event.name}>
                    <UnstyledLink href={event.href}>
                      <Typography
                        color='white'
                        variant='c1'
                        className='text-sm hover:brightness-90'
                      >
                        <span className={`${event.color} ${event.hover}`}>
                          {event.name}
                        </span>
                      </Typography>
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col'>
              <Typography color='secondary' variant='c1' className='text-sm'>
                QUICK LINK
              </Typography>
              <ul className='mt-2.5 flex flex-col gap-y-2.5'>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <UnstyledLink href={link.href}>
                      <Typography
                        color='white'
                        variant='c1'
                        className='text-sm hover:brightness-90'
                      >
                        {link.name}
                      </Typography>
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className='hidden md:block' />
          </div>
        </div>

        <div className='flex flex-col-reverse items-center justify-between gap-6 pt-6 md:flex-row'>
          <Typography color='white' className='text-base'>
            &copy; Ruang Online
          </Typography>
          <div className='flex flex-row items-center gap-4 text-typo'>
            {socials.map((social) => (
              <UnstyledLink
                key={social.name}
                href={social.href}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white hover:brightness-90'
              >
                <social.icon size='20' />
              </UnstyledLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
