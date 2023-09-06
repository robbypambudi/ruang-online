import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

import QuestionArrayFields from '@/pages/admin/tryout/question/components/Fields/QuestionArrayFields';

import QuestionForm from '@/types/entities/question';

type QuestionFormProps = {
  size: number;
  quiz_list_id: string;
  category: string;
  is_default: string;
};

export default function QuestionsForm({
  size,
  quiz_list_id,
  category,
  is_default,
}: QuestionFormProps) {
  const router = useRouter();
  const isReady = router.isReady;

  const dialog = useDialog();

  const { mutate } = useMutationToast<void, QuestionForm>(
    useMutation((data) => {
      return api.post('/admin/quiz_list/question', data);
    })
  );

  const openWarning = (data: QuestionForm) => {
    dialog({
      title: 'Are you sure?',
      description: 'You will not be able to recover this imaginary file!',
      submitText: 'Sure',
      variant: 'warning',
      catchOnCancel: true,
    }).then(() =>
      mutate(data, {
        onSuccess: () => {
          router.push(`/admin/tryout/${quiz_list_id}`);
        },
      })
    );
  };

  const generateQuestion = (size: number) => {
    const questions = [];
    for (let i = 0; i < size; i++) {
      questions.push({
        question_type_id: '',
        category: category || '',
        question: '',
        image_url: '',
        answers: [
          {
            is_correct: -1,
          },
        ],
      });
    }
    return questions;
  };
  const methods = useForm<QuestionForm>({});

  React.useEffect(() => {
    if (isReady) {
      const questions = generateQuestion(Number(size));
      methods.reset({ questions });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, methods, size]);

  const { handleSubmit, setValue } = methods;

  const onSubmit = (_data: QuestionForm) => {
    const data: QuestionForm = {
      ..._data,
      quiz_list_id: quiz_list_id,
    };
    openWarning(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
          {isReady && (
            <QuestionArrayFields
              category={category}
              setValue={setValue}
              is_default={is_default}
            />
          )}
          <div className='mt-8 flex items-center justify-center'>
            <Button
              type='submit'
              size='lg'
              leftIcon={FaSave}
              leftIconClassName='text-2xl'
            >
              <Typography variant='h5' color='white'>
                Simpan Jawaban
              </Typography>
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
