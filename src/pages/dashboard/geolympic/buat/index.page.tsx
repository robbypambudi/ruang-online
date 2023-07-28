import { useMutation, useQuery } from '@tanstack/react-query';
import router from 'next/router';
import { serialize } from 'object-to-formdata';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { FiArrowLeft } from 'react-icons/fi';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import UploadImage from '@/components/forms/UploadImage';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import MemberArrayField from '@/pages/dashboard/geolympic/buat/components/MemberArrayField';

import { ApiResponse } from '@/types/api';

type GeosentricRegisterForm = {
  team_name: string;
  asal_sekolah: string;
  member: {
    name: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    alamat: string;
    kartu_pelajar_url: string;
    sosmed: string;
  }[];
  bukti_pembayaran_url: string;
};
export default withAuth(GeosentricPage, 'USER', true);
function GeosentricPage() {
  const methods = useForm<GeosentricRegisterForm>();
  const { handleSubmit, watch, setValue } = methods;
  const user = useAuthStore.useUser();

  const { mutate } = useMutationToast<void, FormData>(
    useMutation((data) => {
      return api.post('/geolympic', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    })
  );

  const { clear } = useFormPersist('geolympioic', {
    watch: watch,
    setValue: setValue,
    storage: window.localStorage,
  });

  const { data } = useQuery<ApiResponse<{ data: number }>>([
    '/get_harga?event=geolympic',
  ]);

  React.useEffect(() => {
    if (user?.event?.is_geolympic.registration_status) {
      router.push('/dashboard/geolympic');
    }
  }, [user]);

  const onSubmit = (data: GeosentricRegisterForm) => {
    const formdata = serialize(data, {
      indices: true,
    });
    mutate(formdata, {
      onSuccess: () => {
        clear();
        router.push('/dashboard/geolympic');
      },
    });
  };

  function formatRupiah(data: number) {
    if (data) {
      return 'Rp. ' + data.toLocaleString('id-ID');
    }
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Seo templateTitle='Daftar Tryout' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/dashboard', '/dashboard/geolympic']} />
            <Typography variant='h2' className='font-bold'>
              Registration for Geolympic
            </Typography>
          </div>
        </div>
      </header>

      <div className='mt-5 rounded-md bg-white p-4 shadow-md'>
        <Typography variant='h6' className='font-bold'>
          Registration
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Input
                id='team_name'
                label='Team Name'
                placeholder='Enter team name'
                validation={{
                  required: 'Team name is required',
                }}
              />
              <Input
                id='asal_sekolah'
                label='School Name'
                placeholder='Enter school name'
                validation={{
                  required: 'School name is required',
                }}
              />
            </div>
            <div>
              <MemberArrayField />
            </div>
            <div className='mt-6 border-t'>
              <Typography variant='h6' className='mt-2 font-bold'>
                Payment
              </Typography>
              <div className='grid grid-cols-2 gap-x-4'>
                <div className='mt-2'>
                  <Typography variant='h5' className='font-bold'>
                    {formatRupiah(data?.data.data || 0)}
                  </Typography>
                  <ol>
                    <li className='mt-2'>
                      <Typography className='font-semibold'>
                        1. Pay the registration fee to the account number below
                        : <br />
                        <span className='text-primary-500'>
                          BNI: RISKYANIRMALA NOVATIANA 1299862385
                        </span>
                      </Typography>
                      <Typography className='font-semibold'>
                        2. Upload the payment receipt to the form below and make
                        sure the price is correct
                      </Typography>
                      <Typography className='font-semibold'>
                        3. Wait for the confirmation email from us to continue
                        to the next step
                      </Typography>
                      <Typography className='font-semibold'>
                        4. Make sure you have read the roles and regulations of
                        the competition before registering your team
                      </Typography>
                    </li>
                  </ol>
                </div>
                <UploadImage
                  id='bukti_pembayaran_url'
                  label='Upload Image'
                  location='geolympic/payment'
                  accept={{
                    image: ['image/png', 'image/jpg', 'image/jpeg'],
                  }}
                  validation={{
                    required: 'Image is required',
                  }}
                />
              </div>
            </div>
            <Button variant='primary' className='mt-4' type='submit'>
              Register Team
            </Button>
          </form>
        </FormProvider>
      </div>
    </DashboardLayout>
  );
}
