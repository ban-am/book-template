import axios from "axios";
import { ref } from "vue";
import { googleSdkLoaded } from "vue3-google-login";

export type AuthData = {
  client_secret: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  id_token: string;
  created_at: number;
}

export const AUTH_DATA_KEY = 'auth_data';

export default class GoogleAuthProvider {
  client_secret = ref<string>();
  auth_data?: AuthData | null;

  async isLogedIn() {
    const storage_data = localStorage.getItem(AUTH_DATA_KEY);
    this.auth_data = storage_data ? JSON.parse(storage_data) : null;

    if (this.auth_data) {
      this.refresh(this.auth_data.refresh_token, this.auth_data.client_secret);
    }
    
    if (!this.auth_data) {
      localStorage.removeItem(AUTH_DATA_KEY);
      return false;
    }
    
    return !this.auth_data ? false : true;
  }

  async getAuthData(params: any, client_secret: string) {
    try {
      const response = await axios.post<AuthData>('https://oauth2.googleapis.com/token', {
        ...params,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        client_secret: client_secret,
      });

      return response.data;

    } catch (error) {
      localStorage.removeItem(AUTH_DATA_KEY);
      this.auth_data = null;
      return null;
    }
  }

  async refresh(refresh_token: string, client_secret: string) {
    if (!this.auth_data)
      return;
    
    const auth_data = await this.getAuthData({
      refresh_token: refresh_token,
      grant_type: 'refresh_token'
    }, client_secret);

    if (!auth_data)
      return;

    this.auth_data.access_token = auth_data.access_token;
    this.auth_data.expires_in = auth_data.expires_in;
    this.auth_data.created_at = Date.now();

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(this.auth_data));
  }

  async setAuthData(code: string, client_secret: string):Promise<void> {
    console.log('setAuthData', code);
    const auth_data = await this.getAuthData({
      code: code,
      grant_type: 'authorization_code'
    }, client_secret);

    if (!auth_data)
      return;
    
    auth_data.expires_in = auth_data.expires_in;
    auth_data.client_secret = client_secret;
    auth_data.created_at = Date.now();

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(auth_data));
    
    this.auth_data = auth_data;
  }

  signIn(client_secret: string) {
    return new Promise((resolve, reject) => {
      googleSdkLoaded(google => {
        google.accounts.oauth2.initCodeClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          scope: 'openid'
            +' https://www.googleapis.com/auth/userinfo.email'
            +' https://www.googleapis.com/auth/userinfo.profile'
            +' https://www.googleapis.com/auth/drive'
            +' https://www.googleapis.com/auth/drive.appdata'
            +' https://www.googleapis.com/auth/drive.file'
            +' https://www.googleapis.com/auth/drive.meet.readonly'
            +' https://www.googleapis.com/auth/drive.metadata'
            +' https://www.googleapis.com/auth/drive.metadata.readonly'
            +' https://www.googleapis.com/auth/drive.photos.readonly'
            +' https://www.googleapis.com/auth/drive.readonly',
          callback: response => resolve(this.setAuthData(response.code, client_secret)),
        }).requestCode()
      })
    })
  }
}