import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import PasswordInput from '@/components/forms/PasswordInput';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import { ChangePassword } from '@/types/entities/change-passweord';

export default withAuth(ChangePasswordPage, 'USER', true);
function ChangePasswordPage() {
  const methods = useForm<ChangePassword>();
  const { handleSubmit } = methods;
  const [isSuccess, setSuccess] = React.useState(false);

  const user = useAuthStore.useUser();

  const { mutate, isLoading } = useMutationToast<void, ChangePassword>(
    useMutation(async (data) => {
      return api
        .post('/change_password', {
          email: data.email,
          ...data,
        })
        .then((res) => {
          if (res.data.success) {
            setSuccess(true);
          }
        });
    }),
    {
      success: 'Kata sandi berhasil diubah',
    }
  );

  const changePassword = (_data: ChangePassword) => {
    if (user?.email === undefined) return;
    const data = {
      ..._data,
      email: user.email,
    };
    mutate(data);
  };
  return (
    <DashboardLayout>
      <Seo templateTitle='Change Password' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb crumbs={['/dashboard']} />
            <Typography variant='h2' className='font-bold'>
              Welcome Back
            </Typography>
          </div>
        </div>
      </header>
      <section className='relative flex min-h-screen flex-col justify-center overflow-x-hidden px-8 py-8 md:px-20 '>
        <div className='flex flex-col justify-center'>
          {/* Card */}
          <div className='flex flex-row items-center justify-center'>
            {/* Form and Message */}
            <div
              className={clsxm(
                'relative flex w-full flex-col  md:w-2/5',
                'max-w-[430px] md:h-[535px] md:min-w-[400px]',
                'border border-purple-500 px-7 py-7 md:py-10',
                'items-center rounded-3xl md:shadow-md'
              )}
            >
              {!isSuccess && (
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(changePassword)}
                    className='flex h-full w-full flex-col items-center space-y-10 md:justify-between md:space-y-0'
                  >
                    <div>
                      <Typography
                        variant='h4'
                        className='font-primary text-4xl leading-none'
                      >
                        Ubah Kata Sandi
                      </Typography>
                    </div>
                    <div className='flex w-full flex-col space-y-8 md:space-y-6'>
                      <PasswordInput
                        id='current_password'
                        label='Kata Sandi Sekarang'
                        placeholder='Kata Sandi Sekarang'
                        validation={{
                          required: 'Kata sandi sekarang wajib diisi',
                        }}
                      />
                      <PasswordInput
                        id='new_password'
                        label='Kata Sandi Baru'
                        placeholder='Kata Sandi Baru'
                        validation={{
                          required: 'Kata sandi Baru wajib diisi',
                        }}
                      />
                      <PasswordInput
                        id='re_password'
                        label='Konfirmasi Kata Sandi Baru'
                        placeholder='Konfirmasi Kata Sandi Baru'
                        validation={{
                          required: 'Konfirmasi kata sandi baru wajib diisi',
                        }}
                      />
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      isLoading={isLoading}
                    >
                      Simpan
                    </Button>
                  </form>
                </FormProvider>
              )}
              {isSuccess && (
                <div>
                  <div className='flex flex-col items-center space-y-6 md:space-y-10'>
                    <Typography
                      variant='h4'
                      className='font-primary text-3xl leading-none'
                    >
                      Ubah Kata Sandi
                    </Typography>
                    <div className='md:px-6'>
                      <Typography className='text-justify font-medium'>
                        Kata sandi akun Anda telah&nbsp;
                        <span className='text-success-600'>
                          berhasil diubah
                        </span>{' '}
                        dan direset untuk keamanan akun Anda. Kamu akan
                        diarahkan kembali ke halaman masuk. Jika Anda mengalami
                        masalah atau kesulitan dalam masuk ke akun Anda, jangan
                        ragu untuk menghubungi tim dukungan kami untuk meminta
                        bantuan
                      </Typography>
                    </div>
                    <ButtonLink
                      href='/dashboard'
                      variant='primary'
                      size='base'
                      className='w-full md:w-2/5'
                    >
                      Selesai
                    </ButtonLink>
                  </div>

                  <div className='hidden md:block'></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
