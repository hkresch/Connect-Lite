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
    createHttpLink
} from "@apollo/client";
import { auth } from "./firebase"
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserAuthContext } from "./contexts/UserAuth"




// const STAGE = !process.env.REACT_APP_ENVIRONMENT? 'local': process.env.REACT_APP_ENVIRONMENT ;
// //either production, development, or local
// //target graphQL URI depending on the stage from the env file

// const GQL_URI = STAGE === 'production' ? process.env.REACT_APP_PROD_GQL_URI :
//                 STAGE === 'local' ? process.env.REACT_APP_LOCAL_DEV_GQL_URI :
//                 process.env.REACT_APP_REMOTE_DEV_GQL_URI;

// const httpLink = createHttpLink({
//     uri: GQL_URI,
// });

// const authLink = setContext(async (_, { headers }) => {
//     //get the authentication token from local storage if it exists
//     const token = await auth.currentUser.getIdToken()

// })
// use token for authentication


const client = new ApolloClient ({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
});

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter forceRefresh={true}>
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
)