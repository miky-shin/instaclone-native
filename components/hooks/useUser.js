import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY);
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  console.log(hasToken);
  return {data};
}
export default useUser;
