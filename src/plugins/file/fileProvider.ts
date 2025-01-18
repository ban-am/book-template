import { ref, type Ref } from "vue";
import type { GoogleDriveFile } from "../drive/googleDriveProvider";
import type GoogleDriveProvider from "../drive/googleDriveProvider";
import { getDomElementPath, getFileIframe, replaceRelativePath, scrollToDomPath, trackIframeReader } from "@/utils";

export type ContentInfo = {
  id: string,
  fileInfo: GoogleDriveFile,
  page: number;
  maxPage: number;
  loading: boolean;
};

export type OpenFile = {
  id: string;
  contentData: Promise<any>;
  partsPromise: Promise<string[]>;
  contentInfo: Ref<ContentInfo>;
};

export type FileState = {
  id: string;
  page?: number;
  readedBlock?: string;
}

const files_state_id = '1e9D6Wjb8ioJJMkjNmWe1UaN3WjoQz0nF';
const STORAGE_KEY = 'open_files';

export default class FileProvider {
  fileStates: FileState[] = [];
  files = ref<GoogleDriveFile[]>([]);
  selectedFile = ref<GoogleDriveFile>();
  fileContents: OpenFile[] = [];
  loadFileStatePromise: Promise<void>;
  currentHighlightedParent?: HTMLElement | undefined;
  unmountTracking?: () => void;
  
  constructor(private driveProvider: GoogleDriveProvider) {
    this.loadFileStatePromise = this.loadFileStates();

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      this.files.value = JSON.parse(data);
    }
  }

  async loadFileStates() {
    const blob = await this.driveProvider.getFile(files_state_id);
    
    if (!blob)
      return;

    this.fileStates = JSON.parse(await blob.text())  ?? [];
  }

  async saveFileState(fileInfo: GoogleDriveFile) {
    let fileContent = this.fileContents.find(i => i.id == fileInfo.id);
    let fileState = this.fileStates.find(f => f.id === fileInfo.id);

    if (fileState) {
      if (fileState.page != fileContent?.contentInfo.value.page)
        fileState.readedBlock = undefined;

      fileState.page = fileContent?.contentInfo.value.page;
    } else {
      fileState = { id: fileInfo.id, page: fileContent?.contentInfo.value.page };
      this.fileStates.push(fileState);
    }

    if (this.currentHighlightedParent){
      fileState.readedBlock = getDomElementPath(this.currentHighlightedParent);
    }

    await this.driveProvider.updateFile(files_state_id, JSON.stringify(this.fileStates, null, 4));
  }

  addFile(fileInfo: GoogleDriveFile) {
    if (this.files.value.some(f => f.id === fileInfo.id))
      return;

    this.files.value.push(fileInfo);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.files.value, null, 4));
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

  getOrAddContentInfo(id: string) {
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

    this.loadFileStatePromise.then(() => {
      const fileState = this.fileStates.find(f => f.id === fileInfo.id);
      
      if (fileState) {
        contentInfo.value.page = fileState.page ?? 0;
      }
    });

    fileContent = {
      id: id,
      contentInfo: contentInfo,
      
      contentData: this.driveProvider.getFile(id).then(blob => this.onFileContentLoaded(blob, contentInfo.value)),
      partsPromise: new Promise<string[]>((resolve, reject) => {}),
    };

    this.fileContents.push(fileContent);

    return contentInfo;
  }

  private onFileContentLoaded(blob: Blob | null, contentInfo: ContentInfo) {
    if (!blob)
      return null;

    contentInfo.loading = false;

    switch (contentInfo.fileInfo.mimeType) {
      case 'application/json':
        return blob.text().then(text => JSON.parse(text));

      case 'application/pdf':
        return blob;

      case 'text/html':
      case "text/plain":
        return blob.text();
    }
  }
  
  renderPage(id: string) {
    const fileContent = this.fileContents.find(i => i.id === id);

    if (!fileContent)
      return;

    fileContent.contentData.then(data => {
      const contentInfo = fileContent.contentInfo.value;
      
      contentInfo.loading = false;

      const page = contentInfo.page;
      const fileInfo = contentInfo.fileInfo;

      let iframeData: any;

      switch (fileInfo.mimeType) {
        case 'application/json':
          iframeData = replaceRelativePath(data[page]);
          contentInfo.maxPage = data.length;
          break;

        case 'text/html':
          iframeData = replaceRelativePath(data);
          break;

        case "text/plain":
          iframeData = "<pre>" + data + "</pre>";
          break;

        default:
          return;
      }

      const iframe = getFileIframe();

      if (!iframe.contentWindow)
        return;
      
      if (this.unmountTracking)
        this.unmountTracking();

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(`
        <style> 
          * { color: #94a3b8 !important; background-color: inherit !important; } 
          .bold {
            font-weight: 600;
            font-size:18px;
          }
        </style> 
        ${iframeData}
      `);
      iframe.contentWindow.document.close();
      
      this.unmountTracking = trackIframeReader(parent => {
        if (parent == this.currentHighlightedParent)
          return;
    
        this.currentHighlightedParent = parent;
    
        console.log('currentHighlightedParent', this.currentHighlightedParent);
      });
      
      setTimeout(() => {
        let fileState = this.fileStates.find(f => f.id === fileInfo.id);
        scrollToDomPath(iframe.contentDocument, fileState?.readedBlock)
      }, 500)
    }); 
  }
}
