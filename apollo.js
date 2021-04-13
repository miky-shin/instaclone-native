import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  //uri: "http://164355d0fe93.ngrok.io/graphql"
  uri: "https://clever-impala-56.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
