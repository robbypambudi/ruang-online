import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';
import { getAllQuestions } from '@/lib/cookies';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import Countdown from '@/pages/dashboard/tryout/quiz/components/Countdown';
import QuizList from '@/pages/dashboard/tryout/quiz/components/QuizList';

import { ApiResponse } from '@/types/api';
import { DetailQuestions, ListQusetions } from '@/types/entities/question';

export default withAuth(SoalPage, 'USER');
function SoalPage() {
  const router = useRouter();

  const { id, soal } = router.query as { id: string; soal: string };

  const ListQuestions: ListQusetions[] = getAllQuestions();

  const url = queryString.stringifyUrl({
    url: '/quiz_list/question-detail',
    query: { question_id: ListQuestions[parseInt(soal) - 1].question_id },
  });

  const { data: ListDetailQuestionData } = useQuery<
    ApiResponse<DetailQuestions>
  >([url], {
    keepPreviousData: true,
  });

  if (!ListQuestions || !ListDetailQuestionData) {
    return <div>Loading...</div>;
  }

  const hms = ListDetailQuestionData.data.time_left.split(':');
  const remainingTime = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];

  return (
    <DashboardLayout>
      <Seo templateTitle='Quiz' />

      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href='/dashboard'
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={[
                '/dashboard',
                '/dashboard/tryout',
                '/dashboard/tryout/quiz/soal',
              ]}
            />
            <Typography variant='h2' className='font-bold'>
              Quiz
            </Typography>
          </div>
        </div>
      </header>

      <div className='py-6 '>
        <div className='flex flex-col gap-6 rounded-xl p-3 lg:flex-row'>
          {/* SOAL */}
          <div className='flex w-full flex-col gap-6 rounded-xl bg-white px-5 py-3 shadow-xl'>
            {/* Nomoer Soal dan sisa waktu */}
            <div className='flex h-auto w-full items-center justify-between'>
              <Typography
                variant='h1'
                className='flex gap-2.5 rounded-xl bg-[#D8E7FF] px-8 py-3 text-[#1A3FC4]'
              >
                Soal {soal}
              </Typography>
              <Countdown remainingTime={remainingTime} />
            </div>

            {/* Soal */}
            {ListDetailQuestionData && (
              <QuizList
                ListDetailQuestionData={ListDetailQuestionData.data}
                ListQuestions={ListQuestions}
                soal={parseInt(soal)}
                id={id}
              />
            )}
          </div>

          {/* List soal */}
          <div className='flex flex-col gap-3 rounded-xl bg-white shadow-xl'>
            <div className='flex gap-2.5 border-b-2 border-b-[#D3D6CC] p-3'>
              <Typography variant='h1'>Nomor Soal</Typography>
            </div>

            <div className='flex h-96 w-96 flex-wrap gap-3 px-4 py-10'>
              {ListQuestions.map((question, index) => (
                <ButtonLink
                  href={`/dashboard/tryout/quiz/${id}?soal=${index + 1}`}
                  key={index}
                  className={clsxm(
                    ['h-14 w-14 border-2 border-primary-500'],
                    ['hover:border-primary-300 hover:bg-primary-300'],
                    Number(soal) === index + 1
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
        </div>
      </div>
    </DashboardLayout>
  );
}
