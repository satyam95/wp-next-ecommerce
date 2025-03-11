import { gql } from "@apollo/client";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: Int!, $quantity: Int, $clientMutationId: String, $extraData: String) {
  addToCart(
    input: {productId: $productId, quantity: $quantity, clientMutationId: $clientMutationId, extraData: $extraData}
  ) {
    cartItem {
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
