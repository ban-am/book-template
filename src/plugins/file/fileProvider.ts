import { ref, type Ref } from "vue";
import type { GoogleDriveFile } from "../drive/googleDriveProvider";
import type GoogleDriveProvider from "../drive/googleDriveProvider";

export type ContentInfo = {
  id: string,
  fileInfo: GoogleDriveFile,
  page: number;
  maxPage: number;
  loading: boolean;
};

export type OpenFile = {
  id: string;
  partsPromise: Promise<string[]>;
  contentInfo: Ref<ContentInfo>;
};

const STORAGE_KEY = 'open_files';

export default class FileProvider {
  files = ref<GoogleDriveFile[]>([]);
  selectedFile = ref<GoogleDriveFile>();
  fileContents: OpenFile[] = [];
  
  constructor() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      this.files.value = JSON.parse(data);
    }
  }

  addFile(fileInfo: GoogleDriveFile) {
    if (this.files.value.some(f => f.id === fileInfo.id))
      return;

    this.files.value.push(fileInfo);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.files.value));
  }

  select(fileInfo: GoogleDriveFile) {
    this.selectedFile.value = fileInfo;
  }

  close(id: string) {
    const index = this.files.value.findIndex(f => f.id === id);
    this.files.value.splice(index, 1);

    this.selectedFile.value = undefined;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.files.value));
  }

  get(id: string) {
    return this.files.value.find(f => f.id === id) as GoogleDriveFile;
  }

  getOrAddContentInfo(id: string, driveProvider: GoogleDriveProvider) {
    const fileInfo = this.get(id);

    let fileContent = this.fileContents.find(i => i.id == id);

    if (!!fileContent)
      return fileContent.contentInfo;

    const contentInfo = ref<ContentInfo>({
      id: id,
      fileInfo: fileInfo,
      page: 0,
      maxPage: 0,
      loading: true
    });

    fileContent = {
      id: id,
      contentInfo: contentInfo,
      partsPromise: driveProvider.getFile(id).then(content => {
        const parts  = !content ? [] : JSON.parse(content);
        contentInfo.value.maxPage = parts.length - 1;
        contentInfo.value.loading = false;
        return parts;
      }),
    };

    this.fileContents.push(fileContent);

    return contentInfo;
  }

  replaceRelativePath(content: string): string {
    const baseUrl = 'https://www.bookport.cz';
    const regex = /(["'])\/api\/reader\//g;
    return content.replace(regex, `$1${baseUrl}/api/reader/`);
  }

  renderPage(id: string, iframe: HTMLIFrameElement) {
    const fileContent = this.fileContents.find(i => i.id === id);

    if (!fileContent)
      return;

    fileContent.partsPromise.then(parts => {
      const page = fileContent.contentInfo.value.page;

      const pageContent = this.replaceRelativePath(parts[page]);

      if (iframe.contentWindow) {
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(pageContent);
        iframe.contentWindow.document.close();
      }
    }); 
  }
}