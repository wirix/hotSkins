import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN07lGFjcBYAmcXZlcD43hrk6jpqHtbtg",
  authDomain: "hotskins-23b4c.firebaseapp.com",
  projectId: "hotskins-23b4c",
  storageBucket: "hotskins-23b4c.appspot.com",
  messagingSenderId: "438463365403",
  appId: "1:438463365403:web:b07b7df54c5db86d4c13be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    return err.code
  }
};

export const funSignInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    let error = err.message
    return error
  }
};

export const logout = () => {
  signOut(auth)
}