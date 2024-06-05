import { gql } from "@apollo/client";

export const GET_BANNER_CAROUSEL = gql`
  query GetBannerCarousel {
    bannerCarousels {
      edges {
        node {
          id
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
