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
import Radio from '@/components/forms/Radio';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import {
  DetailQuestions,
  ListQusetions,
  StartEndQuiz,
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

  const { mutate: endQuiz } = useMutationToast<void, StartEndQuiz>(
    useMutation((data) => {
      return api.post('/quiz_list/quiz-attempt', data);
    })
  );

  const dialog = useDialog();
  const openWarning = () => {
    dialog({
      title: 'Peringatan !!!',
      description: 'Apakah anda yakin ingin meninggalkan halaman ini?',
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    }).then(async () => {
      await endQuiz({
        quiz_list_id: id,
        start_attempt: false,
        end_attempt: true,
      });
      await destroyAllQuestions();
      router.push(`/dashboard/tryout`);
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

  const nextPage = ({ next_soal }: { next_soal?: number }) => {
    router.push(`/dashboard/tryout/quiz/${id}?soal=${next_soal}`);
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
              <div
                key={index}
                className='flex items-center overflow-hidden'
                onClick={async () =>
                  await saveAnswer(
                    {
                      question_id: ListQuestions[soal - 1].question_id,
                      answer: answer.answer,
                    },
                    {
                      onSuccess: async () => {
                        await changeQuestionStatusAnswerByIndex(
                          soal - 1,
                          true,
                          ListQuestions[soal - 1].is_checkpoint
                        );
                      },
                    }
                  )
                }
              >
                <Radio label={null} value={answer.answer} name='answer' />
                <Typography variant='s2' className='ml-3'>
                  <Latex macros={INITIAL_MACROS}>{answer.answer}</Latex>
                </Typography>
              </div>
            ))}
          </div>
        </div>
        {ListQuestions[soal - 1].is_answered && (
          <Button
            className='mt-4'
            variant='danger'
            onClick={async () => {
              await saveAnswer(
                {
                  question_id: ListQuestions[soal - 1].question_id,
                  answer: '',
                },
                {
                  onSuccess: async () => {
                    await changeQuestionStatusAnswerByIndex(
                      soal - 1,
                      false,
                      ListQuestions[soal - 1].is_checkpoint
                    );
                  },
                }
              );
            }}
          >
            Hapus Jawaban
          </Button>
        )}
        <div className='mt-4 flex justify-between'>
          <Button
            leftIcon={FiArrowLeft}
            disabled={soal === 1 ? true : false}
            onClick={() =>
              nextPage({
                next_soal: soal - 1,
              })
            }
          >
            Soal Sebelumnya
          </Button>

          <Button
            variant='warning'
            onClick={() => {
              checkpointAnswer({
                question_id: ListQuestions[soal - 1].question_id,
              });
              changeQuestionStatusAnswerByIndex(
                soal - 1,
                ListQuestions[soal - 1].is_answered,
                ListQuestions[soal - 1].is_checkpoint ? false : true
              );
            }}
          >
            {ListQuestions[soal - 1].is_checkpoint && 'Batal'} Ragu-ragu
          </Button>
          {soal < ListQuestions.length ? (
            <Button
              rightIcon={FiArrowRight}
              onClick={() =>
                nextPage({
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
