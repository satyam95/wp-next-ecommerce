import { gql } from "@apollo/client";

export const EMPTY_CART = gql`
  mutation emptyCart($clientMutationId: String, $clearPersistentCart: Boolean) {
    emptyCart(
      input: {
        clientMutationId: $clientMutationId
        clearPersistentCart: $clearPersistentCart
      }
    ) {
      cart {
        contents {
          itemCount
          productCount
          nodes {
            key
            product {
              node {
                id
                databaseId
                name
                description
                type
                onSale
                slug
                averageRating
                reviewCount
                image {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
                galleryImages {
                  nodes {
                    id
                    sourceUrl
                    srcSet
                    altText
                    title
                  }
                }
              }
            }
            variation {
              node {
                id
                databaseId
                name
                description
                type
                onSale
                price
                regularPrice
                salePrice
                image {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
              attributes {
                id
                name
                value
              }
            }
            quantity
            subtotal
            subtotalTax
            total
          }
        }
        appliedCoupons {
          code
          discountAmount
          discountTax
        }
        subtotal
        subtotalTax
        shippingTax
        shippingTotal
        total
        totalTax
        feeTax
        feeTotal
        discountTax
        discountTotal
      }
    }
  }
`;
