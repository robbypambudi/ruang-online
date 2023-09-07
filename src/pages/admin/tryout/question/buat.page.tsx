import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import QuestionGenerate from '@/pages/admin/tryout/question/components/QuestionGenerate';
import QuestionsForm from '@/pages/admin/tryout/question/components/QuestionsForm';

import { ApiResponse } from '@/types/api';
import { QuestionType } from '@/types/entities/question';

export const QuestionTypeContext = React.createContext<QuestionType[]>([]);

export default withAuth(BuatTryoutAdmin, ['admin_tryout.index']);
function BuatTryoutAdmin() {
  const router = useRouter();

  const { data } = useQuery<ApiResponse<QuestionType[]>>(['/question_type'], {
    keepPreviousData: true,
  });

  const { quiz_list_id, name, questions, category, is_default } = router.query;

  if (
    router.isReady &&
    !quiz_list_id &&
    !name &&
    !questions &&
    !category &&
    !is_default &&
    !data?.data
  ) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Typography variant='h1'>Loading</Typography>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Seo templateTitle='Buat Tryout' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/${quiz_list_id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={['/admin', '/admin/tryout', '/admin/tryout/buat']}
            />
            <Typography variant='h2' className='font-bold'>
              Buat Tryout
            </Typography>
          </div>
        </div>
      </header>

      <main>
        <section className='flex flex-wrap items-center justify-between rounded-xl bg-white p-2.5 shadow-lg lg:flex-row'>
          <div className='flex flex-col justify-between gap-4 px-5 py-3'>
            <Typography
              className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
              variant='h3'
              font='montserrat'
            >
              Geosentric ITS 2023
            </Typography>
            <Typography
              className='text-center'
              variant='j1'
              as='h1'
              font='montserrat'
            >
              {name}
            </Typography>
          </div>
        </section>

        <section>
          <QuestionTypeContext.Provider value={data?.data ?? []}>
            {!questions ? (
              <div className='mt-8 flex items-center justify-center'>
                <QuestionGenerate />
              </div>
            ) : (
              <QuestionsForm
                size={parseInt(questions as string)}
                quiz_list_id={quiz_list_id as string}
                category={category as string}
                is_default={is_default as string}
              />
            )}
          </QuestionTypeContext.Provider>
        </section>
      </main>
    </DashboardLayout>
  );
}
