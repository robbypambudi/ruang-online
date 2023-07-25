import { Disclosure } from '@headlessui/react';
import AOS from 'aos';
import NextImage from 'next/image';
import React from 'react';
import { BsArrowLeft, BsChevronUp, BsLine, BsWhatsapp } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'aos/dist/aos.css';

import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';

export default function Geolympic() {
  const [domLoaded, setDomLoaded] = React.useState(false);

  React.useEffect(() => {
    AOS.init();
    setDomLoaded(true);
  }, []);

  return (
    <Layout>
      <div className='bg-geolympic overflow-x-hidden'>
        <section className='flex items-center justify-center pb-16 pt-32 md:min-h-screen md:pb-0 lg:pt-0'>
          <NextImage
            src='/images/geolympic/hero-circle.png'
            alt='circle'
            width={172}
            height={248}
            data-aos='fade-right'
            className='1xl:top-40 1xl:w-24 absolute left-0 top-32 hidden w-12 md:block md:w-20'
          />
          <NextImage
            src='/images/geolympic/hero-circle-mobile.png'
            alt='circle mobile'
            width={78}
            height={97}
            className='absolute left-0 top-[13vh] block w-12 md:hidden'
          />
          <NextImage
            src='/images/geolympic/hero-aircraft.png'
            alt='aircraft'
            width={213}
            height={199}
            className='absolute left-[40%] top-40 hidden w-32 lg:block'
          />
          <div className='layout grid grid-cols-2 gap-8 lg:grid-cols-12 xl:gap-16'>
            <div className='order-last col-span-2 flex flex-col justify-center gap-4 lg:order-first lg:col-span-7 lg:gap-6'>
              <Typography variant='h4' color='white'>
                Geolympic 2023
              </Typography>
              <Typography color='white'>
                Geolympic (
                <span className='text-orange-500'>
                  Geomatics Science and Exploration Olympiad
                </span>
                ) is an
                <br className='1xl:block hidden' />{' '}
                <span className='text-orange-500'>Olympic activity</span> on{' '}
                <span className='text-orange-500'>basic sciences</span> related
                to Geomatics Engineering which is held for high
                school/equivalent students throughout Indonesia. Target
                Geolympics is SMA/K students of the same level, college
                students, and the general public.
              </Typography>
              <div className='mt-8'>
                <ButtonLink className='w-full md:w-fit' href='#timeline'>
                  Let&apos;s Discover
                </ButtonLink>
              </div>
            </div>
            <div className='col-span-2 lg:col-span-5'>
              <NextImage
                src='/images/geolympic/hero-logo.png'
                alt='logo'
                width={860}
                height={861}
                data-aos='zoom-in'
                className='mx-auto hidden w-[90%] scale-100 md:block lg:mx-0 lg:ml-auto lg:scale-[1.3]'
              />
              <NextImage
                src='/images/geolympic/hero-logo-mobile.png'
                alt='logo mobile'
                width={720}
                height={842}
                className='-mb-24 -mt-[10vh] block md:hidden'
              />
            </div>
          </div>
        </section>

        <section id='timeline' className='relative min-h-screen pt-10 md:pt-32'>
          <NextImage
            src='/images/geolympic/hero-line.png'
            alt='line'
            width={2161}
            height={261}
            data-aos='fade-up'
            className='absolute right-0 top-40 hidden w-full md:block lg:-top-24'
          />
          <NextImage
            src='/images/geolympic/hero-line-mobile.png'
            alt='line mobile'
            width={780}
            height={78}
            className='absolute right-0 top-16 block w-full md:hidden'
          />

          <div className='layout pt-48 lg:pt-24'>
            <div className='flex w-full items-center justify-center md:justify-between'>
              <Typography
                variant='h5'
                color='white'
                className='text-center font-bold md:text-left'
              >
                Roadmap Geolympic 2023
              </Typography>
              <ButtonLink
                href='/dashboard/geolympic'
                className='hidden md:flex md:items-center md:justify-center md:gap-2'
              >
                Register Now
                <BsArrowLeft className='rotate-180 font-bold' />
              </ButtonLink>
            </div>
            <div className='mx-auto mt-24 flex w-full gap-16 md:w-3/5 lg:mt-52 lg:w-full'>
              <div className='bg-timeline-geolympic ml-6 mr-auto w-1 text-white lg:mx-auto lg:w-[95%] xl:w-[90%]'>
                <div className='mx-0 mr-auto flex h-[52rem] w-1 flex-col items-center justify-between lg:mx-auto lg:h-1 lg:w-[103%] lg:flex-row'>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-up'
                      data-aos-duration='500'
                      className='tl-geolym relative w-16 font-semibold lg:w-fit'
                    >
                      <NextImage
                        src='/images/geolympic/timeline-trophy.png'
                        alt='trophy'
                        width={103}
                        height={102}
                        className='h-max w-16'
                      />
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          ['absolute mt-8 w-max -translate-x-1/4']
                        )}
                      >
                        14 Jul - 26 Ags
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute mt-[68px] -translate-x-[10%] !text-xs md:!text-sm'
                      >
                        Pendaftaran
                      </Typography>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-down'
                      data-aos-duration='500'
                      className='tl-geolym relative font-semibold'
                    >
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute w-max -translate-x-[39%] -translate-y-[84px]',
                          ]
                        )}
                      >
                        27 Agustus
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute w-max -translate-x-[40%] -translate-y-[108px] !text-xs md:!text-sm'
                      >
                        Try Out 1 (online)
                      </Typography>
                      <div className='h-6 w-6 rounded-full bg-orange-400'></div>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-up'
                      data-aos-duration='500'
                      className='tl-geolym relative font-semibold'
                    >
                      <div className='h-6 w-6 rounded-full bg-orange-400'></div>
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute mt-[52px] w-max -translate-x-[41%]',
                          ]
                        )}
                      >
                        03 September
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute mt-[88px] w-max -translate-x-[41%] text-center !text-xs md:!text-sm'
                      >
                        Opening Geolympic
                        <br />
                        Try Out 2 (online)
                      </Typography>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-down'
                      data-aos-duration='500'
                      className='tl-geolym relative font-semibold'
                    >
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute w-max -translate-x-[40%] -translate-y-[84px]',
                          ]
                        )}
                      >
                        10 September
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute w-max -translate-x-[40%] -translate-y-[108px] !text-xs md:!text-sm'
                      >
                        Babak Penyisihan
                      </Typography>
                      <div className='h-6 w-6 rounded-full bg-orange-400'></div>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-up'
                      data-aos-duration='500'
                      className='tl-geolym relative w-16 font-semibold lg:w-fit'
                    >
                      <NextImage
                        src='/images/geolympic/timeline-trophy.png'
                        alt='trophy'
                        width={103}
                        height={102}
                        className='h-max w-16'
                      />
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          ['tl-items absolute mt-8 w-max -translate-x-1/4']
                        )}
                      >
                        14 September
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute mt-[68px] w-max -translate-x-[31%] !text-xs md:!text-sm'
                      >
                        Pengumuman Penyisihan
                      </Typography>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-down'
                      data-aos-duration='500'
                      className='tl-geolym relative font-semibold'
                    >
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute w-max -translate-x-[39%] -translate-y-[84px]',
                          ]
                        )}
                      >
                        01 Oktober
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute w-max -translate-x-[39%] -translate-y-[108px] !text-xs md:!text-sm'
                      >
                        Babak Semifinal
                      </Typography>
                      <div className='h-6 w-6 rounded-full bg-orange-400'></div>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-up'
                      data-aos-duration='500'
                      className='tl-geolym relative font-semibold'
                    >
                      <div className='h-6 w-6 rounded-full bg-orange-400'></div>
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute mt-[52px] w-max -translate-x-[39%]',
                          ]
                        )}
                      >
                        05 Oktober
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute mt-[88px] w-max -translate-x-[43%] !text-xs md:!text-sm'
                      >
                        Pengumuman Semifinal
                      </Typography>
                    </div>
                  </div>
                  <div className='tl-geolym'>
                    <div
                      data-aos='fade-down'
                      data-aos-duration='500'
                      className='tl-geolym relative w-16 font-semibold lg:w-fit'
                    >
                      <NextImage
                        src='/images/geolympic/timeline-trophy.png'
                        alt='trophy'
                        width={103}
                        height={102}
                        className='h-max w-16'
                      />
                      <div
                        className={clsxm(
                          [
                            'tl-items min-h-[26px] rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                          ],
                          [
                            'tl-items absolute w-max -translate-x-[20%] -translate-y-[127px]',
                          ]
                        )}
                      >
                        15 Oktober
                      </div>
                      <Typography
                        color='white'
                        className='tl-items absolute w-max -translate-x-[27%] -translate-y-[151px] !text-xs md:!text-sm'
                      >
                        Babak Final (Offline)
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className='block w-full text-white lg:hidden'>
                <div className=''>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    14 Jul - 26 Ags
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Pendaftaran
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    27 Agustus
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Try Out 1 (online)
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    03 September
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Opening Geolympic Try Out 2 (online)
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    10 September
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Babak Penyisihan
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    14 September
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Pengumuman Penyisihan
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    01 Oktober
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Babak Semifinal
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    05 Oktober
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Pengumuman Semifinal
                  </Typography>
                </div>
                <div className='mt-[50px] md:mt-8'>
                  <div
                    className={clsxm(
                      [
                        'flex min-h-[26px] items-center justify-center rounded-md border border-[#F8863A] px-[10px] py-0.5 text-xs font-medium md:min-h-[30px] md:rounded-lg md:px-4 md:py-1.5 md:text-sm',
                      ],
                      ['w-full']
                    )}
                  >
                    15 Oktober
                  </div>
                  <Typography color='white' className='mt-2 font-semibold'>
                    Babak Final (Offline)
                  </Typography>
                </div>
              </div>
            </div>
            <ButtonLink
              href='/dashboard/geolympic'
              className='mt-4 flex w-full items-center justify-center gap-2 md:hidden'
            >
              Register Now
              <BsArrowLeft className='rotate-180 font-bold' />
            </ButtonLink>
          </div>
        </section>
        <section className='relative min-h-screen pt-32'>
          <div
            data-aos='zoom-in'
            data-aos-delay='500'
            data-aos-anchor-placement='center-bottom'
            className='absolute -left-16 top-10 h-24 w-24 rounded-full bg-orange-100 blur-[75px] md:-top-16 md:h-36 md:w-36 lg:h-48 lg:w-48'
          ></div>
          <NextImage
            src='/images/geolympic/reward-buble.png'
            alt='bubble'
            width={212}
            height={308}
            data-aos='fade-left'
            className='absolute right-0 top-4 w-12 md:-top-16 md:w-36'
          />
          <div className='layout'>
            <Typography
              variant='h5'
              color='white'
              className='text-center font-bold'
            >
              Reward Geolympic 2023
            </Typography>
            <div className='mt-16 flex flex-col items-center gap-12 md:flex-row md:items-end md:gap-0'>
              <div className='relative z-50 w-full'>
                <NextImage
                  src='/images/geolympic/reward-coin-2.png'
                  alt='coin'
                  width={151}
                  height={150}
                  data-aos='fade-up'
                  className='mx-auto mb-4 w-16 md:mb-8 md:w-[88px]'
                />
                <div className='flex h-60 w-full flex-col items-center justify-center gap-4 rounded-xl bg-orange-700 text-center md:h-72 md:rounded-none'>
                  <Typography variant='h3' color='white' className='font-bold'>
                    2nd
                  </Typography>
                  <Typography variant='h6' color='white' className='font-bold'>
                    Geolympic 2023
                  </Typography>
                  <Typography
                    color='white'
                    className='w-[70%] font-medium leading-8'
                  >
                    Rp1.500.000
                  </Typography>
                </div>
              </div>
              <div className='order-first w-full md:order-none'>
                <NextImage
                  src='/images/geolympic/reward-trophy.png'
                  alt='trophy'
                  width={541}
                  height={540}
                  data-aos='fade-up'
                  className='mx-auto -mb-1 w-52 md:mb-0 md:w-64'
                />
                <div className='flex h-72 w-full flex-col items-center justify-center gap-4 rounded-xl bg-orange-500 text-center md:h-96 md:rounded-none'>
                  <Typography variant='h3' color='white' className='font-bold'>
                    1st
                  </Typography>
                  <Typography variant='h6' color='white' className='font-bold'>
                    Geolympic 2023
                  </Typography>
                  <Typography
                    color='white'
                    className='w-[70%] font-medium leading-8'
                  >
                    Rp2.000.000,00 + Free Pass Teknik Geomatika ITS
                  </Typography>
                </div>
              </div>
              <div className='relative z-50 w-full'>
                <NextImage
                  src='/images/geolympic/reward-coin-3.png'
                  alt='coin'
                  width={151}
                  height={150}
                  data-aos='fade-up'
                  className='mx-auto mb-4 w-16 md:mb-8 md:w-24'
                />
                <div className='flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl bg-orange-900 text-center md:h-64 md:rounded-none'>
                  <Typography variant='h3' color='white' className='font-bold'>
                    3rd
                  </Typography>
                  <Typography variant='h6' color='white' className='font-bold'>
                    Geolympic 2023
                  </Typography>
                  <Typography
                    color='white'
                    className='w-[70%] font-medium leading-8'
                  >
                    Rp1.000.000
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className='relative z-[99] w-full bg-[#190A01] bg-opacity-25 p-3 text-center'>
            <Typography color='white'>
              Semua Peserta Mendapatkan Sertifikat
            </Typography>
          </div>
          <div
            data-aos='zoom-in'
            data-aos-delay='500'
            data-aos-anchor-placement='center-bottom'
            className='absolute -right-8 bottom-72 z-0 block h-24 w-24 rounded-full bg-orange-200 blur-[60px] md:-top-10 md:hidden md:h-28 md:w-28 lg:top-12 lg:h-36 lg:w-36'
          ></div>
        </section>
        <section className='py-16 md:py-24'>
          <div className='layout'>
            <Typography
              variant='h5'
              color='white'
              className='text-center font-bold'
            >
              Terms and Conditions
            </Typography>

            <div className='mt-8 w-full rounded-lg border-2 border-orange-500 p-8 pt-[28px] text-white'>
              <ul className='break- mx-auto w-fit break-words'>
                <li className='mb-4 list-disc'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    The competition is conducted in groups of 3 participants
                    from the same school.
                  </Typography>
                </li>
                <li className='mb-4 list-disc'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    Participants are active SMA / SMK / equivalent students
                    throughout Indonesia.
                  </Typography>
                </li>
                <li className='list-disc'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    Participants must take part in a series of Geolympic 2023
                    activities online and offline.
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className=''>
          <NextImage
            src='/images/geolympic/terms-line.png'
            alt='line'
            width={2187}
            height={132}
            data-aos='fade-up'
            className='w-full'
          />
          <div className='layout py-12 md:py-24'>
            <Typography
              variant='h5'
              color='white'
              className='text-center font-bold'
            >
              Registration Procedure
            </Typography>
            <div className='mt-8 w-full rounded-md border border-orange-100 bg-orange-700 p-8 text-white'>
              <ul className='break- mx-auto w-fit break-words'>
                <li className='mb-4 list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    Participant registration starts on July 14 - August 26, 2023
                  </Typography>
                </li>
                <li className='mb-4 list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    Registration will be carried out online through the official
                    website of Geosentric at www.geosentric-its.com
                  </Typography>
                </li>
                <li className='mb-4 list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    The teams then fill in all the requested information
                    correctly.
                  </Typography>
                </li>
                <li className='mb-4 list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    The teams upload proof of payment of registration fees of
                    Rp. 60,000.00 / Team through the account listed on the
                    poster
                  </Typography>
                </li>
                <li className='mb-4 list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    The teams then upload a scan of the student card in .jpg /
                    .pdf format.
                  </Typography>
                </li>

                <li className='list-decimal'>
                  <Typography
                    variant='h6'
                    color='white'
                    className='translate-y-1'
                  >
                    Each team will receive an e-mail reply as a confirmation
                    that the registration has been successfully carried out,
                    along with the registration number as a username to enter
                    the GEOSENTRIC 2023 website
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className='relative p-4 pb-24 pt-24 md:p-32 md:pb-24 md:pt-48'>
          <NextImage
            src='/images/geolympic/qna-circle.png'
            alt='circle'
            width={128}
            height={191}
            data-aos='fade-right'
            className='absolute left-0 top-6 w-8 md:top-0 md:w-16 lg:top-16'
          />

          <div
            data-aos='zoom-in'
            data-aos-delay='500'
            data-aos-anchor-placement='center-bottom'
            className='absolute -right-8 top-0 hidden h-24 w-24 rounded-full bg-orange-200 blur-[60px] md:-top-10 md:block md:h-28 md:w-28 lg:top-12 lg:h-36 lg:w-36'
          ></div>
          <div className='layout'>
            <div className='relative z-[99] w-full rounded-md border border-white bg-[#E36008] bg-opacity-40 p-4 md:p-10'>
              <div data-aos='zoom-in'>
                <NextImage
                  src='/images/geolympic/qna-phone.png'
                  width={454}
                  height={478}
                  alt='phone'
                  className='absolute -right-4 w-24 -translate-y-[70%] md:-right-4 md:w-36 lg:right-36 lg:w-44 lg:-translate-y-[65%] xl:right-44'
                />
              </div>
              <Typography
                color='white'
                variant='h5'
                className='text-center font-bold md:text-left'
              >
                Any Question?
              </Typography>
              <Typography
                color='white'
                className='mx-auto mt-8 w-4/5 text-center font-medium md:w-full md:text-left md:font-semibold'
              >
                You can contact this contact whenever you want
              </Typography>
              <div className='mt-14 flex gap-2 md:gap-16'>
                <div className='w-full'>
                  <Typography
                    color='white'
                    className='ml-0 text-center md:ml-6 md:text-left'
                  >
                    CP 1: Zidan
                  </Typography>
                  <div className='mt-5 flex flex-col gap-y-2'>
                    <div className='flex gap-x-2 md:gap-x-4'>
                      <BsWhatsapp className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                      <Typography color='white' className='text-center'>
                        085745444962
                      </Typography>
                    </div>
                    <div className='flex gap-x-2 md:gap-x-4'>
                      <BsLine className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                      <Typography color='white' className='text-center'>
                        zidan2804
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className='h-28 w-[4px] rounded-2xl bg-orange-100'></div>
                <div className='w-full'>
                  <Typography
                    color='white'
                    className='ml-0 text-center md:ml-6 md:text-left'
                  >
                    CP 2: Raka
                  </Typography>
                  <div className='mt-5 flex flex-col gap-y-2'>
                    <div className='flex gap-x-2 md:gap-x-4'>
                      <BsWhatsapp className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                      <Typography color='white' className='text-center'>
                        081292331829
                      </Typography>
                    </div>
                    <div className='flex gap-x-2 md:gap-x-4'>
                      <BsLine className='h-[25px] w-[25px] rounded-md bg-white p-[5px] text-black' />
                      <Typography color='white' className='text-center'>
                        rakark11
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='relative -mb-28'>
          <div
            data-aos='zoom-in'
            data-aos-delay='500'
            data-aos-anchor-placement='top-bottom'
            className='absolute -left-8 -top-28 h-24 w-24 rounded-full bg-orange-300 blur-[50px] md:top-24 md:h-24 md:w-24 lg:h-36 lg:w-36'
          ></div>

          <div className='layout'>
            <Typography variant='h5' color='white' className='font-bold'>
              Faq Geolympic 2023
            </Typography>
            <div className='relative z-50 w-full pt-8'>
              <div className='faq-geolym mx-auto w-full rounded-xl bg-transparent'>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between rounded-t-lg border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>What is GEOLYMPIC?</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        {' '}
                        Geolympic is one of the events from Geosentric, which is
                        one of the big events of the ITS Geomatics Engineering
                        Department. The Geolympic is an academic olympiad that
                        is participated by senior high school (SMA/K) students
                        and the equivalent.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>
                          Is the competition held as a team or individually?
                        </span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        As a team.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>How many people in a team?</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        One team consists of 3 people.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>
                          Does one team have to come from the same school?
                        </span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        Yes, all members of each team must come from the same
                        school.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>How many rounds are there in GEOLYMPIC?</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        There are 3 rounds, namely The Elimination Round, The
                        Semifinal Round, and The Final Round.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>Where will these rounds be held?</span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        The Elimination and Semifinal Rounds will be held online
                        through the official Geosentric website, the Zoom
                        Meeting platform, and Google Meet. While the Final round
                        will be held offline at the ITS Geomatics Engineering
                        Department.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>
                          Can the fields of study that are worked on be chosen
                          or are they required to work on all contested fields
                          of study?
                        </span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        The fields of study that are worked on can’t be chosen.
                        So, all available fields of study that are contested
                        must be worked on.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex w-full justify-between border-b-[1px] border-orange-900 border-opacity-60 bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'>
                        <span>
                          What if we don&apos;t have a Student Identity Card?
                        </span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white'>
                        Prospective participants can use other documents that
                        prove that they are active students in the school. It
                        can be in the form of a cover letter from the school,
                        NISN card, high school report card bio, etc. New
                        students can use a certificate or other document that
                        proves the prospective participant has been accepted at
                        the school.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as='div' className=''>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`${
                          open ? '' : 'rounded-b-lg'
                        } flex w-full justify-between bg-[#AE4C13] bg-opacity-50 px-4 py-4 text-left text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75`}
                      >
                        <span>
                          Do we have to use a laptop/PC when working on
                          questions?
                        </span>
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className={`${
                          open ? 'rounded-b-lg' : ''
                        } bg-faq-geolympic px-4 pb-4 pt-4 text-sm text-white`}
                      >
                        You don&apos;t have to, but preferably using a
                        laptop/PC. If participants don&apos;t have a laptop/PC,
                        they can use a phone.
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-[#0B0614] pt-44'>
          <Typography
            variant='h5'
            color='white'
            className='text-center font-bold'
          >
            Gallery Geolympic
          </Typography>
          <div className='px-4 pb-44 pt-16 md:px-24'>
            {domLoaded && (
              <Swiper
                // modules={[Autoplay, Pagination, Navigation]}
                // breakpoints={{
                //   300: {
                //     slidesPerView: 1,
                //     spaceBetween: 20,
                //   },
                //   640: {
                //     slidesPerView: 1,
                //     spaceBetween: 20,
                //   },
                //   768: {
                //     slidesPerView: 2,
                //     spaceBetween: 20,
                //   },
                //   1024: {
                //     slidesPerView: 3,
                //     spaceBetween: 10,
                //   },
                // }}
                className='mySwiper'
              >
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={567}
                    src='/images/geolympic/IMG_1.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={603}
                    src='/images/geolympic/IMG_2.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={634}
                    src='/images/geolympic/IMG_3.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={621}
                    src='/images/geolympic/IMG_4.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={636}
                    src='/images/geolympic/IMG_5.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={634}
                    src='/images/geolympic/IMG_6.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={624}
                    src='/images/geolympic/IMG_7.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={744}
                    src='/images/geolympic/IMG_8.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={743}
                    src='/images/geolympic/IMG_9.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NextImage
                    width={1125}
                    height={737}
                    src='/images/geolympic/IMG_10.jpg'
                    className='mx-auto h-56 w-full xl:h-64'
                    alt=''
                    quality={100}
                  />
                </SwiperSlide>
              </Swiper>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
