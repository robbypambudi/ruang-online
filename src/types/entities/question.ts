export const QUESTION_TYPE_NAME = {
  multiple_choice_single_answer: 'Multiple Choice Single Answer',
  multiple_choice_multiple_answer: 'Multiple Choice Multiple Answer',
  short_answer: 'Short Answer',
  long_answer: 'Long Answer',
} as const;

export interface QuestionType {
  id: string;
  name: keyof typeof QUESTION_TYPE_NAME;
}

interface Answer {
  answer: string;
  is_correct: number;
}

interface Question {
  question_type_id: QuestionType['id'];
  category: string;
  question: string;
  image_url: string;

  answers: Answer[];
}

export default interface QuestionForm {
  quiz_list_id: string;
  questions: Question[];
}
