'use client';
import AOS from 'aos';
import * as React from 'react';
import { BsLine, BsWhatsapp } from 'react-icons/bs';

import 'aos/dist/aos.css';

import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

export default function Home() {
  React.useEffect(() => {
    AOS.init({
      anchorPlacement: 'top-bottom',
      mirror: true,
      once: false,
    });
  }, []);

  const worldLogo = '/images/home/world.png';

  return (
    <Layout>
      <main className='overflow-x-hidden bg-[#24202D]'>
        <section
          className={clsxm(
            [
              'relative min-h-screen w-screen -translate-y-14 overflow-x-hidden',
            ],
            [
              'relative min-h-screen w-screen -translate-y-14 overflow-x-hidden',
            ],
            ['flex flex-col items-center justify-around px-10'],
            ['md:items-center lg:flex-row-reverse lg:px-60']
          )}
        >
          <NextImage
            src='/images/home/hero-purple.png'
            width={500}
            height={500}
            alt='hero'
            className='absolute -left-40 top-20 z-0 hidden lg:block'
            data-aos='fade-right'
            data-aos-duratioon='700'
          />
          <div
            className={clsxm([
              'relative z-10 flex items-center justify-center',
            ])}
          >
            <div className='absolute'>
              <NextImage
                src='/images/home/hero-purple.png'
                width={400}
                height={400}
                alt='hero'
                className={clsxm(
                  [
                    'absolute h-[200px] w-[200px] lg:-left-20 lg:-top-40 lg:h-[400px] lg:w-[400px]',
                  ],
                  ['-left-10 -top-20']
                )}
                data-aos='fade-left'
                data-aos-delay='900'
              />
              <NextImage
                src='/images/home/hero-blue.png'
                width={400}
                height={400}
                alt='hero'
                className={clsxm(
                  [
                    'absolute h-[200px] w-[200px] lg:-left-60 lg:-top-20 lg:h-[400px] lg:w-[400px]',
                  ],
                  ['-left-32 -top-10']
                )}
                data-aos='fade-down'
                data-aos-delay='1000'
              />
              <NextImage
                src='/images/home/hero-orange.png'
                width={400}
                height={400}
                alt='hero'
                className={clsxm(
                  [
                    'absolute h-[200px] w-[200px] lg:-left-72 lg:-top-60 lg:h-[400px] lg:w-[400px]',
                  ],
                  ['-left-40 -top-32']
                )}
                data-aos='fade-up'
                data-aos-delay='800'
              />
            </div>
            <NextImage
              src='/images/logo.png'
              width={340}
              height={340}
              alt='logo'
              className='h-[180px] w-[180px] md:h-[340px] md:w-[340px]'
              data-aos='zoom-in'
              data-aos-delay='600'
            />
          </div>
          <NextImage
            src='/images/home/hero-satelite.png'
            width={134}
            height={117}
            alt='satelite'
            className='absolute top-40 z-0 hidden lg:block'
            data-aos='zoom-in'
            data-aos-delay='700'
          />
          <div
            className={clsxm(
              ['flex flex-col justify-center'],
              ['relative z-10 md:block'],
              ['-translate-y-5 lg:-translate-y-0']
            )}
          >
            <Typography
              variant='j1'
              as='h1'
              color='white'
              className='text-center font-bold md:text-left'
              data-aos='fade-right'
              data-aos-delay='600'
            >
              Geosentric 2023
            </Typography>
            <Typography
              color='white'
              variant='h3'
              as='h3'
              className='pb-16 pt-5 text-justify lg:w-2/3'
              data-aos='fade-right'
              data-aos-delay='700'
            >
              Geomatics Science and Arts is the{' '}
              <span className='text-purple-300'>largest series</span> of events
              Department of Geomatics Engineering organized by the Association
              of <span className='text-purple-300'>Geomatics ITS</span>.
            </Typography>
            <ButtonLink
              href='#discover'
              data-aos='fade-down'
              data-aos-delay='700'
              data-aos-offset='-50'
            >
              Lets Discover
            </ButtonLink>
          </div>
        </section>
        <NextImage
          src='/images/home/hero-line.png'
          width={1420}
          height={144}
          alt='logo'
          className='absolute -bottom-5 w-full animate-pulse overflow-x-hidden lg:-bottom-16'
          data-aos='fade-up'
          data-aos-delay='600'
          data-aos-offset='-50'
        />
        <NextImage
          src={worldLogo}
          width={150}
          height={119}
          alt='logo'
          className='absolute bottom-0 right-10 z-0 h-[55px] w-[70px]  lg:h-[119px] lg:w-[150px]'
          data-aos='fade-up'
          data-aos-delay='600'
          data-aos-offset='-50'
        />
        <section
          id='discover'
          className={clsxm(['lg:-translate-y-10'], ['px-10'], ['lg:px-40'])}
        >
          <NextImage
            src='/images/home/subevent-circle.png'
            width={117}
            height={113}
            alt='circle'
            className='absolute left-96 z-0 hidden -translate-y-10 translate-x-96 lg:block'
            data-aos='fade-up'
            data-aos-delay='600'
          />
          <NextImage
            src='/images/home/triangle-two.png'
            width={97}
            height={97}
            alt='triangle'
            className='absolute left-0 z-0 hidden translate-y-40 lg:block'
            data-aos='fade-right'
            data-aos-delay='600'
          />
          <Typography
            variant='j2'
            as='h2'
            color='white'
            className='-translate-y-9 pt-20 font-bold lg:-translate-y-20'
          >
            Sub Event Geosentric
          </Typography>

          <div
            className={clsxm(
              ['grid grid-cols-1 space-y-10'],
              ['lg:grid-cols-2 lg:space-x-10 lg:space-y-0 lg:px-20'],
              ['lg:grid-cols-2 lg:space-x-10 lg:space-y-0 lg:px-20'],
              ['relative z-10 py-3']
            )}
          >
            <div
              data-aos='fade-right'
              className={clsxm(
                [
                  'rounded-md border-2 border-transparent bg-[#3E3155] text-justify hover:border-white',
                ],
                ['px-9 py-8'],
                ['hover:animate-pulse']
              )}
            >
              <NextImage
                src='/images/home/geolympic.png'
                width={80}
                height={80}
                alt='geolympic'
                className='mx-auto'
                data-aos='fade-down'
                data-aos-delay='500'
              />
              <Typography
                variant='h1'
                as='h3'
                color='white'
                className='pt-10 text-center font-bold'
                data-aos='fade-down'
                data-aos-delay='500'
              >
                Geolympic 2023
              </Typography>
              <Typography
                color='white'
                className='pt-8'
                data-aos='fade-down'
                data-aos-delay='500'
              >
                GEOLYMPIC (Geomatics Science and Exploration Olympiad) is an
                academic olympiad in the field of basic application of geomatics
                science held by HIMAGE-ITS.
              </Typography>
              <div
                className={clsxm(
                  ['mx-auto flex w-full items-end justify-end'],
                  ['pt-4 lg:pt-[60px]']
                )}
              >
                <ButtonLink href='/geolympic' className=''>
                  <Typography
                    color='white'
                    className='text-center'
                    variant='s3'
                  >
                    Lihat Selengkapnya
                  </Typography>
                </ButtonLink>
              </div>
            </div>

            <div
              data-aos='fade-left'
              className={clsxm(
                [
                  'mx-auto rounded-md border-2 border-transparent bg-[#3E3155] text-justify hover:border-white',
                ],
                ['px-9 py-8'],
                ['hover:animate-pulse']
              )}
            >
              <NextImage
                src='/images/home/geopost.png'
                width={80}
                height={80}
                alt='geolympic'
                className='mx-auto'
                data-aos='fade-down'
              />
              <Typography
                variant='h1'
                as='h3'
                color='white'
                className='pt-10 text-center font-bold'
                data-aos='fade-down'
              >
                Geopost 2023
              </Typography>
              <Typography
                color='white'
                className='pt-8 font-normal'
                data-aos='fade-down'
              >
                The Geocentric poster competition, namely the Geocentric Digital
                Poster Competition, is a digital poster competition for the
                general public in Indonesia. This competition aims to channel
                skills and creativity for the community and students as outlined
                in the form of digital posters
              </Typography>
              <div
                className={clsxm(
                  ['mx-auto flex w-full items-end justify-end'],
                  ['pt-4']
                )}
              >
                <ButtonLink
                  href='/geopost'
                  className=''
                  data-aos='fade-down'
                  data-aos-delay='500'
                >
                  <Typography
                    color='white'
                    className='text-center'
                    variant='s3'
                  >
                    Lihat Selengkapnya
                  </Typography>{' '}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section
          className={clsxm(
            ['pt-20 lg:pb-5 lg:pt-40'],
            ['relative overflow-x-hidden']
          )}
        >
          <NextImage
            src='/images/home/hero-blue.png'
            width={400}
            height={400}
            alt='hero'
            className={clsxm(
              ['absolute h-[200px] w-[200px] lg:h-[400px] lg:w-[400px]'],
              ['-right-20 -translate-y-20 lg:-right-40 lg:-translate-y-32']
            )}
          />
          <Typography
            variant='j2'
            as='h2'
            color='white'
            className='text-center font-bold'
            data-aos='flip-right'
            data-aos-delay='600'
          >
            Timeline Geosentric 2023
          </Typography>
          <NextImage
            src='/images/home/ring.png'
            width={129}
            height={87}
            alt='ring'
            className='mx-auto -translate-y-full translate-x-96'
            data-aos='fade-left'
          />

          {/* TIMELINE */}
          <div>
            <div
              className={clsxm(
                [
                  'mx-auto flex w-full flex-row lg:mt-20 lg:w-[700px] lg:flex-col',
                  'mx-auto flex w-full flex-row lg:mt-20 lg:w-[700px] lg:flex-col',
                ],
                ['items-center justify-start pb-10 lg:pb-0'],
                ['lg:items-center lg:justify-center']
              )}
            >
              <NextImage
                src='/images/home/desktop-timeline.png'
                width={584}
                height={3}
                alt='timeline'
                className='hidden w-full lg:block'
                data-aos='zoom-in'
              />
              <NextImage
                src='/images/home/mobile-timeline.png'
                width={3}
                height={230}
                alt='timeline'
                className='relative z-0 block h-full translate-x-[68px] lg:hidden lg:translate-x-0'
                data-aos='zoom-in'
              />
              <div
                className={clsxm(
                  ['flex flex-col lg:w-full lg:flex-row'],
                  ['justify-between gap-y-32'],
                  ['relative z-10']
                )}
              >
                <div
                  className={clsxm(
                    ['lg:-translate-x-1/2 lg:-translate-y-1/4'],
                    ['flex hover:animate-pulse lg:block']
                  )}
                >
                  <NextImage
                    data-aos='fade-down'
                    src={worldLogo}
                    width={126}
                    height={100}
                    alt='world'
                    className='lg:mx-auto'
                  />
                  <div data-aos='fade-down'>
                    <Typography
                      variant='h6'
                      color='white'
                      className='rounded-lg bg-[#F8650E] px-3 py-2 text-center font-semibold lg:mt-5'
                    >
                      12 Juli - 8 Oktober 2023
                    </Typography>
                    <Typography
                      color='white'
                      className='pt-5 text-start font-semibold lg:text-center lg:text-xl'
                    >
                      Geolympic
                    </Typography>
                  </div>
                </div>
                <div
                  className={clsxm(
                    ['lg:-translate-y-1/4 lg:translate-x-1/2'],
                    ['flex hover:animate-pulse lg:block']
                  )}
                >
                  <NextImage
                    data-aos='fade-down'
                    src={worldLogo}
                    width={126}
                    height={100}
                    alt='world'
                    className='lg:mx-auto'
                  />
                  <div data-aos='fade-down'>
                    <Typography
                      variant='h6'
                      color='white'
                      className='rounded-lg bg-[#696CA1] px-3 py-2 text-center font-semibold lg:mt-5'
                    >
                      2 September - 8 Oktober 2023
                    </Typography>
                    <Typography
                      color='white'
                      className='pt-5 text-start font-semibold lg:text-center lg:text-xl'
                    >
                      Digital Poster Competition
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='m-5 lg:m-32' id='contact'>
          <div
            className={clsxm([
              'w-full rounded-md border-2 border-[#9c96a7] border-transparent bg-[#3E3155] bg-opacity-40 p-10 duration-300 ease-in-out hover:border-white',
            ])}
          >
            <NextImage
              src='/images/home/triangle-four.png'
              width={105}
              height={105}
              alt='triangle'
              className='absolute right-0 z-0 hidden -translate-y-40 lg:block'
              data-aos='fade-left'
            />
            <div className='flex flex-col justify-between lg:flex-row'>
              <div>
                <Typography
                  color='white'
                  variant='h5'
                  className='text-center font-bold lg:text-left'
                  data-aos='fade-right'
                >
                  Any Question?
                </Typography>
                <Typography
                  color='white'
                  className='mt-8 text-center font-semibold lg:text-left'
                  data-aos='fade-right'
                >
                  You can contact this contact whenever you want
                </Typography>
              </div>
              <NextImage
                src='/images/home/phone.png'
                width={227}
                height={239}
                alt='phone'
                className='absolute right-80 hidden -translate-y-1/2 lg:block'
                data-aos='fade-down'
              />
            </div>
            <div className='mt-14 flex flex-col justify-evenly gap-y-5 lg:flex-row lg:gap-y-0'>
              <div>
                <Typography
                  color='white'
                  className='text-center font-semibold'
                  data-aos='fade-down'
                >
                  CP 1: Zidan
                </Typography>
                <div
                  className='mt-5 flex flex-col gap-y-2'
                  data-aos='fade-down'
                >
                  <UnstyledLink
                    href='https://wa.me/6285745444962'
                    target='_blank'
                    className='flex cursor-pointer gap-x-4 hover:animate-pulse'
                  >
                    <BsWhatsapp className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                    <Typography
                      color='white'
                      className='text-center font-semibold'
                    >
                      085745444962
                    </Typography>
                  </UnstyledLink>
                  <div className='flex gap-x-4'>
                    <BsLine className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                    <Typography
                      color='white'
                      className='text-center font-semibold'
                    >
                      zidan2804
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                className='w-0.5 rounded-full bg-white'
                data-aos='fade-down'
              ></div>
              <div>
                <Typography
                  color='white'
                  className='text-center font-semibold'
                  data-aos='fade-down'
                >
                  CP 2: Raka
                </Typography>
                <div
                  className='mt-5 flex flex-col gap-y-2'
                  data-aos='fade-down'
                >
                  <UnstyledLink
                    href='https://wa.me/6281292331829'
                    target='_blank'
                    className='flex cursor-pointer gap-x-4 hover:animate-pulse'
                  >
                    <BsWhatsapp className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                    <Typography
                      color='white'
                      className='text-center font-semibold'
                    >
                      081292331829
                    </Typography>
                  </UnstyledLink>
                  <div className='flex gap-x-4'>
                    <BsLine className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                    <Typography
                      color='white'
                      className='text-center font-semibold'
                    >
                      rakark11
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
