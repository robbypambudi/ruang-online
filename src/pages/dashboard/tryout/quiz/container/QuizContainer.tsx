import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import * as React from 'react';

import { destroyAllQuestions } from '@/lib/localstorage';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

import Countdown from '@/pages/dashboard/tryout/quiz/components/Countdown';
import Quiz from '@/pages/dashboard/tryout/quiz/components/Quiz';
import QuizList from '@/pages/dashboard/tryout/quiz/components/QuizList';

import { ApiResponse } from '@/types/api';
import { DetailQuestions, QusetionsList } from '@/types/entities/question';

export default function QuizContainer({
  ListQuestions,
}: {
  ListQuestions: QusetionsList[];
}) {
  const router = useRouter();

  const { id, soal } = router.query as { id: string; soal: string };

  const url = queryString.stringifyUrl({
    url: '/quiz_list/question-detail',
    query: { question_id: ListQuestions[parseInt(soal) - 1].question_id },
  });

  const { data: ListDetailQuestionData } = useQuery<
    ApiResponse<DetailQuestions>
  >([url], {
    keepPreviousData: true,
  });

  //#region  //*=========== Time Remaining ===========
  const hms = ListDetailQuestionData?.data.time_left.split(':') || [];
  const remainingTime = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
  //#endregion  //*======== Time Remaining ===========

  const onTimeOut = async () => {
    destroyAllQuestions();
    router.push('/dashboard/tryout', undefined, { shallow: true });
  };

  if (!ListDetailQuestionData || remainingTime <= 0) {
    return (
      <div>
        <header className='flex justify-between'>
          <div className='flex items-center gap-3'>
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
        <main className='py-6'>
          <Typography>
            Waktu pengerjaan telah habis, silahkan klik tombol selesai untuk
            kembali ke halaman tryout
          </Typography>
          <Button
            className='mt-4'
            variant='primary'
            onClick={() => {
              onTimeOut();
            }}
          >
            Selesai
          </Button>
        </main>
      </div>
    );
  }

  return (
    <>
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
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

      <main className='py-6'>
        <section className='flex flex-col justify-between gap-6 rounded-xl p-3 lg:flex-row'>
          <div className='h-fit w-full space-y-2 rounded-md bg-white p-3 shadow-lg'>
            <div className='flex items-center justify-between '>
              <Typography
                variant='h1'
                className='flex gap-2.5 rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
              >
                Soal {soal} - {ListDetailQuestionData.data.name}
              </Typography>
              <Countdown remainingTime={remainingTime} />
            </div>

            {ListDetailQuestionData && (
              <Quiz
                ListDetailQuestionData={ListDetailQuestionData.data}
                ListQuestions={ListQuestions}
                soal={parseInt(soal)}
                id={id}
              />
            )}
          </div>

          {ListQuestions && (
            <QuizList
              ListQuestions={ListQuestions}
              id={id}
              soal={parseInt(soal)}
            />
          )}
        </section>
      </main>
    </>
  );
}
