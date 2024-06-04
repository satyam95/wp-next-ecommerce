import { gql } from "@apollo/client";

export const GET_MENUS = gql`
  query GetMenus {
    menu(id: "dGVybTo3NQ==") {
      menuItems(where: { parentId: "0" }) {
        edges {
          node {
            id
            label
            uri
            childItems {
              edges {
                node {
                  id
                  label
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`;
