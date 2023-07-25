'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import api from '@/lib/axios';
import { setToken } from '@/lib/cookies';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import PrimaryLink from '@/components/links/PrimaryLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { MeResponse } from '@/types/entities/user';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const methods = useForm<LoginForm>();
  const router = useRouter();
  const login = useAuthStore.useLogin();
  const { handleSubmit } = methods;

  const { mutate } = useMutationToast<void, LoginForm>(
    useMutation((data) => {
      let tempToken: string;
      return api
        .post('/login_user', data)
        .then((res) => {
          const { token } = res.data.data;
          tempToken = token;
          setToken(token);

          return api.get<ApiResponse<MeResponse>>('/me');
        })
        .then((res) =>
          login({
            token: tempToken,
            permissions: res.data.data.permissions.routes,
            role: res.data.data.permissions.role,
            role_id: res.data.data.permissions.role_id,
            name: res.data.data.name,
            email: res.data.data.email,
            event: {
              is_geolympic: res.data.data.is_geolympic,
            },
          })
        );
    })
  );

  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: () => {
        router.replace('/dashboard');
      },
    });
  };
  return (
    <div className='relative flex min-h-screen items-center justify-center bg-[#24202D]'>
      <Seo templateTitle='Login' />
      <div className='grid grid-cols-1 gap-24 rounded-2xl border border-white px-12 py-12 md:grid-cols-2'>
        <div className='hidden md:block'>
          <NextImage
            src='/images/logo-geosentric.png'
            width='340'
            height='340'
            alt='Logo Geosentric'
          />
          <Typography
            variant='j2'
            as='h1'
            className='mt-4 text-center font-bold'
            color='white'
          >
            Geosentric 2023
          </Typography>
        </div>
        <div className=''>
          <div>
            <PrimaryLink href='/' variant='primary'>
              Back
            </PrimaryLink>
          </div>
          <Typography variant='h2' className='mt-4 font-bold' color='white'>
            Sign in to your account
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
              <Input
                type='email'
                id='email'
                label='Email'
                labelClassName='text-white'
                validation={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                }}
                placeholder='Enter your email'
              />
              <PasswordInput
                type='password'
                id='password'
                label='Password'
                labelClassName='text-white'
                validation={{
                  required: 'Password is required',
                }}
                placeholder='Enter your password'
              />
              <Button type='submit' variant='primary' className='w-full'>
                Login
              </Button>
              <div>
                <Typography color='white'>
                  Don&apos;t have an account?{' '}
                  <PrimaryLink href='/register' variant='primary'>
                    Register
                  </PrimaryLink>
                </Typography>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
