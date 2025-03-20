import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query GetOrder($id: ID) {
    order(id: $id, idType: DATABASE_ID) {
      id
      orderNumber
      date
      status
      total
      subtotal
      shippingTotal
      lineItems {
        nodes {
          id
          quantity
          total
          product {
            node {
              id
              name
              image {
                sourceUrl
                id
                altText
              }
              ... on SimpleProduct {
                id
                name
                price
              }
              ... on VariableProduct {
                id
                name
                price
              }
            }
          }
        }
      }
      paymentMethodTitle
      shipping {
        address1
        city
        country
        firstName
        lastName
        postcode
        state
      }
      shippingLines {
        nodes {
          id
          orderId
          methodTitle
        }
      }
    }
  }
`;
