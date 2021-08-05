declare module 'react-native-config' {
  interface Env {
    API_URL: string;
    API_USERNAME: string;
    API_PASSWORD: string;
    GRAVATAR_API_URL: string;
  }

  const Config: Env;

  export default Config;
}

export type Env =
  | 'API_URL'
  | 'API_USERNAME'
  | 'API_PASSWORD'
  | 'GRAVATAR_API_URL';
