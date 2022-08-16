const {ApolloServer, gql, ForbiddenError} = require('apollo-server-express');
const neo4j = require("neo4j-driver");
const express = require("express");
const{Neo4jGraphQL} = require("@neo4j/graphql")
require('dotenv').config()
const { resolvers } = require('./resolvers');
const { admin, credential } = require('firebase-admin');

const {getAuth} = require('firebase-admin/auth')
const cors = require('cors');
const bodyParser = require('body-parser');
const { Neo4jGraphQLAuthJWKSPlugin } = require("@neo4j/graphql-plugin-auth");

//install express

const { initializeApp, applicationDefault } = require('firebase-admin/app')

var serviceAccount = require("./private_key.json")

const appAdmin = initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: "https://neo4j.firebaseio.com"
})

const auth = getAuth(appAdmin)



//A schema is a collection of type definitions (hence "typeDefs")
//that together define the "shape" of queries that are executed against
//your data.

//put an ID for the user


const typeDefs = gql`

type USER {
    id: ID! @id(autogenerate: true)
    name: String!
    email: String!
    active: Boolean!
    role: String
    userIconUrl: String!
    shows: [SHOW!]! @relationship(type: "WATCHED", properties:"Ranking", direction: OUT)
    recommendedShows: [SHOW!] @cypher(statement: """
	MATCH (this)-[:WATCHED]->(:SHOW)-[:MEMBER]->(genre:GENRE)<-[:MEMBER]-(s:SHOW)
    WHERE NOT (this)-[:WATCHED]->(s)
    RETURN s
    """)
}

interface Ranking @relationshipProperties {
    ranking: Int
}

type SHOW {
    id: ID! @id(autogenerate: true)
    name: String!
    description: String!
    users: [USER!]! @relationship(type: "WATCHED", properties: "Ranking", direction: IN)
    genres: [GENRE!]! @relationship(type: "MEMBER", direction: OUT)
}

type GENRE {
    id: ID! @id(autogenerate: true)
    name: String!
    shows: [SHOW!]! @relationship(type: "MEMBER", direction: IN)
}

type Mutation {
    mergePerson(email: String!, name: String!, active: Boolean!, role: String, userIconUrl: String): USER @cypher(statement: """
    MERGE (p:USER {email:$email })
    ON CREATE SET p.name = $name, p.active = $active, p.userIconUrl = $userIconUrl,  p.role = 'user'
    ON MATCH SET p.name = $name, p.active = $active, p.userIconUrl = $userIconUrl
    RETURN p
  """)
}

`
const app = express();//express app start-up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.post('/verify', async (req, res) => {
    const id_token = JSON.parse(req.body).token;
    const verifiedUser = await verifyToken(id_token);
    if (!verifiedUser.error) {
        console.log("authorized user: " + JSON.stringify(verifiedUser.email));
        res.send(verifiedUser);
    } else {
        res.status(403).json({ "error": "Forbidden" });
    }
})




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



const neoSchema = new Neo4jGraphQL({typeDefs, driver,
    plugins: { //not sure if I need this
        auth: new Neo4jGraphQLAuthJWKSPlugin({
            secret: "super-secret",
                }),}

});

//start the server, set the context, check for header
const startServer = async () => {
    console.log("server started!")
    neoSchema.getSchema().then(async (schema) => {
        const server = new ApolloServer({
            schema: schema,
            resolvers: resolvers,
            driver,
            context: async ({ req }) => {
                const authHeader = req.headers.authorization;
                if (!authHeader) throw new ForbiddenError("No Authorization header found");
                var token = authHeader.split(/[ ]+/)[1]; //is this how I want to parse it?
                const user = await verifyToken(token);
                if (user.error) throw new ForbiddenError("Unable to verify token");
                console.log("here")
                return {user, driver};
            }
        });
        await server.start()
        server.applyMiddleware({ app, PATH });
    })};





    const verifyToken = async (token) => {
        try {
            const result = await auth.verifyIdToken(token);
            console.log(result)
            return { name: result.name, email: result.email};
        } catch (error) {
            console.log(error);
            return {error: error}
        }
    }




const PORT = 4000;
const PATH = '/graphql'
const LINK = "https://localhost/4000"
startServer();//neo4j/graphql startup

// The `listen` method launches our web server.
app.listen({ port: PORT, path: PATH }, () => {
    console.log("listening on port " + PORT + PATH + " " + LINK + ". Test credentials by POST to /verify");
});


// neoSchema.getSchema().then((schema) => {
//     const server = new ApolloServer({
//         schema,
//         resolvers
//     });

//     server.listen().then(({url}) => {
//         console.log(`Server ready at ${url}`);
//     });
// })