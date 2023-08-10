import Cookies, { CookieSetOptions } from 'universal-cookie';

import { ListQusetions } from '@/types/entities/question';

const cookies = new Cookies();
const securedCookies = '@geosentric/token';

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions
) => {
  cookies.set(name, value, options);
};

export const getToken = (): string => {
  return cookies.get(securedCookies);
};

export const setToken = (token: string) => {
  setCookie(securedCookies, token, {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'strict',
  });
};

export const removeToken = () => {
  cookies.remove(securedCookies, {
    path: '/',
    sameSite: 'strict',
  });
};

// Set the All Questions
export const setAllQuestions = (questions: ListQusetions[]) => {
  setCookie('@geo/questions', JSON.stringify(questions), {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
};

// Get all questions
export const getAllQuestions = () => {
  const cookieValue = cookies.get('@geo/questions');
  return cookieValue;
};

export const changeQuestionStatusAnswerByIndex = (
  index: number,
  status: 'answered' | 'not_answered'
) => {
  const cookieValue = cookies.get('@geo/questions');
  cookieValue[index].status = status;
  setAllQuestions(cookieValue);
};

export const destroyAllQuestions = () => {
  cookies.remove('@geo/questions');
};
