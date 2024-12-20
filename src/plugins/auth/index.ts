import { inject, type App, type Plugin } from 'vue';
import GoogleAuthProvider from './googleAuthProvider';

export const GOOGLE_AUTH = 'google_auth';

const googleAuthPlugin: Plugin = {
  install: (app: App, options: any) => {
    const googleApi = new GoogleAuthProvider();
    app.provide(GOOGLE_AUTH, googleApi);
  }
}

export default googleAuthPlugin;

export const useGoogleAuth = () => {
  return inject<GoogleAuthProvider>(GOOGLE_AUTH)!;
}