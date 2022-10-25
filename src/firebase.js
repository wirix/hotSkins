import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
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

export const writeUserData = (user) => {
  firebase.database().ref('users/' + user.uid).set(user).catch(error => {
    console.log(error.message)
  });
}

export const updateBalanceUser = (uid, balance) => {
  firebase.database().ref('users/' + uid + '/balance').set(balance).catch(error => {
    console.log(error.message)
  });
}

export const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    let userData = {
      uid: user.uid,
      username,
      email,
      balance: 10000,
      luckyChance: 0,
      inventory: [1, 2],
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