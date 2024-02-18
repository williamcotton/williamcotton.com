import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from "@graphql-tools/schema";
import sendgrid from 'sendgrid';
const helper = sendgrid.mail;

const resolveFunctions = {
  JSON: GraphQLJSON,
};

export default ({ schemaString }) => {
  const schema = makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: resolveFunctions,  
  });

  return {
    schema
  };
};
