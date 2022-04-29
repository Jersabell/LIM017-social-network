/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
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
  getCurrentUser,
} from './Firebase-Import.js';

// eslint-disable-next-line no-unused-vars
import { app } from './configurationfirebase.js';

// Inicializando Auth y Firestore
const db = getFirestore();
const auth = getAuth();

// Actualiza la información del usuario
export const updater = (fullName) => updateProfile(auth.currentUser, {
  displayName: fullName,
});

// Enviar email de verificación
export const sendMail = () => sendEmailVerification(auth.currentUser);

// Función para registrarse con correo y contraseña
export const registerUser = (email, password) => {
  auth.languageCode = 'es';
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión - usuarios registrados
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Iniciar sesión con Google
export const startGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Crear un documento con el contenido a publicar en la colección publicaciones
export const toPost = async (contentPost) => {
  const docRef = await addDoc(collection(db, 'publicaciones'), {
    user: getCurrentUser().displayName,
    uid: getCurrentUser().uid,
    dateTime: Timestamp.fromDate(new Date()),
    content: contentPost,
    photo: getCurrentUser().photoURL,
    likes: [],
    likesNumber: 0,
  });
  return docRef;
};

// Leer el contenido de cada documento de la colección publicaciones
const q = query(collection(db, 'publicaciones'), orderBy('dateTime', 'desc'));
export const loadPosts = async (qSnapshot) => {
  // onSnapshot para actualización de datos en timpo real
  await onSnapshot(q, qSnapshot);
};

// Borrar documento que contiene la publicación
export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'publicaciones', id));
};

// Editar Post
export const editPost = (id) => {
  return getDoc(doc(db, 'publicaciones', id));
};

// Actualizar post (documento en firestore)
export const updatePost = (id, newContent) => updateDoc(doc(db, 'publicaciones', id), newContent);

// Funcion para cerrar sesión
export const loginOutUser = () => {
  return signOut(auth);
};

// PARA EL ARRAY
export const arrayU = (data) => { return arrayUnion(data); };
export const arrayR = (data) => { return arrayRemove(data); };

// Observador
export const observator = (callback) => {
  return onAuthStateChanged(auth, callback);
};
