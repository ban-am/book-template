import { inject, type App, type Plugin } from 'vue';
import BookProvider from './bookProvider';

const KEY = 'book_provider';

const bookPlugin: Plugin = {
  install: (app: App, options: any) => {
    app.provide(KEY, new BookProvider());
  }
}

export default bookPlugin;

export const useBookProvider = () => {
  return inject<BookProvider>(KEY)!;
}