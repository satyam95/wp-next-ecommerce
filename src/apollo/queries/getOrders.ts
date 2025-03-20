import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders($first: Int, $after: String, $billingEmail: String) {
    orders(
      first: $first
      after: $after
      where: { billingEmail: $billingEmail }
    ) {
      edges {
        cursor
        node {
          id
          orderNumber
          date
          status
          total
          paymentMethodTitle
          lineItems {
            nodes {
              id
              total
              quantity
              product {
                node {
                  id
                  name
                  image {
                    altText
                    sourceUrl
                    id
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
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
