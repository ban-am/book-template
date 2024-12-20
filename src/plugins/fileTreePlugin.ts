import type { GoogleDriveFile } from "@/plugins/drive/googleDriveProvider";
import type GoogleDriveProvider from "@/plugins/drive/googleDriveProvider";
import { inject, ref, type App, type Plugin } from "vue"
import { GOOGLE_DRIVE } from "./drive";
import type { TreeFile } from "@/types";

export const FILE_TREE = 'fileTree';

export const fileTreePlugin: Plugin = {
  install: (app: App, options: any) => {
    app.provide(FILE_TREE, new FileTreeProvider(app._context.provides[GOOGLE_DRIVE]));
  }
}

export const useFileTree = () => {
  return inject<FileTreeProvider>(FILE_TREE)!;
}

export class FileTreeProvider {
  selectedFile = ref<TreeFile>();

  rootFiles = ref<TreeFile[]>([]);
  favorites = ref<TreeFile[]>([]);
  
  favoriteFileId = '1JBw3poOIMTEe3XSLGVwuPFTCTo_HB9zj';

  constructor(private driveProvider: GoogleDriveProvider) {
    this.loadFavorites();
  }

  async loadRoot() {
    if (this.rootFiles.value.length > 0)
      return;

    const rootFiles = await this.driveProvider.listInRoot();
    this.rootFiles.value = this.getFilteTreeFiles(rootFiles.files);
  }

  async loadFavorites() {
    const blob = await this.driveProvider.getFile(this.favoriteFileId);

    if (!blob)
      return;

    const favoriteGoogleFiles = JSON.parse(await blob.text()) as GoogleDriveFile[];
    this.favorites.value = this.getFilteTreeFiles(favoriteGoogleFiles);
  }

  async addFavorite(file: TreeFile) {
    this.favorites.value.push({
      data: file.data,
      isFolder: file.isFolder
    });
    const favorites = this.favorites.value.map(f => f.data);
    await this.driveProvider.updateFile(this.favoriteFileId, JSON.stringify(favorites));
  }

  async removeFavorite(file: TreeFile) {
    this.favorites.value = this.favorites.value.filter(f => f.data.id !== file.data.id);
    const favorites = this.favorites.value.map(f => f.data);
    await this.driveProvider.updateFile(this.favoriteFileId, JSON.stringify(favorites));
  }

  async onSelectedFile(file:TreeFile) {
    if (!file.isFolder) {
      return;
    }
  
    if (file.folderFiles) {
      file.folderFiles = undefined;
      return;
    }
  
    const googleFiles = await this.driveProvider.listByFolder(file.data.id);
    file.folderFiles = this.getFilteTreeFiles(googleFiles.files);
  }

  getFilteTreeFiles(files: GoogleDriveFile[]) {
    return files.map((file) => ({ 
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