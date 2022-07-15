import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/styles.css"
import { BrowserRouter } from "react-router-dom"
import {
    ApolloClient,
    InMemoryCache,
    HttpLink, 
    ApolloProvider
} from "@apollo/client";


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

//ApolloWrapper is what is breaking it 