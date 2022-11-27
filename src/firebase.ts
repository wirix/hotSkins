import { IInventoryInner } from './@types/interfaces';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app'

interface IStartProfileData {
  uid: string;
  username: string;
  email: string;
  balance: string;
  luckyChance: number;
  inventory: [];
}

interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: IFirebaseConfig = {
  apiKey: "AIzaSyDN07lGFjcBYAmcXZlcD43hrk6jpqHtbtg",
  authDomain: "hotskins-23b4c.firebaseapp.com",
  projectId: "hotskins-23b4c",
  storageBucket: "hotskins-23b4c.appspot.com",
  messagingSenderId: "438463365403",
  appId: "1:438463365403:web:b07b7df54c5db86d4c13be"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const writeUserData = (user: IStartProfileData) => {
  firebase.database().ref(`users/${user.uid}`).set(user).catch(error => {
    console.log(error.message)
  });
}

export const updateBalanceUser = (uid: string, balance: string) => {
  firebase.database().ref(`users/${uid}/balance`).set(Number(balance)).catch(error => {
    console.log(error.message)
  });
}

export const updateInventoryUser = (uid: string, inventory: IInventoryInner[]) => {
  firebase.database().ref(`users/${uid}/inventory`).set(inventory).catch(error => {
    console.log(error.message)
  });
}

export const registerWithEmailAndPassword = async (username: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    let userData: IStartProfileData = {
      uid: user.uid,
      username,
      email,
      balance: '10000',
      luckyChance: 0,
      inventory: [],
    }
    writeUserData(userData)
  } catch (err) {
    return err.code
  }
};

export const funSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    let error = err.message
    return error
  }
};

export const logout = () => {
  signOut(auth)
};