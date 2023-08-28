/**
 * Get Quiz Result
 */

export interface ResultQuiz {
  quiz_name: string;
  grade: number;
  correct_answer: number;
  incorrect_answer: number;
  total_spent: number;
  question_attempt: number;
}
