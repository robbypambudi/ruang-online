'use client';
import AOS from 'aos';
import * as React from 'react';

import 'aos/dist/aos.css';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function Home() {
  const about = React.useRef<HTMLDivElement>(null);
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
      <Seo />
      <main className='overflow-x-hidden bg-[#24202D]'>
        <section
          className={clsxm(
            [
              'relative min-h-screen w-screen -translate-y-14 overflow-x-hidden',
            ],
            ['flex flex-col items-center justify-around px-10'],
            ['md:items-center lg:flex-row-reverse lg:px-40']
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
            <NextImage
              src='/images/logo.png'
              width={435}
              height={175}
              alt='logo'
              className='w-[180px] md:w-[340px]'
              data-aos='zoom-in'
              data-aos-delay='600'
            />
          </div>
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
              Ruang Online
            </Typography>
            <Typography
              color='white'
              variant='h3'
              as='h3'
              className='pb-16 pt-5 text-justify lg:w-2/3'
              data-aos='fade-right'
              data-aos-delay='700'
            >
              Tempat berkumpulnya para pelajar dan mahasiswa untuk berkompetisi
              secara online dalam bidang Ilmu Pengetahuan dan Teknologi{' '}
            </Typography>
            <Button
              onClick={() =>
                about.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
              data-aos='fade-down'
              data-aos-delay='700'
              data-aos-offset='-50'
            >
              Lets Discover
            </Button>
          </div>
        </section>
        <NextImage
          src='/images/home/hero-line.png'
          width={1700}
          height={144}
          alt='logo'
          className='absolute -bottom-5 w-full animate-pulse overflow-x-hidden lg:-bottom-16'
          data-aos='fade-up'
          data-aos-delay='600'
          data-aos-offset='-50'
        />
        <section
          ref={about}
          className={clsxm(['lg:-translate-y-10'], ['px-10'], ['lg:px-40'])}
        >
          <Typography
            variant='j2'
            as='h2'
            color='white'
            className='-translate-y-9 pt-20 font-bold lg:-translate-y-20'
          >
            Event Saat Ini
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
                GEOLYMPIC (Geomatics Science and Exploration Olympiad) merupakan
                olimpiade akademik di bidang aplikasi dasar ilmu geomatika yang
                diselenggarakan oleh HIMAGE-ITS.
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
                Schematics 2024
              </Typography>
              <Typography
                color='white'
                className='pt-8 font-normal'
                data-aos='fade-down'
              >
                Schematics adalah salah satu event terbesar ITS yang
                diselenggarakan oleh mahasiswa Teknik Informatika ITS.
                Schematics merupakan event yang berfokus pada kompetisi
                pemrograman dan logika, serta memperkenalkan perkembangan
                teknologi kepada masyarakat luas melalui subevent-subevent
                Schematics
              </Typography>
              <div
                className={clsxm(
                  ['mx-auto flex w-full items-end justify-end'],
                  ['pt-4']
                )}
              >
                <ButtonLink
                  href='/'
                  className='hover:cursor-not-allowed'
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
            Timeline Event Saat Ini
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
                width={700}
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
                      12 Juli - 8 Oktober 2024
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
                      2 September - 8 Oktober 2024
                    </Typography>
                    <Typography
                      color='white'
                      className='pt-5 text-start font-semibold lg:text-center lg:text-xl'
                    >
                      Schematics 2024
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
