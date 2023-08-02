import { useRouter } from 'next/router';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function BuatTryoutAdmin() {
  const router = useRouter();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { quiz_list_id, size, name } = router.query;

  if (!size) {
    return (
      <DashboardLayout>
        <Seo templateTitle='Buat Tryout' />
        <header className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <IconLink
              href='/dashboard'
              icon={FiArrowLeft}
              iconClassName='text-gray-500'
            />
            <div className='flex flex-col'>
              <Breadcrumb
                crumbs={['/admin', '/admin/tryout', '/admin/tryout/buat']}
              />
              <Typography variant='h2' className='font-bold'>
                Buat Tryout
              </Typography>
            </div>
          </div>
        </header>

        <main>
          <section className='flex flex-col-reverse items-center justify-between rounded-xl bg-white p-2.5 shadow-lg lg:flex-row'>
            <div className='flex flex-col justify-between gap-4 px-5 py-3'>
              <Typography
                className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
                variant='h3'
                font='montserrat'
              >
                Geosentric ITS 2023
              </Typography>
              <Typography
                className='text-center'
                variant='j1'
                as='h1'
                font='montserrat'
              >
                {name}
              </Typography>
            </div>
          </section>
        </main>
      </DashboardLayout>
    );
  }
}
