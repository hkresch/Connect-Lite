import { useMutation, gql } from "@apollo/client";
import { GET_SHOWS } from "../queries/GetAllShows";





export const ADD_SHOW = gql`
mutation ADD_SHOW($input: [SHOWCreateInput!]!) {
    createShows(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

