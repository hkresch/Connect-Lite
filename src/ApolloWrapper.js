import {
    ApolloClient,
    InMemoryCache,
    HttpLink, 
    ApolloProvider
} from "@apollo/client";
import React, { useState, useEffect } from "react";


function ApolloWrapper ({children}) {
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/",
    });

    const client = new ApolloClient ({
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql"
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;