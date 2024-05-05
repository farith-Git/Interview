import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdz4FA4u3JE07D3gvjGsBj92pS9pHfY1E",
  authDomain: "interview-1b020.firebaseapp.com",
  projectId: "interview-1b020",
  storageBucket: "interview-1b020.appspot.com",
  messagingSenderId: "646293491486",
  appId: "1:646293491486:web:ec66b40a2c878bddd1830f",
  measurementId: "G-GJFX04JYCS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }; // Export the storage object for use in other files