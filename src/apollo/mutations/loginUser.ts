import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      user {
        id
        username
        email
        firstName
        lastName
      }
    }
  }
`;
