import React, { useContext, useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { GET_USER } from '../queries/GetUser';
import { CREATE_USER } from "../mutations/AddUser";
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
import { auth } from '../firebase';
import LoginModal from "../components/LoginModal";
import addUser from "../mutations/AddUser";
import GetUser from "../queries/GetUser";


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
    update(cache, { data: { User } }) {
      // Update the cache for the get user info query
      cache.writeQuery({
        query: GET_USER,
        variables: { email: User.email },
        data: { user: [User] }
      })
    }
  }) 


//what about register with email and password?
  async function createUser(firebaseUser){
    if (firebaseUser) {
      const providerData=  firebaseUser.providerData[0] //how is this getting the right info
      // creates a new user in the db if a user with the email provided from the google does not already exist
      const {data : { mergePerson }} = await createNewUser({
        variables: {
          email: providerData.email,
          name: providerData.displayName,
        }
      })
      
      //Copy of (mergePerson|non-extensible)
      let mPersonData = Object.create(mergePerson)
      //mPersonData['picture'] = firebaseUser.photoURL // 💩 renaming image property
      setUser({name: mPersonData.name, email: mPersonData.email, obj: mPersonData})        
      setAuthenticated(true)
    } else {
      // if no user is logged in
      setAuthenticated(false)
      setUser(null)
    }
    setLoading(false)
  }



  useEffect(() => {
    // Runs every time that firebase detects an auth change (auto sign-in, sign out, etc)
      const unsub  =  onAuthStateChanged(auth, mergeUser)
    

    return unsub; // unsubscribe when component is unmounted
    //eslint-disable-next-line
  }, [createNewUser])

  // Performs login verification when a user attempts to login in using google sign-in
  // The majority of the state logic happens in onAuthStateChanged
  const googleLogin = () => {
    signInWithPopup(auth,GoogleAuthProvider).catch((err) => { //right Google Auth Provider?
      console.log(err);
    })
  }

  //Perform login verification when a user attempts to login using email and password
  const logInWithEmailAndPassword = () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch(err){
        console.log(err);
        alert(err.message)
    }
  };

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
    googleLogin,
    logInWithEmailAndPassword,
    logout,
  }

  return (
    <UserAuthContext.Provider value={authValue}>
      {loading ? <></> : authenticated ? children : <LoginModal/>}
      {/* {!loading && children} */}
    </UserAuthContext.Provider>
  )
}







