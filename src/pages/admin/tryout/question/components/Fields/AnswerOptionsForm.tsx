import * as React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Input from '@/components/forms/Input';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import Typography from '@/components/typography/Typography';

import { QuestionTypeContext } from '@/pages/admin/tryout/question/buat.page';

import { QuestionType } from '@/types/entities/question';

export default function AnswerOptionsForm({
  number,
  answerType,
  is_default,
}: {
  number: number;
  answerType: string;
  is_default: string;
}) {
  const { fields, append, remove } = useFieldArray({
    name: `questions.${number}.answers[]`,
    shouldUnregister: true,
  });

  const _questionType = React.useContext(QuestionTypeContext);
  const question_type = _questionType.find((item) => item.id === answerType);

  const radio = React.useRef<HTMLInputElement>(null);

  return (
    <>
      {fields.length === 0 && (
        <div className='flex flex-col items-center justify-center'>
          <Typography variant='h4'>
            No Answer{!question_type && ', Please fill the question type first'}
          </Typography>

          {question_type && (
            <Button
              onClick={() =>
                append({
                  answer: '',
                  is_correct:
                    question_type.name === 'long_answer' ||
                    question_type.name === 'short_answer'
                      ? '1'
                      : '0',
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
        {fields.map((item, index) => (
          <div key={item.id} className='flex items-center gap-x-4' ref={radio}>
            {question_type && (
              <AnswerTypeOptions
                questionType={question_type}
                index={index}
                number={number}
                is_default={is_default}
              />
            )}
            {!question_type && (
              <Typography variant='h5' className='w-full text-center'>
                You must select question type first
              </Typography>
            )}
          </div>
        ))}
      </div>
      <div className='my-4 flex gap-2'>
        {question_type && (
          <>
            {(question_type.name === 'multiple_choice_multiple_answer' ||
              question_type.name === 'multiple_choice_single_answer') && (
              <>
                {fields.length >= 1 && (
                  <IconButton
                    onClick={() =>
                      append({
                        answer: '',
                        is_correct:
                          question_type.name === 'long_answer' ||
                          question_type.name === 'short_answer'
                            ? '1'
                            : is_default === 'false'
                            ? -1
                            : 0,
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
  number: number;
  index: number;
  questionType: QuestionType;
  is_default: string;
};

function AnswerTypeOptions({
  number,
  index,
  questionType,
  is_default,
}: AnswerTypeProps) {
  return (
    <>
      {questionType.name === 'multiple_choice_multiple_answer' ||
        (questionType.name === 'multiple_choice_single_answer' && (
          <Typography variant='h4' className='mr-2 w-4'>
            {index + 1}
          </Typography>
        ))}
      {questionType.name !== 'long_answer' ? (
        <Input
          id={`questions.${number}.answers.${index}.answer`}
          label={null}
          placeholder='Masukkan Jawaban Disini'
          containerClassName='w-full'
        />
      ) : (
        <TextArea
          id={`questions.${number}.answers.${index}.answer`}
          label={null}
          placeholder='Masukkan Jawaban Disini'
          containerClassName='w-full'
        />
      )}

      <div
        className={clsxm(
          'flex w-40 items-center justify-center space-y-2',
          (questionType.name === 'long_answer' ||
            questionType.name === 'short_answer') &&
            'hidden'
        )}
      >
        {is_default === 'true' && (
          <SearchableSelectInput
            id={`questions.${number}.answers.${index}.is_correct`}
            label={null}
            options={[
              { label: 'Benar', value: '1' },
              { label: 'Salah', value: '0' },
            ]}
            validation={{
              required: 'Jawaban tidak boleh kosong!',
            }}
          />
        )}
        {is_default == 'false' && (
          <Input
            id={`questions.${number}.answers.${index}.is_correct`}
            label={null}
            containerClassName='mx-3'
            placeholder='Poin'
          />
        )}
      </div>
    </>
  );
}
