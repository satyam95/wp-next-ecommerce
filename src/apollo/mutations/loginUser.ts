import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      customer {
        sessionToken
        databaseId
        username
        firstName
        lastName
        email
        shipping {
          firstName
          lastName
          address1
          city
          state
          postcode
          country
          email
          phone
        }
        billing {
          firstName
          lastName
          address1
          city
          state
          postcode
          country
          email
          phone
        }
      }
    }
  }
`;
