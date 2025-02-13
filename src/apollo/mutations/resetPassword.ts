import { gql } from "@apollo/client";

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      success
    }
  }
`;
