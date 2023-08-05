import { useMutation } from '@tanstack/react-query';
import router from 'next/router';
import { serialize } from 'object-to-formdata';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';

import api from '@/lib/axios';
import logger from '@/lib/logger';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import BuatTryoutForm from '@/pages/admin/tryout/buat/components/BuatTryoutForm';

type createGeolympicTryout = {
  name: string;
  start_date: string;
  end_date: string;
  duration: number;
  summary: string;
  code: string;
  category: string;
  status: 1;
};

export default withAuth(BuatTryoutPage, ['admin_tryout.store']);

function BuatTryoutPage() {
  const methods = useForm<createGeolympicTryout>();
  const { handleSubmit } = methods;

  const { mutate } = useMutationToast<void, FormData>(
    useMutation((data) => {
      return api.post('/admin/quiz_list', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    })
  );

  const onSubmit = (data: createGeolympicTryout) => {
    const formdata = serialize(data, {
      indices: true,
    });
    mutate(formdata, {
      onSuccess: () => {
        router.push('/admin/tryout');
      },
    });

    logger(data);
  };

  return (
    <DashboardLayout>
      <Seo templateTitle='Buat Tryout' />
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
    </DashboardLayout>
  );
}
