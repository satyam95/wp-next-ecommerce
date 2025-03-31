import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORY_SEO_DATA = gql`
  query getSeoData($idType: ProductCategoryIdType = URI, $id: ID!) {
    productCategory(id: $id, idType: $idType) {
      id
      seo {
        breadcrumbs {
          text
          url
        }
        title
        metaDesc
        canonical
        cornerstone
        focuskw
        fullHead
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphSiteName
        opengraphTitle
        opengraphType
        opengraphUrl
        twitterDescription
        twitterTitle
        schema {
          raw
        }
        twitterImage {
          altText
        }
      }
    }
  }
`;
