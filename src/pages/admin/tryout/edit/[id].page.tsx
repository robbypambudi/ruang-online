import { useMutation, useQuery } from '@tanstack/react-query';
import router from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import ErrorMessage from '@/components/forms/ErrorMessage';
import Input from '@/components/forms/Input';
import RadioButton from '@/components/forms/Radio';
import TextArea from '@/components/forms/TextArea';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { DetailQuiz } from '@/types/entities/question';

type createGeolympicTryout = {
  name: string;
  start_date: string;
  end_date: string;
  duration: number;
  summary: string;
  code: string;
  category: string;
  status: '1' | '0';
};

export default withAuth(BuatTryoutPage, ['admin_tryout.store']);

function BuatTryoutPage() {
  const { id } = router.query;

  const { data: detailQuiz } = useQuery<ApiResponse<DetailQuiz>, Error>(
    [`/admin/quiz_list/detail?quiz_list_id=${id}`],
    {
      keepPreviousData: true,
    }
  );

  const { mutate } = useMutationToast<void, createGeolympicTryout>(
    useMutation((data) => {
      return api.patch(
        `/admin/quiz_list?quiz_list_id=${id}&name=${data.name}`,
        data
      );
    }),
    {
      success: 'Berhasil mengedit quiz',
    }
  );

  const methods = useForm<createGeolympicTryout>({
    defaultValues: {
      name: detailQuiz?.data.name,
      start_date: detailQuiz?.data.start_time,
      end_date: detailQuiz?.data.end_time,
      duration: detailQuiz?.data.duration,
      summary: detailQuiz?.data.summary,
      code: detailQuiz?.data.code,
      category: detailQuiz?.data.category,
      status: detailQuiz?.data.is_active === true ? '1' : '0',
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: createGeolympicTryout) => {
    data.duration = Number(data.duration);
    mutate(data, {
      onSuccess: () => {
        router.push('/admin/tryout');
      },
    });
  };

  return (
    <DashboardLayout>
      <Seo templateTitle='Edit Tryout' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/${id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={['/admin', '/admin/tryout', '/admin/tryout/edit']}
            />
            <Typography variant='h5' className='font-bold'>
              Edit Tryout
            </Typography>
          </div>
        </div>
      </header>

      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <div className='rounded-md bg-surface-card p-6 shadow-md'>
                <div className='grid grid-cols-2 gap-12'>
                  <div className='space-y-4'>
                    <Input
                      label='Nama Tryout'
                      id='name'
                      placeholder='Nama Tryout'
                      validation={{
                        required: 'Nama Tryout tidak boleh kosong!',
                      }}
                    />
                    <DatePicker
                      label='Tanggal Mulai'
                      id='start_date'
                      placeholder='Tanggal Mulai'
                      validation={{
                        required: 'Tanggal Mulai tidak boleh kosong!',
                      }}
                      showTimeInput
                      dateFormat='yyyy-MM-dd HH:mm:ss'
                    />
                    <DatePicker
                      label='Tanggal Selesai'
                      id='end_date'
                      placeholder='Tanggal Selesai'
                      validation={{
                        required: 'Tanggal Selesai tidak boleh kosong!',
                      }}
                      showTimeInput
                      dateFormat='yyyy-MM-dd HH:mm:ss'
                    />
                  </div>
                  <div className='space-y-4'>
                    <Input
                      id='code'
                      label='Kode Tyout'
                      placeholder='Kode Tryout'
                      validation={{
                        required: 'Kode Tryout tidak boleh kosong!',
                      }}
                      helperText='Kode Tryout harus bersifat unik'
                    />
                    <Input
                      id='category'
                      label='Kategori Tryout'
                      placeholder='Kategori Tryout'
                      validation={{
                        required: 'Kategori Tryout tidak boleh kosong!',
                      }}
                    />
                    <Input
                      id='duration'
                      label='Durasi Pengerjaan (dalam menit)'
                      placeholder='Durasi Pengerjaan'
                      type='number'
                      validation={{
                        required: 'Durasi pengerjaan tidak boleh kosong!',
                      }}
                    />
                  </div>
                </div>
                <div className='mt-4 space-y-2'>
                  <TextArea
                    label='Ringkasan Tryout'
                    id='summary'
                    placeholder='Deskripsi'
                  />
                  <label
                    htmlFor='status'
                    className='block text-sm font-semibold text-typo'
                  >
                    Status Tryout
                  </label>
                  <div className='mt-1 grid grid-flow-col grid-rows-2'>
                    <RadioButton
                      label='Ready'
                      name='status'
                      value='1'
                      validation={{ required: 'Status tidak boleh kosong!' }}
                      hideError
                    />
                    <RadioButton
                      label='Draft'
                      name='status'
                      value='0'
                      validation={{ required: 'Status tidak boleh kosong!' }}
                      hideError
                    />
                  </div>
                  <p className='text-xs text-gray-500'>
                    Status tryout yang{' '}
                    <span className='font-semibold'>READY</span> akan
                    ditampilkan di halaman utama user
                  </p>
                  <ErrorMessage id='status' />
                </div>

                <div className='mt-5 space-x-4'>
                  <Button type='submit' variant='primary' leftIcon={FiSave}>
                    Simpan
                  </Button>
                </div>
              </div>
            </>
          </form>
        </FormProvider>
      </div>
    </DashboardLayout>
  );
}
