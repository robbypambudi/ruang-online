import { useMutation, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

import api, { setApiContext } from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { generateToastQuery } from '@/lib/toast';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Input from '@/components/forms/Input';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import IconLink from '@/components/links/IconLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import { ApiResponse } from '@/types/api';
import { QUESTION_TYPE_NAME, QuestionType } from '@/types/entities/question';

type DetailSoal = {
  id: string;
  question: string;
  type: string;
  category: string;
  image_url: string;
  index: number;
  name: string;
  answers: DetailAnswer[];
};
type DetailAnswer = {
  answer: string;
  is_correct: boolean;
};

interface AnswerEdit {
  answer: string;
  is_correct: number;
}

interface QuestionEdit {
  question_id: string;
  question_type_id: string;
  category: string;
  question: string;
  image_url: string | null;
  name: string;
  answers: AnswerEdit[];
}
const QuestionTypes = {
  multiple_choice_single_answer: '415f1e42-64f9-4a1e-87f1-249c9d4f8e77',
  multiple_choice_multiple_answer: '429c2c48-5273-42c2-8f25-612fea034021',
  long_answer: 'e3f3aa90-8466-47db-92a9-64e69716327e',
  short_answer: 'ff3dc386-cfbc-4f5d-8c82-2c8053e4b201',
};

const QuestionTypeIds = {
  '415f1e42-64f9-4a1e-87f1-249c9d4f8e77': 'multiple_choice_single_answer',
  '429c2c48-5273-42c2-8f25-612fea034021': 'multiple_choice_multiple_answer',
  'e3f3aa90-8466-47db-92a9-64e69716327e': 'long_answer',
  'ff3dc386-cfbc-4f5d-8c82-2c8053e4b201': 'short_answer',
};

export default function EditQuestion({
  questionTypes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id, name, status, quiz_id } = router.query;

  const { data: detailSoal, isLoading } = useQuery<ApiResponse<DetailSoal>>([
    `/admin/quiz_list/question-detail?question_id=${id}`,
  ]);

  const { mutate } = useMutationToast<void, QuestionEdit>(
    useMutation((data) => {
      return api.patch(`/admin/question-answer`, data);
    }),
    {
      success: 'Berhasil mengedit soal',
    }
  );

  const methods = useForm<QuestionEdit>();

  const { setValue, handleSubmit } = methods;

  React.useEffect(() => {
    if (!isLoading && detailSoal?.data) {
      const defaultVariant =
        QuestionTypes[detailSoal.data.type as keyof typeof QuestionTypes];
      setValue('question_type_id', defaultVariant);
    }
  }, [isLoading, detailSoal, setValue]);

  const { question_type_id } = methods.watch();

  const nomer = detailSoal?.data.index;
  const jawaban = detailSoal?.data.answers;

  const onSubmit = async (data: QuestionEdit) => {
    data.question_id = id as string;
    mutate(data, {
      onSuccess: () => {
        router.push(
          `/admin/tryout/question/${quiz_id}?name=${name}&status=${status}`
        );
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <Seo templateTitle='Edit Soal' />
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <IconLink
            href={`/admin/tryout/question/${quiz_id}?name=${name}&status=${status}`}
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
                `/admin/tryout/question/edit`,
              ]}
              id={id as string}
            />
            <Typography variant='h2' className='font-bold'>
              Edit Soal
            </Typography>
          </div>
        </div>
      </header>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='py-3 pr-4'>
            <div className='flex items-center justify-between'>
              <Typography variant='h2'>Question {nomer}</Typography>

              <SearchableSelectInput
                id='question_type_id'
                type='text'
                label='Question Type'
                options={questionTypes.map((item) => ({
                  label: QUESTION_TYPE_NAME[item.name],
                  value: item.id,
                }))}
                className='w-52'
              />
            </div>

            <div className='space-y-2 border-b-2 border-gray-300 py-4'>
              <div className='flex flex-col items-center gap-x-4 md:flex-row'>
                <Input
                  defaultValue={detailSoal?.data.name}
                  id='name'
                  label='Question Name'
                  placeholder='Masukkan Nama Disini'
                  validation={{
                    required: 'Nama tidak boleh kosong!',
                  }}
                  containerClassName='md:w-1/2 w-full'
                />
                <Input
                  defaultValue={detailSoal?.data.category}
                  id='category'
                  label='Category'
                  placeholder='Masukkan Kategori Disini'
                  containerClassName='md:w-1/4 w-full'
                  validation={{
                    required: 'Kategori tidak boleh kosong!',
                  }}
                />
              </div>

              <TextArea
                defaultValue={detailSoal?.data.question}
                id='question'
                label='Question'
                placeholder='Masukkan Soal Disini'
                validation={{
                  required: 'Soal tidak boleh kosong!',
                }}
              />
              <Input
                id='image_url'
                label='Image URL'
                placeholder='Link Gambar'
              />
            </div>
          </div>
          <div className=''>
            <Answer
              number={nomer ?? 0}
              answerType={
                QuestionTypeIds[
                  question_type_id as keyof typeof QuestionTypeIds
                ]
              }
              answer={jawaban ?? []}
            />
          </div>
          <Button type='submit' className='ml-4 mt-4'>
            Save
          </Button>
        </form>
      </FormProvider>
    </DashboardLayout>
  );
}

type AnswerProps = {
  number: number;
  answerType: string;
  answer: DetailAnswer[];
};

function Answer({ answerType, answer }: AnswerProps) {
  return (
    <>
      <div>
        <div className='flex justify-between px-4'>
          <Typography variant='h4'>Answer</Typography>
          <Typography variant='h4'>Correct Answer</Typography>
        </div>
        <div className='mt-2'>
          {answerType !== '' && (
            <AnswerOptionsForm answerType={answerType} answer={answer} />
          )}
        </div>
      </div>
    </>
  );
}

function AnswerOptionsForm({
  answerType,
  answer,
}: {
  answerType: string;
  answer: DetailAnswer[];
}) {
  const { fields, append, remove } = useFieldArray({
    name: `answers[]`,
    shouldUnregister: true,
  });
  const radio = React.useRef<HTMLInputElement>(null);

  const [prevAnswerType, setPrevAnswerType] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (prevAnswerType !== answerType && prevAnswerType !== null) {
      setPrevAnswerType(answerType);
      remove();
    }
    if (answerType === undefined) {
      remove();
    }

    if (answerType !== undefined && prevAnswerType === null) {
      setPrevAnswerType(answerType);
      remove();
      append(
        answer.map((item) => ({
          answer: item.answer,
          is_correct: item.is_correct ? '1' : '0',
        }))
      );
    }
  }, [answer, answerType, append, prevAnswerType, remove]);

  return (
    <>
      {fields.length === 0 && (
        <div className='flex flex-col items-center justify-center'>
          {answerType && (
            <Button
              onClick={() =>
                append({
                  answer: '',
                  is_correct:
                    answerType === 'multiple_choice_single_answer' ||
                    answerType === 'multiple_choice_multiple_answer'
                      ? '0'
                      : '1',
                })
              }
              size='sm'
              className='mt-2'
            >
              <Typography variant='h6' color='white'>
                Add Answer
              </Typography>
            </Button>
          )}
        </div>
      )}
      <div className='space-y-2'>
        {answerType !== undefined &&
          fields.map((item, index) => (
            <div
              key={item.id}
              className='flex items-center gap-x-4'
              ref={radio}
            >
              {answerType !== undefined && (
                <AnswerTypeOptions questionType={answerType} index={index} />
              )}
            </div>
          ))}
        {!answerType && (
          <Typography variant='h5' className='w-full text-center'>
            You must select question type first
          </Typography>
        )}
      </div>
      <div className='my-4 flex gap-2'>
        {answerType && (
          <>
            {(answerType === 'multiple_choice_multiple_answer' ||
              answerType === 'multiple_choice_single_answer') && (
              <>
                {fields.length >= 1 && (
                  <IconButton
                    onClick={() =>
                      append({
                        answer: '',
                        is_correct:
                          answerType === 'multiple_choice_single_answer' ||
                          answerType === 'multiple_choice_multiple_answer'
                            ? '0'
                            : '1',
                      })
                    }
                    icon={FaPlus}
                    size='sm'
                    type='button'
                  />
                )}
              </>
            )}
            {fields.length >= 1 && (
              <IconButton
                onClick={() => remove(fields.length - 1)}
                icon={FaTrash}
                size='sm'
                variant='danger'
                type='button'
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

type AnswerTypeProps = {
  index: number;
  questionType: string;
};

function AnswerTypeOptions({ index, questionType }: AnswerTypeProps) {
  return (
    <>
      {questionType === 'multiple_choice_multiple_answer' ||
        (questionType === 'multiple_choice_single_answer' && (
          <Typography variant='h4' className='mr-2 w-4'>
            {index + 1}
          </Typography>
        ))}
      {questionType !== 'long_answer' ? (
        <Input
          id={`answers.${index}.answer`}
          label={null}
          placeholder='Masukkan Jawaban Disini'
          containerClassName='w-full'
        />
      ) : (
        <TextArea
          id={`answers.${index}.answer`}
          label={null}
          placeholder='Masukkan Jawaban Disini'
          containerClassName='w-full'
        />
      )}

      <div
        className={clsxm(
          'flex w-40 items-center justify-center space-y-2',
          (questionType === 'long_answer' || questionType === 'short_answer') &&
            'hidden'
        )}
      >
        <SearchableSelectInput
          id={`answers.${index}.is_correct`}
          label={null}
          options={[
            { label: 'Benar', value: '1' },
            { label: 'Salah', value: '0' },
          ]}
          validation={{
            required: 'Jawaban tidak boleh kosong!',
          }}
        />
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  setApiContext(context);

  try {
    const response = await api.get<ApiResponse<QuestionType[]>>(
      '/question_type'
    );
    return {
      props: {
        questionTypes: response.data.data,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      redirect: {
        destination: generateToastQuery({
          type: 'error',
          message: 'Gagal mengambil data question type',
          url: '/admin/tryout',
        }),
        permanent: false,
      },
    };
  }
};
