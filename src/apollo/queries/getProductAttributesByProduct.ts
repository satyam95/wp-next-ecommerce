import { gql } from "@apollo/client";

export const GET_PRODUCT_ATTRIBUTES_BY_PRODUCT = gql`
  query GetProductAttributesByProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      attributes {
        nodes {
          id
          name
          options
          ... on GlobalProductAttribute {
            id
            name
            label
            terms {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
