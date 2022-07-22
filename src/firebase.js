import addUser from './mutations/AddUser'
import GetUser from './queries/GetUser.js'

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVOpY3zSgbzT858TOiN__DFVaJ2hlwkHE",
  authDomain: "connect-lite-a8eac.firebaseapp.com",
  projectId: "connect-lite-a8eac",
  storageBucket: "connect-lite-a8eac.appspot.com",
  messagingSenderId: "788405864333",
  appId: "1:788405864333:web:864ec251f314bca5935fc4"
};


// put user object admin
// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const UserCredential = await signInWithPopup(auth, googleProvider);
    const user = UserCredential.user;
    const q = GetUser(user.name);
    if (q.id === 0) {
      await addUser( {  //CHANGE
        id: user.uid,
        name: user.displayName,
        authProvider: "google", //probably unnecessary
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const UserCredential = await createUserWithEmailAndPassword; //change this
    const user = UserCredential.user;
    await addUser ({
      id: user.id,
      name: user.displayName,
      authProvider: "local",
      email: user.email,
    })
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  }
  catch(err) {
    console.error(err);
    alert(err.message);  
  }
};

const logout = () => { 
  signOut(auth)
};


export {
  auth,
  signInWithGoogle,
  signInWithEmailAndPassword, 
  logInWithEmailAndPassword, 
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};




