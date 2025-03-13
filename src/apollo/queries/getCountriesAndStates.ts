import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query getCountries {
    shippingCountries {
      code
      name
    }
  }
`;

export const GET_STATES = gql`
  query getStates($country: CountriesEnum = AD) {
    countryStates(country: $country) {
      code
      name
    }
  }
`;
