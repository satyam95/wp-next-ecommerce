import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          name
          id
          shortDescription
          slug
          averageRating
          featured
          ... on SimpleProduct {
            id
            name
            salePrice
            price
            regularPrice
          }
          ... on VariableProduct {
            id
            name
            salePrice
            price
            regularPrice
          }
          image {
            altText
            sourceUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      found
    }
    productCategories {
      nodes {
        id
        count
        name
        slug
      }
    }
  }
`;
