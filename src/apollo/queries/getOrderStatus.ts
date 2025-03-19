import { gql } from "@apollo/client";

export const GET_ORDER_STATUS = gql`
  query GetOrderStatus($billingEmail: String!, $orderId: ID!) {
    orderByIdAndEmail(billingEmail: $billingEmail, orderId: $orderId) {
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
            name
            image {
              altText
              id
              sourceUrl
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
