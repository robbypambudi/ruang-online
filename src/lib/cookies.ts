import Cookies, { CookieSetOptions } from 'universal-cookie';

import { ListQusetionProps } from '@/types/entities/question';

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
    secure: true,
  });
};

export const removeToken = () => {
  cookies.remove(securedCookies, {
    path: '/',
    sameSite: 'strict',
    secure: true,
  });
};

// Set the All Questions
export const setAllQuestions = (questions: ListQusetionProps[]) => {
  setCookie('@geosentric/questions', JSON.stringify(questions), {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'strict',
    secure: true,
  });
};

// Get all questions
export const getAllQuestions = () => {
  const cookieValue = cookies.get('@geosentric/questions');
  return cookieValue;
};
