import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders($first: Int, $after: String, $customerId: Int) {
    ordersByCustomerId(
      where: { customerId: $customerId }
      first: $first
      after: $after
    ) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
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
                    price
                  }
                  ... on VariableProduct {
                    price
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
