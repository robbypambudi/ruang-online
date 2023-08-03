import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';

import logger from '@/lib/logger';

import Breadcrumb from '@/components/Breadcrumb';
import IconLink from '@/components/links/IconLink';
import Typography from '@/components/typography/Typography';

import BuatTryoutForm from '@/pages/admin/tryout/buat/components/BuatTryoutForm';

export default function BuatTryoutPage() {
  const methods = useForm();
  const { handleSubmit } = methods;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    logger('Buat Tryout Form', data);
  };

  return (
    <>
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/admin/tryout'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={['/admin', '/admin/tryout', '/admin/tryout/buat']}
            />
            <Typography variant='h5' className='font-bold'>
              Buat Tryout
            </Typography>
          </div>
        </div>
      </header>

      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BuatTryoutForm />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
