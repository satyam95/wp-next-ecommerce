import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      databaseId
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
            shortDescription
            averageRating
            image {
              altText
              id
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
      ... on SimpleProduct {
        id
        name
        onSale
        regularPrice
        salePrice
        price
        stockStatus
        stockQuantity
        soldIndividually
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
