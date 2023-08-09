import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useDialog from '@/hooks/useDialog';

import Breadcrumb from '@/components/Breadcrumb';
import IconButton from '@/components/buttons/IconButton';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { QUESTION_TYPE_NAME } from '@/types/entities/question';

export type DetailAnswer = {
  answer: string;
  is_correct: boolean;
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

export default function DetailSoal() {
  const router = useRouter();
  const { id, name: quizName, status } = router.query;
  const dialog = useDialog();

  const url = `/admin/quiz_list/question-answer?quiz_list_id=${id}`;

  const { data: detailSoal, refetch } = useQuery<ApiResponse<DetailSoal[]>>([
    url,
  ]);

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
            href='/dashboard'
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
          </div>
        </section>
        <section className='mt-6'>
          <div>
            {detailSoal?.data.map((item: DetailSoal, index: number) => {
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
                        <Typography
                          className='mt-2'
                          variant='b1'
                          font='montserrat'
                        >
                          {question}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant='b3' font='poppins'>
                          {typeSoal}
                        </Typography>
                        <Typography
                          className='text-right'
                          variant='b3'
                          font='poppins'
                        >
                          {category}
                        </Typography>
                      </div>
                    </div>

                    {item.image_url && (
                      <div>
                        <NextImage
                          src='https://picsum.photos/300/200'
                          alt='soal'
                          width={300}
                          height={200}
                          className='w-72 rounded-xl'
                        />
                      </div>
                    )}
                    <div className='flex flex-col gap-4'>
                      <ol
                        className={`list-inside ${
                          type === 'multiple_choice_single_answer' ||
                          type === 'multiple_choice_multiple_answer'
                            ? 'list-[upper-alpha]'
                            : ''
                        }`}
                      >
                        {answers.map((item: DetailAnswer, index: number) => {
                          const { answer, is_correct } = item;
                          return (
                            <li
                              key={index}
                              className={
                                is_correct ? 'font-semibold text-green-500' : ''
                              }
                            >
                              {answer}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                    <div className='flex w-full justify-end'>
                      <IconLink
                        href={`/admin/tryout/question/edit/${idSoal}?name=${quizName}&status=${status}&quiz_id=${id}`}
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
