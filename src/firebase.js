import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyDN07lGFjcBYAmcXZlcD43hrk6jpqHtbtg",
  authDomain: "hotskins-23b4c.firebaseapp.com",
  projectId: "hotskins-23b4c",
  storageBucket: "hotskins-23b4c.appspot.com",
  messagingSenderId: "438463365403",
  appId: "1:438463365403:web:b07b7df54c5db86d4c13be"
};
firebase.initializeApp(firebaseConfig)

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    const database = getDatabase();
    const balance = ref(database, 'users/' + uid)
    onValue(balance, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });
  } else {
    console.log('нет')
  }
});

function writeUserData(user) {
  firebase.database().ref('users/' + user.uid).set(user).catch(error => {
      console.log(error.message)
  });
}

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      balance: 0,
    });
    let userData = {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      balance: 0,
    }
    writeUserData(userData)
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