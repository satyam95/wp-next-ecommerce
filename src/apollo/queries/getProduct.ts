import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      name
      shortDescription
      description
      averageRating
      sku
      productTags {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      productCategories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      galleryImages {
        edges {
          node {
            sourceUrl
            altText
            id
          }
        }
      }
      related(first: 4) {
        edges {
          node {
            id
            name
            slug
            image {
              altText
              id
              sourceUrl
            }
          }
        }
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
      type
    }
  }
`;
