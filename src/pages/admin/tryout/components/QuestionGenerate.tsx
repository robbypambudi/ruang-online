import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '@/components/forms/Input';
import Typography from '@/components/typography/Typography';

type QuestionGenerateProps = {
  name: string;
};

export default function QuestionGenerate({ name }: QuestionGenerateProps) {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <Typography>Generate Soal Ujian</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input id='questions' label='Jumlah Soal' defaultValue={name} />
          </form>
        </FormProvider>
      </div>
    </>
  );
}
