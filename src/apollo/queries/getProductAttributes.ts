import { gql } from "@apollo/client";

export const GET_PRODUCT_ATTRIBUTES = gql`
  query GetProductAttributes {
    allPaSize {
      nodes {
        count
        id
        name
        slug
      }
    }
    allPaColor {
      nodes {
        count
        id
        name
        slug
      }
    }
  }
`;
