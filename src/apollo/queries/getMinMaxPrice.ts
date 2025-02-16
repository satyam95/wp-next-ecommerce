import { gql } from "@apollo/client";

export const GET_MIN_MAX_PRICE = gql`
  query GetMinMaxPrice {
    minPrice: products(
      where: { orderby: { field: PRICE, order: ASC } }
      first: 1
    ) {
      nodes {
        ... on SimpleProductVariation {
          price(format: RAW)
        }
        ... on SimpleProduct {
          price(format: RAW)
        }
      }
    }
    maxPrice: products(
      where: { orderby: { field: PRICE, order: DESC } }
      first: 1
    ) {
      nodes {
        ... on SimpleProductVariation {
          price(format: RAW)
        }
        ... on SimpleProduct {
          price(format: RAW)
        }
      }
    }
  }
`;
