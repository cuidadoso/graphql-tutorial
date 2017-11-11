import {addMockFunctionsToSchema, makeExecutableSchema,} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Channel {
   id: ID!
   name: String
}

type Query {
   channels: [Channel]    # "[]" means this is a list of channels
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export {schema};