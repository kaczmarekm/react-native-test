import axios from 'axios';
import Config from 'react-native-config';
import { decode, encode } from 'base-64';

import { Logger } from '../logger';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 40000,
  auth: {
    username: Config.API_USERNAME,
    password: Config.API_PASSWORD,
  },
});

if (__DEV__) {
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
      Logger.log('[RestClient] Error:', error);
      return Promise.reject(error);
    },
  );
}

export class RestClient {
  fetchQueue = (queueId: string) => instance.get(`/queue/${queueId}`);
}
