import { NextRouter, useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowLeft, FiRepeat, FiSave } from 'react-icons/fi';
import Latex from 'react-latex-next';

import 'katex/dist/katex.min.css';

import {
  changeQuestionStatusAnswerByIndex,
  destroyAllQuestions,
} from '@/lib/localstorage';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import Radio from '@/components/forms/Radio';
import Typography from '@/components/typography/Typography';

import { useQuestionStore } from '@/pages/dashboard/tryout/quiz/hooks/useQuestionStore';

import { DetailQuestions, QusetionsList } from '@/types/entities/question';

type QuizProps = {
  ListQuestions: QusetionsList[];
  ListDetailQuestionData: DetailQuestions;
  soal: number;
  id: string;
} & React.ComponentPropsWithoutRef<'div'>;

const INITIAL_MACROS = { '\\f': '#1f(#2)' };

type FormValues = {
  answer: string;
};

export default function Quiz({
  ListQuestions,
  ListDetailQuestionData,
  soal,
  id,
}: QuizProps) {
  const router = useRouter();

  if (!router.isReady) null;

  return (
    <div className=''>
      <div className='flex flex-col gap-3 rounded-md border-2 border-outline-base p-3'>
        <Typography variant='s2' className=''>
          <Latex macros={INITIAL_MACROS}>
            {ListDetailQuestionData?.question}
          </Latex>
        </Typography>
        {ListDetailQuestionData && ListQuestions && (
          <QuizForm
            listAnswer={ListDetailQuestionData.answers}
            userAnswer={ListQuestions[soal - 1]}
            soal={soal}
            id={id}
            router={router}
            countQuestion={ListQuestions.length}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Use this component to render the form of the quiz
 *
 */

function QuizForm({
  userAnswer,
  listAnswer,
  soal,
  id,
  router,
  countQuestion,
}: {
  userAnswer: QusetionsList;
  listAnswer: DetailQuestions['answers'];
  soal: number;
  id: string;
  router: NextRouter;
  countQuestion: number;
}) {
  const dialog = useDialog();
  const methods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      answer: '',
    },
  });
  const { saveAnswer, startEndQuestion, saveCheckpoint } = useQuestionStore();

  const { watch, reset } = methods;
  const currentAnswer = watch('answer') || '';

  React.useEffect(() => {
    const setDefaultAnswer = async () => {
      if (
        typeof userAnswer.is_answered === 'string' &&
        userAnswer.is_answered !== ''
      ) {
        reset({
          answer: userAnswer.is_answered,
        });
      } else {
        reset({
          answer: '',
        });
      }
    };
    if (router.isReady) {
      setDefaultAnswer();
    }
  }, [soal, userAnswer.is_answered, router, reset]);

  const confirmationSubmitDialog = React.useCallback(() => {
    dialog({
      title: 'Peringatan !!!',
      description: (
        <>
          <Typography variant='s3'>
            Apakah anda yakin ingin mengakhiri sesi tryout ini?
          </Typography>
        </>
      ),
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    }).then(async () => {
      startEndQuestion(
        {
          quiz_list_id: id,
          start_attempt: false,
          end_attempt: true,
        },
        {
          onSuccess: () => {
            destroyAllQuestions();
            router.push(`/dashboard/tryout`, undefined, { shallow: true });
          },
        }
      );
    });
  }, [dialog, startEndQuestion, id, router]);

  const nextPage = async ({ next_soal }: { next_soal: number }) => {
    if (currentAnswer && currentAnswer !== userAnswer.is_answered) {
      await saveAnswer(
        {
          id: userAnswer.question_id,
          answer: currentAnswer,
        },
        {
          onSuccess: async () => {
            changeQuestionStatusAnswerByIndex({
              index: soal - 1,
              is_checkpoint: userAnswer.is_checkpoint,
              is_answered: currentAnswer ? currentAnswer : '',
            });
            router.push(`/dashboard/tryout/quiz/${id}?soal=${next_soal}`);
          },
        }
      );
    } else {
      await router.push(`/dashboard/tryout/quiz/${id}?soal=${next_soal}`);
    }
  };

  const deleteAnswer = () => {
    saveAnswer(
      {
        id: userAnswer.question_id,
        answer: null,
      },
      {
        onSuccess: async () => {
          changeQuestionStatusAnswerByIndex({
            index: soal - 1,
            is_checkpoint: userAnswer.is_checkpoint,
            is_answered: '',
          });
          router.push(router.asPath);
        },
      }
    );
  };

  const setCheckpoint = () => {
    saveCheckpoint({
      question_id: userAnswer.question_id,
    });
    changeQuestionStatusAnswerByIndex({
      index: soal - 1,
      is_checkpoint: !userAnswer.is_checkpoint,
      is_answered: userAnswer.is_answered,
    });
    router.push(router.asPath);
  };

  const onDone = () => {
    confirmationSubmitDialog();
  };

  return (
    <FormProvider {...methods}>
      <div className='flex !select-none flex-col gap-2.5 p-3'>
        {listAnswer.map((ans, index) => (
          <div key={index} className='flex items-center overflow-hidden'>
            <Radio label={null} value={ans.id} name='answer' />
            <Typography variant='s2' className='ml-3'>
              <Latex macros={INITIAL_MACROS}>{ans.answer || ''}</Latex>
            </Typography>
          </div>
        ))}
      </div>
      {userAnswer.is_answered && (
        <div className='flex justify-between'>
          <Button
            className='mt-4'
            variant='danger'
            onClick={() => deleteAnswer()}
          >
            Hapus Jawaban
          </Button>
          <Button
            className='mt-4'
            leftIcon={FiRepeat}
            onClick={() => router.replace(router.asPath)}
          >
            Refresh
          </Button>
        </div>
      )}
      <div className='mt-4 flex justify-between'>
        <Button
          leftIcon={FiArrowLeft}
          rightIcon={FiSave}
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
            setCheckpoint();
          }}
        >
          {userAnswer.is_checkpoint && 'Batal'} Ragu-ragu
        </Button>
        {countQuestion === soal ? (
          <Button
            rightIcon={FiSave}
            onClick={() => {
              onDone();
            }}
          >
            Selesai
          </Button>
        ) : (
          <Button
            rightIcon={FiSave}
            onClick={() =>
              nextPage({
                next_soal: soal + 1,
              })
            }
          >
            Soal Berikutnya
          </Button>
        )}
      </div>
    </FormProvider>
  );
}
