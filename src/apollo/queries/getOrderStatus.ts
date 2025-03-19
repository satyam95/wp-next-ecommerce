import { gql } from "@apollo/client";

export const GET_ORDER_STATUS = gql`
  query GetOrderStatus($id: ID) {
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
              name
              image {
                altText
                id
                sourceUrl
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
        email
        firstName
        lastName
        phone
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
