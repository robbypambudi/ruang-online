import AOS from 'aos';
import React from 'react';

import 'aos/dist/aos.css';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

function Geopost() {
  React.useEffect(() => {
    AOS.init({
      anchorPlacement: 'top-bottom',
      mirror: true,
      once: false,
    });
  }, []);
  return (
    <Layout>
      <Seo templateTitle='Geopost' />
      <div className='min-h-screen bg-[#24202D]'>
        <section className='relative flex items-center justify-center pb-16 pt-32 md:min-h-screen md:pb-0 lg:pt-0'>
          <NextImage
            src='/images/geopost/circle-1.png'
            alt='circle 1'
            width={767}
            height={767}
            className='absolute right-[19rem] top-16 z-[1] hidden w-[26rem] md:block'
            data-aos='fade-right'
            data-aos-delay='200'
          />
          <NextImage
            src='/images/geopost/circle-2.png'
            alt='circle 2'
            width={767}
            height={767}
            className='absolute right-36 top-[15rem] z-[1] hidden w-[26rem] md:block'
            data-aos='fade-left'
            data-aos-delay='400'
          />
          <NextImage
            src='/images/geopost/asset-1.png'
            alt='triangle'
            width={124}
            height={151}
            className='absolute left-0 top-10 w-10 md:top-32 md:w-16'
            data-aos='fade-right'
            data-aos-delay='100'
          />
          <NextImage
            src='/images/geopost/asset-2.png'
            alt='satelite'
            width={173}
            height={150}
            className='absolute right-36 top-24 hidden w-28 md:block'
            data-aos='fade-right'
            data-aos-delay='100'
          />
          <NextImage
            src='/images/geopost/asset-3.png'
            alt='zeppelin'
            width={210}
            height={194}
            className='absolute bottom-24 right-[34rem] hidden w-24 md:block'
            data-aos='zoom-in'
            data-aos-delay='100'
            data-aos-anchor-placement='top-bottom'
          />
          <div className='layout grid -translate-y-8 grid-cols-2 gap-8 lg:grid-cols-12 xl:gap-16'>
            <div className='order-last col-span-2 flex flex-col justify-center gap-4 lg:order-first lg:col-span-7 lg:gap-6'>
              <Typography variant='j1' color='white' data-aos='fade-right'>
                Geopost 2023
              </Typography>
              <Typography
                color='white'
                variant='h3'
                as='h3'
                data-aos='fade-right'
              >
                Geopost (
                <span className='text-[#CCCFE0]'>
                  Geosentric Digital Poster Competition
                </span>
                ) is an activities to channel skills and creativity to the
                community and students in Indonesia as outlined in the form of
                digital posters. Geopost 2023 carries the theme 'Spatial Science
                with the Use of LoT'.
              </Typography>
              <div
                className='mt-8 flex flex-col gap-2'
                data-aos='fade-up'
                data-aos-delay='200'
                data-aos-anchor-placement='top-bottom'
              >
                <ButtonLink
                  href='https://intip.in/RegistrationGEOPOST2023'
                  className='w-full border-[#323458] bg-[#545793] hover:bg-[#4c4e84] md:w-fit'
                >
                  <Typography variant='s2' color='white'>
                    Register Now
                  </Typography>
                </ButtonLink>
                <ButtonLink
                  variant='outline'
                  href='https://drive.google.com/file/d/1xPmLEd6fvYeEdyllGdOli53JFuYJVQXU/view?usp=sharing'
                  className='group w-full border-[#323458] md:w-fit'
                >
                  <Typography
                    variant='s2'
                    color='white'
                    className='group-hover:text-[#323458]'
                  >
                    Guidebook
                  </Typography>
                </ButtonLink>
              </div>
            </div>
            <div className='col-span-2 lg:col-span-5'>
              <div>
                <NextImage
                  src='/images/geopost/logo-geopost.png'
                  alt='logo'
                  width={450}
                  height={450}
                  className='relative z-[10] mx-auto w-52 md:w-80'
                  data-aos='zoom-in'
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Geopost;
