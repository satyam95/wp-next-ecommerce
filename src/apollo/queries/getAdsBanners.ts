import { gql } from "@apollo/client";

export const GET_ADS_BANNERS = gql`
  query GetAdBanner {
    homeBanners {
      edges {
        node {
          bannerField {
            bannerimage {
              altText
              sourceUrl
            }
            bannerslug {
              url
            }
          }
        }
      }
    }
  }
`;
