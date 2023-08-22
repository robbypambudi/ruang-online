import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { ApiResponse } from '@/types/api';
import {
  StartEndQuiz,
  UserAnswer,
  UserCheckpoint,
} from '@/types/entities/question';

export const useQuestionStore = () => {
  const { mutate: saveAnswer } = useMutationToast(
    useMutation((data: UserAnswer) =>
      api.post<ApiResponse<UserAnswer>>(`/quiz_list/submit-answer`, {
        question_id: data.id,
        answer_id: data.answer,
      })
    ),
    {
      loading: 'Menyimpan jawaban...',
    }
  );

  const { mutate: startEndQuestion } = useMutationToast<void, StartEndQuiz>(
    useMutation((data) => {
      return api.post('/quiz_list/quiz-attempt', data);
    })
  );

  const { mutate: saveCheckpoint } = useMutationToast(
    useMutation((data: UserCheckpoint) =>
      api.post<ApiResponse<UserCheckpoint>>(`/quiz_list/checkpoint`, data)
    ),
    {
      loading: 'Menandai soal...',
      success: 'Berhasil menandai soal',
      error: 'Gagal menandai soal',
    }
  );

  return {
    saveAnswer,
    startEndQuestion,
    saveCheckpoint,
  };
};
