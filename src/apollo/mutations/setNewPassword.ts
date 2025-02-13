import { gql } from "@apollo/client";

export const SET_NEW_PASSWORD_MUTATION = gql`
  mutation SetNewPassword($login: String!, $key: String!, $password: String!) {
    resetUserPassword(
      input: { login: $login, key: $key, password: $password }
    ) {
      user {
        id
      }
    }
  }
`;
