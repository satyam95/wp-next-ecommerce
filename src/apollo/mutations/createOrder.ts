import { gql } from "@apollo/client";

export const CREATE_ORDER_MUTATION = gql`
  mutation CheckoutWithCOD(
    $billing: CustomerAddressInput
    $isPaid: Boolean
    $shipping: CustomerAddressInput
    $paymentMethod: String
  ) {
    checkout(
      input: {
        billing: $billing
        shipping: $shipping
        isPaid: $isPaid
        paymentMethod: $paymentMethod
      }
    ) {
      order {
        id
        orderNumber
        status
        total
      }
      result
      redirect
    }
  }
`;
