const {ApolloServer, gql} = require('apollo-server');
const neo4j = require("neo4j-driver");
const{Neo4jGraphQL} = require("@neo4j/graphql")
require('dotenv').config()

//A schema is a collection of type definitions (hence "typeDefs")
//that together define the "shape" of queries that are executed against
//your data.

const typeDefs = gql`

type USER {
    name: String
    skills: [SKILL!]! @relationship(type: "HAS_SKILL", direction: OUT)

}

type SKILL {
    name: String
    users: [USER!]! @relationship(type: "HAS_SKILL", direction: IN)
}

`;


const driver = neo4j.driver(
    "neo4j+s://5ff4c08b.databases.neo4j.io",
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
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

