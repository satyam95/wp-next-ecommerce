import { gql } from "@apollo/client";

export const GET_PRODUCT_ATTRIBUTES_BY_CATEGORY = gql`
  query GetProductsByCategory($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      id
      name
      allAttributes {
        label
        name
        options {
          count
          name
        }
      }
    }
  }
`;
