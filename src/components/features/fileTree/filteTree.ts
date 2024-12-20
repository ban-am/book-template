import { useBookProvider } from "@/plugins/book";
import type { GoogleDriveFile, GoogleDriveFileListResponse } from "@/plugins/drive/googleDriveProvider";
import type GoogleDriveProvider from "@/plugins/drive/googleDriveProvider";
import { useFileProvider } from "@/plugins/file";
import { inject, provide, ref } from "vue"

export const FILE_TREE = 'fileTree';

export const useFileTreeProvider = () => {
  return inject<FileTreeProvider>(FILE_TREE)!;
}


export type TreeFile = {
  data: GoogleDriveFile;
  isFolder: boolean;
  folderData?: GoogleDriveFileListResponse
}

export class FileTreeProvider {
  rootFolder = ref<GoogleDriveFileListResponse>();
  selectedFile = ref<TreeFile>();
  fileProvider = useFileProvider();
  bookProvider = useBookProvider();

  constructor(public driveProvider: GoogleDriveProvider) {
  }

  async loadRoot() {
    this.rootFolder.value = await this.driveProvider.listByFolder("1zZJkLqk_eDk0UNfofXaJ4aDBSIHhnWbk");
    
    // this.rootFolder.value = await this.driveProvider.listInRoot();
  }

  async onSelectedFile(file: TreeFile) {
    if (!file.isFolder) {
      this.selectedFile.value = file;
      return;
    }

    if (file.folderData) {
      file.folderData = undefined;
      return;
    }

    file.folderData = await this.driveProvider.listByFolder(file.data.id);
  }

  getFilteTreeFiles(data: GoogleDriveFileListResponse) {
    return data.files.map((file) => ({ 
      data: file,
      isFolder: file.mimeType.includes('folder')
    } as TreeFile)).sort((a, b) => {
      if (a.isFolder && !b.isFolder)
        return -1;

      if (!a.isFolder && b.isFolder)
        return 1;
      
      return 0;
    });
  }

  closeFile() {
    this.selectedFile.value = undefined;
  }
}