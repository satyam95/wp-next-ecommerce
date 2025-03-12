import { gql } from "@apollo/client";

export const UPDATE_CART_ITEM_QUANTITIES = gql`
  mutation UpdateCartItemQuantities(
    $clientMutationId: String
    $key: ID!
    $quantity: Int!
  ) {
    updateItemQuantities(
      input: {
        clientMutationId: $clientMutationId
        items: { key: $key, quantity: $quantity }
      }
    ) {
      items {
        key
        product {
          node {
            id
            databaseId
            name
            slug
            type
            image {
              id
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price
              regularPrice
              soldIndividually
            }
            ... on VariableProduct {
              price
              regularPrice
              soldIndividually
            }
          }
        }
        variation {
          node {
            id
            databaseId
            name
            slug
            image {
              id
              sourceUrl
              altText
            }
            price
            regularPrice
          }
        }
        quantity
        total
        subtotal
        subtotalTax
        extraData {
          key
          value
        }
      }
    }
  }
`;
