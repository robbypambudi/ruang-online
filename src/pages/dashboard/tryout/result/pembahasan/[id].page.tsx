import { useQuery } from '@tanstack/react-query';
import { matchSorter } from 'match-sorter';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import Latex from 'react-latex-next';

import 'katex/dist/katex.min.css';

import clsxm from '@/lib/clsxm';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import NextImageQuizLightbox from '@/components/NextImageQuizLightBox';
import Seo from '@/components/Seo';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { QUESTION_TYPE_NAME } from '@/types/entities/question';

export type DetailAnswer = {
  answer: string;
  is_correct: boolean;
  is_user_answered: boolean;
};

export type DetailPembahasanSoal = {
  id: string;
  question: string;
  type: string;
  category: string;
  image_url: string;
  index: number;
  name: string;
  answers: DetailAnswer[];
};

const INITIAL_MACROS = { '\\f': '#1f(#2)' };

type SearchForm = {
  search: string;
};

export default withAuth(DetailPembahasanSoal, ['tryout.index']);
function DetailPembahasanSoal() {
  const router = useRouter();
  const methods = useForm<SearchForm>();

  const { id, name: quizName } = router.query;

  const { watch } = methods;

  const url = `/quiz_list/user/detail?quiz_list_id=${id}`;

  const { data: queryData } = useQuery<ApiResponse<DetailPembahasanSoal[]>>(
    [url],
    {
      keepPreviousData: true,
    }
  );

  const search = watch('search');
  const listSoal = React.useMemo(() => {
    return matchSorter(queryData?.data ?? [], search ?? '', {
      keys: ['question', 'category', 'name'],
      baseSort: (a, b) => (a.item.name < b.item.name ? 1 : -1),
      keepDiacritics: true,
    });
  }, [queryData, search]);

  return (
    <DashboardLayout>
      <Seo templateTitle='Detail Soal' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/dashboard/tryout/result/${id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={[
                '/dashboard',
                '/dashboard/tryout',
                '/dashboard/tryout/result/pembahasan',
              ]}
              id={id as string}
            />
            <Typography variant='h2' className='font-bold'>
              Pembahasan Soal
            </Typography>
          </div>
        </div>
      </header>
      <main className='mt-6'>
        <section>
          <div className='space-y-6 rounded-xl bg-white px-6 py-4 shadow-[0_2px_8px_rgb(0,0,0,0.15)]'>
            <Typography
              className='w-fit rounded-xl bg-primary-200 px-8 py-3 text-primary-500'
              variant='h1'
              font='montserrat'
            >
              Geosentric ITS 2023 -{' '}
            </Typography>
            <Typography
              className='pb-1 text-center text-5xl font-bold lg:text-left'
              variant='h1'
              font='montserrat'
            >
              {quizName}
            </Typography>
            <FormProvider {...methods}>
              <input
                className='w-[340px] rounded-md bg-white shadow-lg'
                type='text'
                placeholder='Cari Soal'
                {...methods.register('search')}
              />
            </FormProvider>
          </div>
        </section>

        <section className='mt-6'>
          <div>
            {listSoal.map((item: DetailPembahasanSoal, index: number) => {
              const { question, type, name, answers, category } = item;

              const typeSoal =
                QUESTION_TYPE_NAME[type as keyof typeof QUESTION_TYPE_NAME];

              return (
                <div
                  key={index}
                  className='mb-4 rounded-xl bg-white p-3 shadow-[0_2px_8px_rgb(0,0,0,0.15)]'
                >
                  <div className='rounded-xl border border-outline p-4'>
                    <div className='flex w-full justify-between'>
                      <div>
                        {
                          // Compare data between user answer and correct answer
                          answers.every(
                            (item) => item.is_correct === item.is_user_answered
                          ) ? (
                            <div className='flex items-center gap-2'>
                              <div className='h-2 w-2 rounded-full bg-green-500'></div>
                              <Tag color='success' size='sm'>
                                Benar
                              </Tag>
                            </div>
                          ) : (
                            <div className='flex items-center gap-2'>
                              <div className='h-2 w-2 rounded-full bg-red-500'></div>
                              <Tag color='danger' size='sm'>
                                Salah
                              </Tag>
                            </div>
                          )
                        }
                        <Typography variant='h1' font='poppins'>
                          Soal No {index + 1} - {name}
                        </Typography>
                      </div>
                      <div className=''>
                        <Typography variant='b3' font='poppins'>
                          {typeSoal}
                        </Typography>
                        <Tag color='primary' size='sm'>
                          {category}
                        </Tag>
                      </div>
                    </div>
                    <Typography className='mt-2' variant='b1' font='montserrat'>
                      <Latex macros={INITIAL_MACROS}>{question}</Latex>
                    </Typography>

                    {item.image_url && (
                      <div>
                        <NextImageQuizLightbox
                          src={item.image_url}
                          alt='soal'
                          width={420}
                          height={200}
                          className='w-92'
                        />
                      </div>
                    )}
                    <div className='mt-4 flex flex-col'>
                      <ol
                        className={clsxm('list-inside space-y-1', [
                          type === 'multiple_choice_single_answer' ||
                          type === 'multiple_choice_multiple_answer'
                            ? 'list-[upper-alpha]'
                            : '',
                        ])}
                      >
                        {answers.map((item: DetailAnswer, index: number) => {
                          const { answer, is_correct, is_user_answered } = item;
                          return (
                            <li
                              key={index}
                              className={clsxm(
                                is_correct && 'font-semibold !text-green-500',
                                is_user_answered && 'font-semibold text-red-500'
                              )}
                            >
                              <Latex macros={INITIAL_MACROS}>{answer}</Latex>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
