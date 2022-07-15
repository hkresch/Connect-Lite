import React, { useContext, useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { GET_USER } from '../queries/GetUser';
import { CREATE_USER } from '../mutations/AddUser';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from '../firebase';
import { cache } from "webpack";


export const AuthContext = React.createContext() //check if the user is logged in, otherwise don't render the page!!

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => { //eslint-disable-line react/prop-types
    const [authenticated, setAuthenticated] = useState(false); //we start by assuming they are not authenticated (until there's a reason for state change)
    const [user, setUser] = useState() //this is the user(if there is one, otherwise null)
    const [loading, setLoading] = useState(true) //loading... unless there is a user!

    const [createNewUser] = useMutation(CREATE_USER, {
        update(cache, {data: { mergeUser }}) {
            cache.writeQuery({
                query: GET_USER,
              //  variables: {email: mergeUser.email},
              //  data: {user: [mergeUser]}
            })
        }
    })

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, mergeUser) //if there is a detected change in user
        return unsub;
    }, [createNewUser]);

    
    const googleLogin = () => {
        signInWithPopup(auth, googleAuthProvider).catch((err) => {
            console.log(err);
        })

        localStorage.clear();
    }

    //auth values and functions for the app to use for authorization purposes
    const authValue = {
        authenticated,
        user,
        loading,
        googleLogin,
        emailLogin,
        logout,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {loading? <></>: authenticated? children: <Login/>}
            {/*{!loading && children */}
        </AuthContext.Provider>
    )

}







