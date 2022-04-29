/* eslint-disable import/no-unresolved */
import { initializeApp } from './Firebase-Import.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAmNjTIcjfH83WxvZ1lHi8z1mChE1Oy3N4',
  authDomain: 'fit-woman-ab127.firebaseapp.com',
  projectId: 'fit-woman-ab127',
  storageBucket: 'fit-woman-ab127.appspot.com',
  messagingSenderId: '868877496758',
  appId: '1:868877496758:web:a8b216df6a98e55fdb1117',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
