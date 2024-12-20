import { inject, type App, type Plugin } from 'vue';
import FileProvider from './fileProvider';

const KEY = 'file_provider';

const filePlugin: Plugin = {
  install: (app: App, options: any) => {
    app.provide(KEY, new FileProvider());
  }
}

export default filePlugin;

export const useFileProvider = () => {
  return inject<FileProvider>(KEY)!;
}