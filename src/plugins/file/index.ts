import { inject, type App, type Plugin } from 'vue';
import FileProvider from './fileProvider';
import { GOOGLE_DRIVE } from '../drive';

const KEY = 'file_provider';

const filePlugin: Plugin = {
  install: (app: App, options: any) => {
    app.provide(KEY, new FileProvider(app._context.provides[GOOGLE_DRIVE]));
  }
}

export default filePlugin;

export const useFileProvider = () => {
  return inject<FileProvider>(KEY)!;
}