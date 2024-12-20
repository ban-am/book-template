import type { google } from 'googleapis';

declare global {
  interface Window { 
    gapi?: typeof google;
    google?: typeof google;
  }
}