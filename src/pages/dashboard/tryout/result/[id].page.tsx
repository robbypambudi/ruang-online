import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { ResultQuiz } from '@/types/entities/result-quiz';

export default function ResultPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: queryData } = useQuery<ApiResponse<ResultQuiz>>(
    [`/quiz_list/grade?quiz_list_id=${id}`],
    {
      keepPreviousData: true,
    }
  );

  if (!queryData) {
    return null;
  }

  return (
    <DashboardLayout>
      <Seo templateTitle='Result' />
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
                '/dashboard/tryout/result',
              ]}
              id={id as string}
            />
            <Typography variant='h2' className='font-bold'>
              Result
            </Typography>
          </div>
        </div>
      </header>

      <main>
        <section className='flex flex-col-reverse items-center justify-between rounded-xl bg-white p-2.5 shadow-lg lg:flex-row'>
          <div className='flex flex-col justify-between gap-y-10 px-5 py-3'>
            <Typography
              className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
              variant='h1'
              font='montserrat'
            >
              Geosentric ITS 2023
            </Typography>
            <Typography
              className='text-center text-5xl font-bold lg:text-left'
              variant='h1'
              font='montserrat'
            >
              {queryData.data.quiz_name}
            </Typography>

            <div className='flex gap-3'>
              <div className='flex flex-col items-start justify-center gap-3'>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography variant='h2' font='montserrat'>
                    Total Score
                  </Typography>
                  <Typography variant='h2' font='montserrat'>
                    :{' '}
                    {queryData.data.grade !== null
                      ? queryData.data.grade
                      : 'Belum Tersedia'}
                  </Typography>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography variant='h2' font='montserrat'>
                    Jawaban Benar
                  </Typography>
                  <Typography variant='h2' font='montserrat'>
                    :{' '}
                    {queryData.data.correct_answer !== null
                      ? queryData.data.correct_answer
                      : 'Belum Tersedia'}
                  </Typography>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography variant='h2' font='montserrat'>
                    Jawaban Salah
                  </Typography>
                  <Typography variant='h2' font='montserrat'>
                    :{' '}
                    {queryData.data.incorrect_answer !== null
                      ? queryData.data.incorrect_answer
                      : 'Belum Tersedia'}
                  </Typography>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography variant='h2' font='montserrat'>
                    Waktu Ujian
                  </Typography>
                  <Typography variant='h2' font='montserrat'>
                    :{' '}
                    {queryData.data.total_spent !== null
                      ? queryData.data.total_spent + ' Menit'
                      : 'Belum Tersedia'}
                  </Typography>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Typography variant='h2' font='montserrat'>
                    Soal Terjawab
                  </Typography>
                  <Typography variant='h2' font='montserrat'>
                    :{' '}
                    {queryData.data.question_attempt !== null
                      ? queryData.data.question_attempt
                      : 'Belum Tersedia'}
                  </Typography>
                </div>
                {/* <ButtonLink
                  href={`/dashboard/tryout/result/pembahasan/${id}`}
                  className='shadow-lg'
                  variant='danger'
                  rightIcon={RiFilePaper2Line}
                >
                  Lihat Pembahasan
                </ButtonLink> */}
              </div>
            </div>
          </div>
          <div>
            <NextImage
              src='/images/dashboard/detail-tryout.png'
              width={600}
              height={413.415}
              alt='Tryout Detail'
            />
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
