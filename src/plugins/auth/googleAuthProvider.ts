import axios from "axios";
import { ref } from "vue";
import { googleSdkLoaded } from "vue3-google-login";

export type AuthData = {
  client_secret: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  created_at: number;
}

export const AUTH_DATA_KEY = 'auth_data';
export const SECRET_DATA_KEY = 'secret_data';
export const API_KEY_DATA_KEY = 'api_key';

export default class GoogleAuthProvider {
  client_secret = ref<string>();
  api_key = ref<string>();
  auth_data?: AuthData | null;

  async isLogedIn() {
    this.client_secret.value = localStorage.getItem(SECRET_DATA_KEY) || '';
    this.api_key.value = localStorage.getItem(API_KEY_DATA_KEY) || '';
    
    const storage_data = localStorage.getItem(AUTH_DATA_KEY);
    this.auth_data = storage_data ? JSON.parse(storage_data) : null;

    if (!!this.auth_data && !!this.auth_data.refresh_token && !!this.auth_data.client_secret) {
      this.refresh(this.auth_data.refresh_token, this.auth_data.client_secret);
    }

    
    if (this.auth_data) {
      if (this.auth_data.refresh_token && this.auth_data.client_secret)
        this.refresh(this.auth_data.refresh_token, this.auth_data.client_secret);

      else if (this.auth_data.expires_in < Date.now()) {
        localStorage.removeItem(AUTH_DATA_KEY);
        this.auth_data = null;
      }
    }
    
    this.setUrlHasAcessToken();  
    
    if (!this.auth_data) {
      localStorage.removeItem(AUTH_DATA_KEY);
      return false;
    }
    
    return !this.auth_data ? false : true;
  }

  setUrlHasAcessToken() {
    const hash = window.location.hash;

    if (!hash) {
        return;
    }

    // Parse the hash fragment into key-value pairs
    const params = new URLSearchParams(hash.substring(2)); // Remove the leading #

    // Extract the access token and expiration time
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (!accessToken || !expiresIn) {
        return;
    }

    this.auth_data = {
        access_token: accessToken,
        client_secret: this.client_secret.value!,
        expires_in: Date.now() + parseInt(expiresIn) * 1000,
        created_at: Date.now()
    };

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(this.auth_data));

    window.location.replace(window.location.href.split("#")[0]);
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
    this.auth_data.expires_in = Date.now() + auth_data.expires_in * 1000;
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

  redirectSignIn(client_secret: string) {
    localStorage.setItem(SECRET_DATA_KEY, client_secret);

    return window.location.href = 'https://accounts.google.com/o/oauth2/auth?'
      + 'client_id=192037497972-7ervgpvt65ks51p02n8cbfmmqf2mdbeo.apps.googleusercontent.com&'
      + 'response_type=token&'
      + 'redirect_uri=' + import.meta.env.VITE_GOOGLE_REDIRECT_URI + '&'
      + 'scope=%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/drive%20https://www.googleapis.com/auth/drive.appdata%20https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/drive.meet.readonly%20https://www.googleapis.com/auth/drive.metadata%20https://www.googleapis.com/auth/drive.metadata.readonly%20https://www.googleapis.com/auth/drive.photos.readonly%20https://www.googleapis.com/auth/drive.readonly';
  }

  popUpSignIn(client_secret: string) {
    localStorage.setItem(SECRET_DATA_KEY, client_secret);

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