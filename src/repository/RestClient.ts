import axios from 'axios';
import { decode, encode } from 'base-64';
import { Platform } from 'react-native';

import { getEnv } from '../../packages/config';
import { isDev } from '../../packages/is-dev';
import { Logger } from '../logger';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const instance = axios.create({
  baseURL: Platform.select({
    web: `http://localhost:8080/${getEnv('API_URL')}`,
    default: getEnv('API_URL'),
  }),
  timeout: 30000,
  auth: {
    username: getEnv('API_USERNAME'),
    password: getEnv('API_PASSWORD'),
  },
});

if (isDev) {
  instance.interceptors.request.use((request) => {
    Logger.log('[RestClient] Starting Request', request);
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      Logger.log('[RestClient] Response:', response);
      return response;
    },
    (error) => {
      Logger.log('[RestClient] Error:', { ...error });
      return Promise.reject(error);
    },
  );
}

export class RestClient {
  fetchQueue = (queueId: string) => instance.get(`/queue/${queueId}`);
}
