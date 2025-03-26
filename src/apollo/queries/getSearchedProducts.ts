import { gql } from "@apollo/client";

export const GET_SEARCHED_PRODUCTS = gql`
  query SearchProductQuery($after: String, $first: Int, $search: String) {
    products(where: { search: $search }, first: $first, after: $after) {
      edges {
        node {
          id
          name
          shortDescription
          slug
          averageRating
          featured
          image {
            altText
            sourceUrl
            id
          }
          ... on SimpleProduct {
            salePrice
            regularPrice
            price
          }
          ... on VariableProduct {
            salePrice
            price
            regularPrice
          }
        }
      }
      found
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
