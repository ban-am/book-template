import { inject, type App, type Plugin } from 'vue';
import GoogleDriveProvider from './googleDriveProvider';

export const GOOGLE_DRIVE = 'google_drive';

const googleDrivePlugin: Plugin = {
  install: (app: App, options: any) => {
    const googleApi = new GoogleDriveProvider();
    app.provide(GOOGLE_DRIVE, googleApi);
  }
}

export default googleDrivePlugin;

export const useDriveProvider = () => {
  return inject<GoogleDriveProvider>(GOOGLE_DRIVE)!;
}