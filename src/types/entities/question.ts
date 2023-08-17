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

export interface Answer {
  answer: string;
  is_correct: number;
}

export interface Question {
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

export type UserAnswer = {
  question_id: string;
  answer: string;
};

export type UserCheckpoint = {
  question_id: string;
};

export type DetailQuestions = {
  category: string;
  image_url: string | null;
  index: number;
  name: string;
  time_left: string;
  question: string;
  answers: UserAnswer[];
};

export type ListQusetions = {
  question_id: string;
  is_answered: boolean;
  is_checkpoint: boolean;
};

export interface StartEndQuiz {
  quiz_list_id: string;
  start_attempt: boolean;
  end_attempt: boolean;
}
