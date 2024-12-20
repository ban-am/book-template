import { AUTH_DATA_KEY, type AuthData } from '@/plugins/auth/googleAuthProvider';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  kind: string; 
}

export interface GoogleDriveFileListResponse {
  files: GoogleDriveFile[];
  incompleteSearch: boolean;
}

export default class GoogleDriveProvider {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: 'https://www.googleapis.com/drive/v3',
      headers: {
           'Content-Type': 'application/json',
      },
    });
  }
  
  getAccessToken() {    
    const storage_data = localStorage.getItem(AUTH_DATA_KEY);
    const auth_data: AuthData | null = storage_data ? JSON.parse(storage_data) : null;
    return auth_data?.access_token;
  }

  async listFiles(query: string): Promise<GoogleDriveFileListResponse> {
    const access_token = this.getAccessToken();

    const response: AxiosResponse<GoogleDriveFileListResponse> = await this.api.get('/files', {
        params: {
            q: query,
            key: localStorage.getItem('api_key'),
            oauth_token: access_token
        },
    });

    return response.data;
  }

  async listByFolder(folderId: string) {
    return this.listFiles(`'${folderId}' in parents`);
  }

  async listInRoot() {
    return this.listFiles(`'root' in parents`);
  }

  async getFile(fileId: string) {
    try {
      const access_token = this.getAccessToken();

      const response: AxiosResponse<Blob> = await this.api.get(`/files/${fileId}`, {
          params: {
              alt: 'media',
          },
          headers: {
              Authorization: `Bearer ${access_token}`
          },
          responseType: 'blob'
      });

      return response.data;
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }

  
  async updateFile(fileId: string, data: any): Promise<void> {
    const apiUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;

    try {
        const access_token = this.getAccessToken();
        const response = await axios.patch(apiUrl, data, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
        } else {
            console.error("Error updating file:", response.status, response.data);
            return;
        }
    } catch (error:any) {
        console.error("Error updating file:", error);
        return;
    }
  }

}