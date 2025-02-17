import { gql } from "@apollo/client";

export const GET_MIN_MAX_PRICE_BY_CATEGORY = gql`
  query GetMinMaxPriceByCategory($category1: String!) {
    minPrice: products(
      where: { orderby: { field: PRICE, order: ASC }, category: $category1 }
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
      where: { orderby: { field: PRICE, order: DESC }, category: $category1 }
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
