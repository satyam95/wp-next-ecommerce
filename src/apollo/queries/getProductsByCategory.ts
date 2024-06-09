import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($slug: [String]) {
    productCategories(where: { slug: $slug }) {
      edges {
        node {
          id
          count
          name
          description
          products(where: { categoryIn: $slug }) {
            edges {
              node {
                id
                name
                type
                slug
                excerpt
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
          }
        }
      }
    }
  }
`;
