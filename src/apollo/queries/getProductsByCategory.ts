import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory(
    $slug: [String!]
    $first: Int
    $after: String
    $minPrice: Float
    $maxPrice: Float
    $sizes: [String!]
    $colors: [String!]
    $orderby: [ProductsOrderbyInput!]
  ) {
    productCategories(where: { slug: $slug }) {
      edges {
        node {
          id
          count
          name
          description
          products(
            first: $first
            after: $after
            where: {
              categoryIn: $slug
              minPrice: $minPrice
              maxPrice: $maxPrice
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
                id
                name
                slug
                excerpt
                averageRating
                image {
                  altText
                  sourceUrl
                }
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
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
              total
            }
          }
        }
      }
    }
  }
`;
