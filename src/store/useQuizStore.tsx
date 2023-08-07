import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';

import { setAllQuestions } from '@/lib/cookies';

import { ListQusetionProps } from '@/types/entities/question';

type QuizStoreType = {
  allQuestions: ListQusetionProps[] | null;
  setAllQuestionsStore: (questions: ListQusetionProps[]) => void;
  // getQuestion: (index: number) => string;
};

const useQuizStoreBase = create<QuizStoreType>((set) => ({
  allQuestions: null,
  setAllQuestionsStore: (questions) => {
    setAllQuestions(questions);
    set(
      produce<QuizStoreType>((state) => {
        state.allQuestions = questions;
      })
    );
  },
}));

const useQuizStore = createSelectorHooks(useQuizStoreBase);

export default useQuizStore;
