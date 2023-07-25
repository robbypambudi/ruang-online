'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import api from '@/lib/axios';
import useMutationToast from '@/hooks//toast/useMutationToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import PrimaryLink from '@/components/links/PrimaryLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

type RegisterForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};
export default function LoginPage() {
  const router = useRouter();
  const methods = useForm<RegisterForm>();
  const { handleSubmit } = methods;

  const { mutate } = useMutationToast<void, RegisterForm>(
    useMutation((data) => {
      return api.post('/create_user', data);
    })
  );

  const onSubmit = (data: RegisterForm) => {
    mutate(data, {
      onSuccess: () => router.push('/login'),
    });
  };
  return (
    <div className='relative flex min-h-screen items-center justify-center bg-[#24202D]'>
      <Seo templateTitle='Register' />

      <div className='grid grid-cols-1 gap-24 rounded-2xl border border-white px-12 py-12 md:grid-cols-2'>
        <div className='my-auto hidden md:block'>
          <NextImage
            src='/images/logo-geosentric.png'
            width='340'
            height='340'
            alt='Logo Geosentric'
          />
          <Typography
            variant='j2'
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
          <Typography variant='h1' className='mt-4 font-bold' color='white'>
            Create an account
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
              <Input
                type='text'
                id='name'
                label='Name'
                labelClassName='text-white'
                validation={{
                  required: 'name is required',
                }}
                placeholder='Enter your name'
              />
              <Input
                type='text'
                id='username'
                label='Username'
                labelClassName='text-white'
                validation={{
                  required: 'Username is required',
                }}
                placeholder='Enter your Username'
              />
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
                <Typography variant='s3' color='white'>
                  Create Account
                </Typography>
              </Button>
              <div>
                <Typography color='white'>
                  Already have an account?{' '}
                  <PrimaryLink href='/login' variant='primary'>
                    Login
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
