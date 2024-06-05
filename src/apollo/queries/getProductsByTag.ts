import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_TAG = gql`
  query GetProductsByTag($tagIn: [String]) {
    products(where: { tagIn: $tagIn }) {
      edges {
        node {
          id
          name
          type
          image {
            altText
            sourceUrl
          }
          ... on VariableProduct {
            id
            name
            regularPrice
            slug
          }
          ... on SimpleProduct {
            id
            name
            regularPrice
            slug
          }
        }
      }
    }
  }
`;
