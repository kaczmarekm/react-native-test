declare module 'react-native-config' {
  interface Env {
    API_URL: string;
    API_USERNAME: string;
    API_PASSWORD: string;
  }

  const Config: Env;

  export default Config;
}
