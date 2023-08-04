import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

type QuestionGenerateForm = {
  questions: number;
};

export default function QuestionGenerate() {
  const methods = useForm<QuestionGenerateForm>();
  const router = useRouter();
  const { handleSubmit } = methods;

  const onSubmit = (data: QuestionGenerateForm) => {
    router.push(`${router.asPath}&questions=${data.questions}`);
  };

  return (
    <div
      className={clsxm(
        'rounded-lg bg-white px-4 py-4 shadow-md hover:border hover:border-dashed hover:border-primary-500',
        'transform transition duration-300 ease-in-out'
      )}
    >
      <Typography variant='h2' className='text-center'>
        Generate Soal Ujian
      </Typography>
      <NextImage
        src='/images/tryout/typewritter.png'
        width={355}
        height={349}
        alt='Generate Soal Ujian'
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id='questions'
            label='Jumlah Soal'
            placeholder='Soal Ujian'
            validation={{
              required: 'Jumlah Soal tidak boleh kosong!',
            }}
          />
          <div className='flex items-center justify-center'>
            <Button className='mt-4' variant='primary' type='submit'>
              Generate
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
