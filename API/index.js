const {ApolloServer, gql} = require('apollo-server');
const neo4j = require("neo4j-driver");
const{Neo4jGraphQL} = require("@neo4j/graphql")
require('dotenv').config()
const { resolvers } = require('./resolvers')

//A schema is a collection of type definitions (hence "typeDefs")
//that together define the "shape" of queries that are executed against
//your data.

//put an ID for the user

const typeDefs = gql`

type USER {
    name: String
    id: Int
    email: String 
    authProvider: String
    shows: [SHOW!]! @relationship(type: "WATCHED", direction: OUT)

}

type SHOW {
    name: String
    users: [USER!]! @relationship(type: "WATCHED", direction: IN)
    genres: [GENRE!]! @relationship(type: "MEMBER", direction: OUT)
}

type GENRE {
    name: String
    shows: [SHOW!]! @relationship(type: "MEMBER", direction: IN)
}

`;

//put queries and mutations up here

/*
const { resolvers } = require("./src/resolvers");
const server = new ApollowServer({
    typeDefs,
    resolvers,
});

server.listn().then(({url}) => {
    console.log('Server ready at: ${url}`);
*/


const driver = neo4j.driver(
    "neo4j+s://5ff4c08b.databases.neo4j.io",
    //neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
    neo4j.auth.basic("neo4j", "GbYw2LVIlfAtnXGk1zTRkFWuHZtxzwTgtSdBGX-4Ctw")  //hide this at a later point
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
        resolvers
    });

    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`);
    });
})




// const users = [
//     {
//         title: 'Haley Kresch'
//     },
//     {
//         title: 'Jory Hutchins'
//     },
// ];


// const resolvers = {
//     Query: {
//         users: () => users,
//     },
// }


// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of revolvers
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     csrfPrevention: true,
//     cache: 'bounded',
// })

// // The 'listen' method launches a web server
// server.listen().then(({url}) => {
//     console.log(`Server ready at ${url}`)
// });

