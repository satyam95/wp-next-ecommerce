import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $first: Int
    $after: String
    $categories: [String!]
    $minPrice: Float
    $maxPrice: Float
    $sizes: [String!]
    $colors: [String!]
    $orderby: [ProductsOrderbyInput!]
  ) {
    products(
      first: $first
      after: $after
      where: {
        categoryIn: $categories
        maxPrice: $maxPrice
        minPrice: $minPrice
        taxonomyFilter: {
          filters: [
            { taxonomy: PA_COLOR, terms: $colors }
            { taxonomy: PA_SIZE, terms: $sizes }
          ]
        }
        orderby: $orderby
      }
    ) {
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
  }
`;
