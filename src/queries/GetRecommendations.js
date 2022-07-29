import { gql } from "@apollo/client";



export const GET_RECOMMENDATIONS = gql`
query GET_RECOMMENDATIONS($name: String!) {
    recommendShow(name: $name) {
      name
    }
  }
`




