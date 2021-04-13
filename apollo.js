import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);

export const logUserIn = async (token) => {
  //await AsyncStorage.setItem("token", JSON.stringify(token));
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedIn", JSON.stringify("yse")],
  ]);
  isLoggedInVar(true);
};

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  //uri: "http://164355d0fe93.ngrok.io/graphql"
  uri: "https://nice-stingray-90.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
