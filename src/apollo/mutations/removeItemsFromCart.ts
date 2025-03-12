import { gql } from "@apollo/client";

export const REMOVE_ITEMS_FROM_CART = gql`
  mutation removeItemsFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: { keys: $keys, all: $all }) {
      cartItems {
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
