import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import api from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { getAllQuestions } from '@/lib/cookies';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import Radio from '@/components/forms/Radio';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import useQuizStore from '@/store/useQuizStore';

import { ApiResponse } from '@/types/api';
import {
  ListDetailQuestionProps,
  ListQusetionProps,
  UserAnswer,
} from '@/types/entities/question';

export default withAuth(SoalPage, 'USER', true);
function SoalPage() {
  const router = useRouter();
  const { id, soal } = router.query;
  const methods = useForm();
  const { setAllQuestionsStore } = useQuizStore();

  const QuestionListApi = `/quiz_list/question-list?quiz_list_id=${id}`;

  const ListQuestions: ListQusetionProps[] = getAllQuestions();
  React.useEffect(() => {
    ListQuestions === null &&
      api.get<ApiResponse<ListQusetionProps[]>>(QuestionListApi).then((res) => {
        const ListQuestionData = res.data.data;
        setAllQuestionsStore(ListQuestionData);
      });
  }, [ListQuestions, QuestionListApi, setAllQuestionsStore]);

  const QuestionDetailApi = `/quiz_list/question-detail?question_id=${
    ListQuestions ? ListQuestions[Number(soal) - 1].question_id : ''
  }`;

  const { data: ListDetailQuestionData } = useQuery<
    ApiResponse<ListDetailQuestionProps>
  >([QuestionDetailApi]);

  async function SubmitQuizAnswers(answer: UserAnswer) {
    return await api.post<ApiResponse<UserAnswer>>(`/quiz_list/submit-answer`, {
      question_id: ListQuestions[Number(soal) - 1].question_id,
      answer: answer,
    });
  }

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
              <Typography variant='s2' className=''>
                Sisa Waktu : <span className='text-[#1A3FC4]'>01:23:42</span>
              </Typography>
            </div>

            {/* Soal */}
            <div className='flex flex-col gap-3 border-2 border-[#D3D6CC] p-3'>
              <Typography variant='s2' className=''>
                {ListDetailQuestionData?.data.question}
              </Typography>
              <div className='flex flex-col gap-2.5 p-3'>
                <FormProvider {...methods}>
                  {ListDetailQuestionData?.data.answers.map((answer, index) => (
                    <Controller
                      key={index}
                      name='answer'
                      control={methods.control}
                      defaultValue=''
                      render={({ field }) => (
                        <Radio
                          {...field}
                          label={answer.answer}
                          value={answer.answer}
                        />
                      )}
                    />
                  ))}
                </FormProvider>
              </div>
            </div>

            {/* Button */}
            <div className='flex justify-between'>
              {Number(soal) !== 1 && (
                <ButtonLink
                  leftIcon={FiArrowLeft}
                  href={`/dashboard/tryout/quiz/${id}?soal=${Number(soal) - 1}`}
                  aria-disabled={Number(soal) === 1 ? true : false}
                >
                  Soal Sebelumnya
                </ButtonLink>
              )}

              <Button variant='warning'>Ragu-ragu</Button>
              {Number(soal) < ListQuestions.length ? (
                <ButtonLink
                  rightIcon={FiArrowRight}
                  href={`/dashboard/tryout/quiz/${id}?soal=${Number(soal) + 1}`}
                  onClick={() => {
                    const FormData = methods.getValues();
                    const selectedAnswers = FormData.answer;
                    SubmitQuizAnswers(selectedAnswers);
                  }}
                >
                  Soal Berikutnya
                </ButtonLink>
              ) : (
                <Button>Submit</Button>
              )}
            </div>
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
                      ? ['border-primary-700 bg-primary-700 text-white']
                      : ['bg-transparent text-primary-500'],
                    question.status === 'answered' && 'bg-green-500'
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
