import { ref, type Ref, type VNodeRef } from "vue";
import type { GoogleDriveFile } from "../drive/googleDriveProvider";

export type OpenBook = {
  parts: string[];
  fileInfo: GoogleDriveFile;
};

export default class BookProvider {
  books = ref<OpenBook[]>([]);
  selectedBook = ref<OpenBook>();
  
  pageContent = ref<string>('');

  addFile(content: string, fileInfo: GoogleDriveFile) {
    this.books.value.push({
      parts: JSON.parse(content),
      fileInfo
    });
  }

  selectBook(book: OpenBook) {
    this.selectedBook.value = book;

    this.pageContent.value = this.replaceRelativePath(book.parts[0]);
  }

  setIframe(iframeRef: HTMLIFrameElement) {
    iframeRef.contentWindow!.document.open();
    iframeRef.contentWindow!.document.write(this.pageContent.value);
    iframeRef.contentWindow!.document.close();
  }

  replaceRelativePath(content: string) {
    const baseUrl = 'https://www.bookport.cz';
    const regex = /(["'])\/api\/reader\//g;
    return content.replace(regex, `$1${baseUrl}/api/reader/`);
  }
}

/*



const iframeRef = ref<HTMLIFrameElement>();
const baseUrl = 'https://www.bookport.cz';

const fixRelativePaths = (html: string): string => {
  const regex = /(["'])\/api\/reader\//g;
  return html.replace(regex, `$1${baseUrl}/api/reader/`);
}

const htmlStore = inject<HtmlStore>('htmlStore')!;

const currentHtmlPage = computed(() => {
  console.log("currentHtmlPage");
    if (htmlStore.htmlParts.value.length === 0 || htmlStore.currentPage.value >= htmlStore.htmlParts.value.length) {
      return '';
    }
    return htmlStore.htmlParts.value[htmlStore.currentPage.value];
  });

watch(() => currentHtmlPage.value, (newVal) => {
  if (!iframeRef.value)
    return;

  const html = fixRelativePaths(newVal);

  iframeRef.value.contentWindow!.document.open();
  iframeRef.value.contentWindow!.document.write(html);
  iframeRef.value.contentWindow!.document.close();
});
*/