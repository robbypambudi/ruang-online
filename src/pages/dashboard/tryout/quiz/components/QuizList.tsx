import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';

import { QusetionsList } from '@/types/entities/question';

export default function QuizList({
  ListQuestions,
  id,
  soal,
}: {
  ListQuestions: QusetionsList[];
  id: string;
  soal: number;
}) {
  return (
    <div className='flex flex-col gap-3 rounded-xl bg-white shadow-xl'>
      <div className='flex gap-2.5 border-b-2 border-b-[#D3D6CC] p-3'>
        <Typography variant='h1'>Nomor Soal</Typography>
      </div>
      <div className='flex h-[420px] w-96 flex-wrap gap-2 overflow-y-auto p-3'>
        {ListQuestions.map((question, index) => (
          <ButtonLink
            href={`/dashboard/tryout/quiz/${id}?soal=${index + 1}`}
            key={index}
            className={clsxm(
              ['h-8 w-10 border-2 border-primary-500'],
              ['hover:border-primary-300 hover:bg-primary-300'],
              soal === index + 1
                ? ['!border-primary-700 !bg-primary-700 !text-white']
                : ['bg-transparent text-black'],
              question.is_answered &&
                'border-green-500 bg-green-500 text-black',
              question.is_checkpoint && '!border-warning-500 text-black'
            )}
          >
            {index + 1}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}
