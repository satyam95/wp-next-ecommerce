import { gql } from "@apollo/client";

export const GET_PAGE_SEO_DATA = gql`
  query getSeoData($id: ID!) {
    page(idType: URI, id: $id) {
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
        readingTime
        twitterDescription
        twitterTitle
        schema {
          articleType
          pageType
          raw
        }
        twitterImage {
          altText
        }
      }
    }
  }
`;
