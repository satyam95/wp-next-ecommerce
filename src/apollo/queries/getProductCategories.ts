import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
        image {
          altText
          sourceUrl
        }
      }
    }
  }
`;
