export const initializeApp = () => Promise.resolve({});
// Autenticación
export const getAuth = () => ({});
// eslint-disable-next-line max-len
export const createUserWithEmailAndPassword = jest.fn((auth, email, password) => { console.log('hhhhhhhhhhh'); return Promise.resolve({ user: { email, password } }); });
export const updateProfile = jest.fn((fullName) => ({ displayName: fullName }));
export const sendEmailVerification = () => Promise.resolve({});
export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({ }));
// eslint-disable-next-line no-useless-constructor
export class GoogleAuthProvider {}

// eslint-disable-next-line max-len
export const signInWithEmailAndPassword = jest.fn((auth, email, password) => Promise.resolve({ user: { email, password } }));
export const signOut = jest.fn(() => Promise.resolve({}));
export const onAuthStateChanged = jest.fn((auth, callback) => Promise.resolve({ user: {} }));

// getCurrentUser
export const getCurrentUser = jest.fn(() => ({ displayName: 'Lady Gaga' }));

// Firestore
export const getFirestore = () => Promise.resolve({});
export const addDoc = jest.fn((collection, {}) => Promise.resolve({}));
export const collection = (db, publicaciones) => ({});
export const onSnapshot = jest.fn((query, callback) => Promise.resolve({}));
// eslint-disable-next-line no-undef
export const Timestamp = { fromDate: (date) => date };
export const query = () => Promise.resolve({});
export const orderBy = (dateTime, desc) => ({});
export const deleteDoc = () => Promise.resolve({});
export const doc = (db, publicaciones, id) => ({});
export const getDoc = () => Promise.resolve({});
export const updateDoc = () => Promise.resolve({});
export const arrayUnion = () => Promise.resolve({});
export const arrayRemove = () => Promise.resolve({});
