


const resolvers = {
    // root entry point to GraphQL service
    Query: {
        User(object, params, ctx, resolveInfo) {
            if (!ctx.req.user) {
                throw new Error("request not authenticated");
            } else {
                return neo4jgraphql(object, params, ctx, resolveInfo);
            }
        },
    },

    Mutation: {
        createUser(object, params, ctx, resolveInfo) {
            if (!ctx.req.user) {
                throw new Error("request not authenticated");
            } else {
                return neo4jgraphql(object, params, ctx, resolveInfo);
            }
        },
    }
};


module.exports = { resolvers };
