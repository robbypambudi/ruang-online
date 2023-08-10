import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Latex from 'react-latex-next';

import api from '@/lib/axios';
import {
  changeQuestionStatusAnswerByIndex,
  destroyAllQuestions,
} from '@/lib/cookies';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Radio from '@/components/forms/Radio';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import {
  DetailQuestions,
  ListQusetions,
  UserAnswer,
  UserCheckpoint,
} from '@/types/entities/question';

type QuizListProps = {
  ListQuestions: ListQusetions[];
  ListDetailQuestionData: DetailQuestions;
  soal: number;
  id: string;
} & React.ComponentPropsWithoutRef<'div'>;

const INITIAL_MACROS = { '\\f': '#1f(#2)' };

export default function QuizList({
  ListQuestions,
  ListDetailQuestionData,
  soal,
  id,
}: QuizListProps) {
  const router = useRouter();
  const methods = useForm<UserAnswer>();

  const dialog = useDialog();
  const openWarning = () => {
    dialog({
      title: 'Peringatan !!!',
      description: 'Apakah anda yakin ingin meninggalkan halaman ini?',
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    }).then(() => {
      destroyAllQuestions();
      router.push(`/dashboard/tryout/${id}`);
    });
  };

  const { mutate: saveAnswer } = useMutationToast(
    useMutation((data: UserAnswer) =>
      api.post<ApiResponse<UserAnswer>>(`/quiz_list/submit-answer`, data)
    ),
    {
      loading: 'Menyimpan jawaban...',
      success: 'Jawaban berhasil disimpan',
      error: 'Gagal menyimpan jawaban',
    }
  );

  const { mutate: checkpointAnswer } = useMutationToast(
    useMutation((data: UserCheckpoint) =>
      api.post<ApiResponse<UserCheckpoint>>(`/quiz_list/checkpoint`, data)
    ),
    {
      loading: 'Menandai soal...',
      success: 'Berhasil menandai soal',
      error: 'Gagal menandai soal',
    }
  );

  const { getValues } = methods;

  const onSubmit = ({ next_soal }: { next_soal?: number }) => {
    const data = getValues();
    saveAnswer(data, {
      onSuccess: async () => {
        await changeQuestionStatusAnswerByIndex(
          soal - 1,
          data.answer ? 'answered' : 'not_answered'
        );
        router.push(`/dashboard/tryout/quiz/${id}?soal=${next_soal}`);
      },
    });
  };

  const onDone = () => {
    openWarning();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div className='flex max-w-[760px] flex-col gap-3 border-2 border-[#D3D6CC] p-3'>
          <Typography variant='s2' className=''>
            <Latex macros={INITIAL_MACROS}>
              {ListDetailQuestionData?.question}
            </Latex>
          </Typography>
          <div className='flex flex-col gap-2.5 p-3'>
            {ListDetailQuestionData.answers.map((answer, index) => (
              <div key={index} className='flex items-center overflow-hidden'>
                <Radio label={null} value={answer.answer} name='answer' />
                <Typography variant='s2' className='ml-3'>
                  <Latex macros={INITIAL_MACROS}>{answer.answer}</Latex>
                </Typography>
              </div>
            ))}
            <Input
              id='question_id'
              type='hidden'
              value={ListQuestions[soal - 1].question_id}
              label={null}
            />
          </div>
        </div>
        <div className='mt-4 flex justify-between'>
          <Button
            leftIcon={FiArrowLeft}
            disabled={soal === 1 ? true : false}
            onClick={() =>
              onSubmit({
                next_soal: soal - 1,
              })
            }
          >
            Soal Sebelumnya
          </Button>

          <Button
            variant='warning'
            onClick={() =>
              checkpointAnswer({ question_id: ListQuestions[soal].question_id })
            }
          >
            Ragu-ragu
          </Button>
          {soal < ListQuestions.length ? (
            <Button
              rightIcon={FiArrowRight}
              onClick={() =>
                onSubmit({
                  next_soal: soal + 1,
                })
              }
            >
              Soal Berikutnya
            </Button>
          ) : (
            <Button onClick={onDone}>Submit</Button>
          )}
        </div>
      </FormProvider>
    </div>
  );
}
