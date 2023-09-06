import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  FormProvider,
  useFieldArray,
  useForm,
  UseFormSetValue,
} from 'react-hook-form';
import { BiMenu } from 'react-icons/bi';
import { FaPlus, FaTrash } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import Typography from '@/components/typography/Typography';

import { QuestionTypeContext } from '@/pages/admin/tryout/question/buat.page';
import AnswerOptionsForm from '@/pages/admin/tryout/question/components/Fields/AnswerOptionsForm';

import QuestionForm, { QUESTION_TYPE_NAME } from '@/types/entities/question';

type QuestionArrayFieldsProps = {
  category: string;
  setValue: UseFormSetValue<QuestionForm>;
  is_default: string;
};

export default function QuestionArrayFields({
  category,
  setValue,
  is_default,
}: QuestionArrayFieldsProps) {
  const { append, fields, move, remove } = useFieldArray({
    name: 'questions[]',
    shouldUnregister: true,
  });

  const onDragEnd = React.useCallback(
    ({ source, destination }: DropResult) => {
      if (destination) {
        move(source.index, destination.index);
      }
    },
    [move]
  );
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ul>
          <Droppable droppableId='parent' type='parentContainer'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='space-y-3'
              >
                {fields.length === 0 && (
                  <div className='flex flex-col items-center justify-center rounded-2xl bg-white px-4 py-6 shadow-md'>
                    <Typography variant='h3'>
                      Looks like you have no question, want to add one?
                    </Typography>
                    <Button
                      onClick={() =>
                        append({
                          questions: {
                            question_type_id: '',
                            category: category || '',
                            question: '',
                            image_url: '',
                            answers: [],
                          },
                        })
                      }
                      size='sm'
                      className='mt-4'
                    >
                      <Typography variant='h5' color='white'>
                        Add Question
                      </Typography>
                    </Button>
                  </div>
                )}
                {fields.map((item, index) => (
                  <Draggable
                    key={`questions[${item.id}]`}
                    draggableId={`questions-${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        key={item.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div className='w-full rounded-lg bg-white shadow-md'>
                          <div className='relative rounded-lg border border-gray-200 py-2'>
                            <div
                              className='absolute left-0 top-1/2'
                              {...provided.dragHandleProps}
                            >
                              <BiMenu size='26' />
                            </div>
                            <div className='ml-12'>
                              <Question
                                number={index}
                                setValue={setValue}
                                is_default={is_default}
                              />
                            </div>
                            <div className='mx-6 flex items-center justify-end gap-x-2'>
                              <Button
                                onClick={() => remove(index)}
                                size='sm'
                                leftIcon={FaTrash}
                                variant='danger'
                                type='button'
                              >
                                <Typography variant='h5' color='white'>
                                  Remove Question
                                </Typography>
                              </Button>
                              {fields.length == index + 1 && (
                                <Button
                                  leftIcon={FaPlus}
                                  onClick={() =>
                                    append({ question: '', answer: '' })
                                  }
                                  size='sm'
                                >
                                  <Typography variant='h5' color='white'>
                                    Add Question
                                  </Typography>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
    </>
  );
}

/**
 * @author Robby Ulung Pambudi
 * Question Component
 */

type QuestionProps = {
  number: number;
  setValue: UseFormSetValue<QuestionForm>;
  is_default: string;
};

function Question({ number, setValue, is_default }: QuestionProps) {
  const question_type = React.useContext(QuestionTypeContext);

  const methods = useForm<{ variant: string }>({
    defaultValues: {
      variant: '0',
    },
  });

  const { variant } = methods.watch();

  React.useEffect(() => {
    setValue(`questions.${number}.question_type_id`, variant);
  }, [number, setValue, variant]);

  return (
    <>
      <div className='py-3 pr-4'>
        <div className='flex items-center justify-between'>
          <Typography variant='h2'>Question {number + 1}</Typography>
          <FormProvider {...methods}>
            <SearchableSelectInput
              id='variant'
              type='text'
              label='Question Type'
              options={question_type.map((item) => ({
                label: QUESTION_TYPE_NAME[item.name],
                value: item.id,
              }))}
              className='w-52'
            />
          </FormProvider>
        </div>

        <div className='space-y-2 border-b-2 border-gray-300 py-4'>
          <div className='flex flex-col items-center gap-x-4 md:flex-row'>
            <Input
              id={`questions.${number}.name`}
              label='Question Name'
              placeholder='Masukkan Nama Disini'
              validation={{
                required: 'Nama tidak boleh kosong!',
              }}
              containerClassName='md:w-1/2 w-full'
            />
            <Input
              id={`questions.${number}.category`}
              label='Category'
              placeholder='Masukkan Kategori Disini'
              containerClassName='md:w-1/4 w-full'
              validation={{
                required: 'Kategori tidak boleh kosong!',
              }}
            />
          </div>

          <TextArea
            id={`questions.${number}.question`}
            label='Question'
            placeholder='Masukkan Soal Disini'
            validation={{
              required: 'Soal tidak boleh kosong!',
            }}
          />
          <Input
            id={`questions.${number}.image_url`}
            label='Image URL'
            placeholder='Link Gambar'
          />
        </div>
      </div>
      <div className=''>
        <Answer number={number} answerType={variant} is_default={is_default} />
      </div>
    </>
  );
}

type AnswerProps = {
  number: number;
  answerType: string;
  is_default: string;
};

function Answer({ number, answerType, is_default }: AnswerProps) {
  return (
    <>
      <div>
        <div className='flex justify-between px-4'>
          <Typography variant='h4'>Answer</Typography>
          <Typography variant='h4'>Correct Answer</Typography>
        </div>
        <div className='mt-2'>
          <AnswerOptionsForm
            number={number}
            answerType={answerType}
            is_default={is_default}
          />
        </div>
      </div>
    </>
  );
}
