import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import requestIp from 'request-ip';
import Cookies from 'universal-cookie';

import { getToken } from '@/lib/cookies';

import { UninterceptedApiError } from '@/types/api';

const isServer = () => {
  return typeof window === 'undefined';
};
let context = <GetServerSidePropsContext>{};

const api = axios.create({
  baseURL: 'https://api.geosentric-its.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  if (config.headers) {
    let token: string | undefined;

    if (isServer()) {
      if (!context)
        throw 'Api Context not found. You must call `setApiContext(context)` before calling api on server-side';

      const cookies = new Cookies(context.req?.headers.cookie);

      const detectedIp = requestIp.getClientIp(context.req);
      if (
        detectedIp &&
        process.env.NEXT_PUBLIC_STATUS_PRODUCTION === 'vercel'
      ) {
        // console.log('detectedIp', detectedIp);
        config.headers['X-Forwarded-For'] = detectedIp;
        config.headers['X-Real-IP'] = detectedIp;
      }

      /** Get cookies from context if server side */
      // get cookie from context by name @geosentric/token
      token = cookies.get('@geosentric/token');
    } else {
      /** Get cookies from context if server side */
      token = getToken();
    }

    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

export const setApiContext = (_context: GetServerSidePropsContext) => {
  context = _context;
  return;
};

export default api;
