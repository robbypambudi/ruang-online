import { QusetionsList } from '@/types/entities/question';

const setAllQuestions = async (questions: QusetionsList[]) => {
  // Local Storage
  localStorage.setItem('@geo/questions', JSON.stringify(questions));
};
const getAllQuestions = () => {
  const value = localStorage.getItem('@geo/questions');

  return JSON.parse(value as string) as QusetionsList[];
};

type ChangeQuestionStatusAnswer = {
  index: number;
} & Omit<QusetionsList, 'question_id'>;

export const changeQuestionStatusAnswerByIndex = ({
  index,
  is_answered,
  is_checkpoint,
}: ChangeQuestionStatusAnswer) => {
  const value = localStorage.getItem('@geo/questions') as string;
  const cookieValue = JSON.parse(value);
  cookieValue[index].is_answered = is_answered;
  cookieValue[index].is_checkpoint = is_checkpoint;
  setAllQuestions(cookieValue);
};

export const destroyAllQuestions = () => {
  localStorage.removeItem('@geo/questions');
};

export { getAllQuestions, setAllQuestions };
