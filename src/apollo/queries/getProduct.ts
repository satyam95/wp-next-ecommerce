import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      name
      averageRating
      shortDescription
      description
      type
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
      ... on VariableProduct {
        id
        name
        salePrice
        price
        regularPrice
      }
      ... on SimpleProduct {
        id
        name
        salePrice
        price
        regularPrice
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
      reviews {
        edges {
          node {
            id
            content
            date
            author {
              node {
                email
                id
                name
                avatar {
                  url
                }
              }
            }
          }
          rating
        }
      }
    }
  }
`;
