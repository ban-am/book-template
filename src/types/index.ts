import type { GoogleDriveFile } from "@/plugins/drive/googleDriveProvider";

export type TreeFile = {
  data: GoogleDriveFile;
  isFolder: boolean;
  folderFiles?: TreeFile[];
}
