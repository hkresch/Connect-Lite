import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/styles.css"
import { BrowserRouter } from "react-router-dom"
import {
    ApolloClient,
    InMemoryCache,
    HttpLink, 
    ApolloProvider,
} from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserAuthProvider } from "./contexts/UserAuth"
import {RecoilRoot} from 'recoil'
import { setContext } from '@apollo/client/link/context'
import { firebaseConfig } from "./firebase"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"



export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);


// const STAGE = !process.env.REACT_APP_ENVIRONMENT? 'local': process.env.REACT_APP_ENVIRONMENT ;
// //either production, development, or local
// //target graphQL URI depending on the stage from the env file

// const GQL_URI = STAGE === 'production' ? process.env.REACT_APP_PROD_GQL_URI :
//                 STAGE === 'local' ? process.env.REACT_APP_LOCAL_DEV_GQL_URI :
//                 process.env.REACT_APP_REMOTE_DEV_GQL_URI;



const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = setContext(async (_, { headers }) => {
    //get the authentication token from local storage if it exists
     
    const token = await auth.currentUser.getIdToken()

    console.log(token)
    return {
        headers: {
            ...headers,
            authorization: token? `Bearer ${token}` : "",
        }
    }

});



const client = new ApolloClient ({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
    <RecoilRoot>
        <BrowserRouter>
       <ApolloProvider client={client}>
       <UserAuthProvider>
        <App />
        </UserAuthProvider>
        </ApolloProvider>
        </BrowserRouter>
        </RecoilRoot>
        </React.StrictMode>
    
    
)