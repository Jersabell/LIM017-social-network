/* eslint-disable import/no-unresolved */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js';

export {
  initializeApp,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
export const getCurrentUser = () => getAuth().currentUser;
