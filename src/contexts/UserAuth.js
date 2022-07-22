import React, { useContext, useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { GET_USER } from '../queries/GetUser';
import addUser, { CREATE_USER } from "../mutations/AddUser";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import LoginModal from "../components/LoginModal";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVOpY3zSgbzT858TOiN__DFVaJ2hlwkHE",
  authDomain: "connect-lite-a8eac.firebaseapp.com",
  projectId: "connect-lite-a8eac",
  storageBucket: "connect-lite-a8eac.appspot.com",
  messagingSenderId: "788405864333",
  appId: "1:788405864333:web:864ec251f314bca5935fc4"
};

const app = initializeApp(firebaseConfig);



const auth = getAuth(app);



export const UserAuthContext = React.createContext() // creates a react context fot authorization functionality

// gets the auth context
export const useAuth = () => {
  return useContext(UserAuthContext)
}




// Provides authorization logic and functions for the app
export const UserAuthProvider = ({ children }) => { // eslint-disable-line react/prop-types
  const [authenticated, setAuthenticated] = useState(false) // true if user was successfully authenticated
  const [user, setUser] = useState() // currently logged in user, null if none
  const [loading, setLoading] = useState(true) // start loading, when firebase recognizes if there is a user, is set to false
  // mutation to create a new user in db if needed (otherwise just update name/email/picture)


  const [createNewUser] = useMutation(CREATE_USER, {
    update(cache, { data: { mergePerson } }) {
      // Update the cache for the get user info query
      // mergePerson.email is null?
      cache.writeQuery({
        query: GET_USER,
        variables: { email: mergePerson.email },
        data: { user: [mergePerson] }
      })
    }
    
  }) 

  


  async function mergeUser(firebaseUser){
    if (firebaseUser) {
      const providerData=  firebaseUser.providerData[0] 
      //console.log(providerData)//how is this getting the right info
      // creates a new user in the db if a user with the email provided from google does not already exist
      //console.log(providerData.email)

      const {data : { mergePerson }} = await createNewUser({
        variables: {
          email: providerData.email,
          name: providerData.displayName,
          active: true,
          userIconUrl: providerData.photoURL,
        }
      })
      //console.log(providerData)
      
      //Copy of (mergePerson|non-extensible)
      let mPersonData = Object.create(mergePerson)
      

      
      //mPersonData['picture'] = firebaseUser.photoURL // renaming image property
      
      setUser({name: mPersonData.name, email: mPersonData.email, obj: mPersonData})        
      setAuthenticated(true)
      
    } else {
      // if no user is logged in
      setAuthenticated(false)
      setUser(null)
    }
    setLoading(false)
  }

  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   const user = userCredential.user;
  // })



  useEffect(() => {
    // Runs every time that firebase detects an auth change (auto sign-in, sign out, etc)
      const unsub  =  onAuthStateChanged(auth, mergeUser)
    

    return unsub; // unsubscribe when component is unmounted
    //eslint-disable-next-line
  }, [createNewUser])

  // Performs login verification when a user attempts to login in using google sign-in
  // The majority of the state logic happens in onAuthStateChanged
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    signInWithPopup(auth,provider).catch((err) => { //right Google Auth Provider?
      console.log(err);
    })
  }

  //Perform login verification when a user attempts to login using email and password
  const logInWithEmailAndPassword = () => {
    console.log("hi")
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch(err){
        console.log(err);
    }
  };

const registerWithEmailAndPassword = (auth, email, password) => {
      try{
        console.log(email)
      createUserWithEmailAndPassword(auth, email, password);
      } catch(err){
        console.log(err)
      }
      signInWithEmailAndPassword(auth, email, password);
      }


  // handle logout, majority of state logic in onAuthStateChanged
  const logout = () => {
    auth.signOut().then(() => {
      console.log('logged out');
    }).catch((err) => {
      console.log(err);
    })

    localStorage.clear();
  }



  // auth values and functions to be provided to the app for authorization purposes
  const authValue = {
    authenticated,
    user,
    loading,
    auth,
    googleLogin,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
  }

//console.log(user)
  return (
    <UserAuthContext.Provider value={authValue}>
      {loading ? <></> : authenticated ? children : <LoginModal/>}
      {/* {!loading && children} */}
    </UserAuthContext.Provider>
  )
}







