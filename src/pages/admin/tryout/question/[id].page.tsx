import { useMutation, useQuery } from '@tanstack/react-query';
import { matchSorter } from 'match-sorter';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import Latex from 'react-latex-next';

import 'katex/dist/katex.min.css';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useDialog from '@/hooks/useDialog';

import Breadcrumb from '@/components/Breadcrumb';
import IconButton from '@/components/buttons/IconButton';
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
  is_correct: number;
};

export type DetailSoal = {
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

export default withAuth(DetailSoalPage, ['admin_tryout.index']);
function DetailSoalPage() {
  const router = useRouter();
  const methods = useForm<SearchForm>();
  const dialog = useDialog();

  const { id, name: quizName, status, is_default } = router.query;

  const { watch } = methods;

  const url = `/admin/quiz_list/question-answer?quiz_list_id=${id}`;

  const { data: queryData, refetch } = useQuery<ApiResponse<DetailSoal[]>>(
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

  const { mutate } = useMutationToast<void, DetailSoal>(
    useMutation((data) => {
      return api.delete(`/admin/quiz_list?question_id=${data.id}`);
    }),
    {
      success: 'Berhasil menghapus soal',
    }
  );

  const openWarning = (data: DetailSoal) => {
    dialog({
      title: 'Apakah Anda Yakin?',
      description: 'Pertanyaan ini akan dihapus dan tidak dapat dikembalikan!',
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    }).then(() =>
      mutate(data, {
        onSuccess: () => {
          refetch();
        },
      })
    );
  };

  return (
    <DashboardLayout>
      <Seo templateTitle='Detail Soal' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/${id}`}
            icon={FiArrowLeft}
            iconClassName='text-gray-500'
          />
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={[
                '/admin',
                '/admin/tryout',
                `/admin/tryout/detail-tryout`,
                `/admin/tryout/question`,
              ]}
              id={id as string}
            />
            <Typography variant='h2' className='font-bold'>
              Detail Soal
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
              {status === 'true' ? 'Aktif' : 'Belum Aktif'}
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
            {listSoal.map((item: DetailSoal, index: number) => {
              const {
                question,
                type,
                name,
                answers,
                category,
                id: idSoal,
              } = item;

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
                          const { answer, is_correct } = item;
                          return (
                            <li
                              key={index}
                              className={
                                is_correct > 0
                                  ? 'font-semibold text-green-500'
                                  : ''
                              }
                            >
                              <Latex macros={INITIAL_MACROS}>{answer}</Latex>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    <div className='flex w-full justify-end'>
                      <IconLink
                        href={`/admin/tryout/question/edit/${idSoal}?name=${quizName}&status=${status}&quiz_id=${id}&is_default=${is_default}`}
                        icon={BiPencil}
                        iconClassName='text-gray-500'
                        className='shadow-[0_2px_7px_rgb(0,0,0,0.15)]'
                      />
                      <IconButton
                        className='ml-2 shadow-[0_2px_7px_rgb(0,0,0,0.15)]'
                        icon={BiTrash}
                        variant='danger'
                        onClick={() => openWarning(item)}
                      />
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
