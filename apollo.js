import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  //await AsyncStorage.setItem("token", JSON.stringify(token));
  await AsyncStorage.setItem(TOKEN, token);
  // await AsyncStorage.multiSet([
  //   [TOKEN, token],
  //   ["loggedIn", "yse"],
  // ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async (logoutUser) => {
  await AsyncStorage.removeItem(TOKEN);
  cache.evict({ id: `User:${logoutUser}` });
  isLoggedInVar(false);
  tokenVar(null);
};

const wsLink = new WebSocketLink({
  uri: "http://localhost:4000/graphql",
  //uri: "ws://gangsgram.herokuapp.com/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`graphQLErrors`, graphQLErrors);
  }
  if (networkError) {
    console.log(`networkError`, networkError);
  }
});

const httpLink = createHttpLink({
  //uri: "http://localhost:4000/graphql",
  //uri: "https://gangsgram.herokuapp.com/graphql",
  //uri:"https://neat-warthog-3.loca.lt/graphql",
});

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",

  //uri: "https://gangsgram.herokuapp.com/graphql",
  //uri:"https://neat-warthog-3.loca.lt/graphql",
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

//apollo3-cache-persist 설치하고 export
export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: (obj) => `User:${obj.username}`,
    },
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  //uri: "http://164355d0fe93.ngrok.io/graphql"
  link: splitLink,
  cache,
  // {
  //   keyArgs: false,
  //   merge(existing = [], incoming = []) {
  //     console.log(existing, incoming);
  //     return [...existing, ...incoming];
  //   },
  // },
});

export default client;
