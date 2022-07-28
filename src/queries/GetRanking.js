import React from "react";
import { gql, useQuery } from '@apollo/client';
import Loader from "../components/Loader";


const GET_RANKING = gql`
query GET_RANKING($where: USERWhere) {
    users(where: $where) {
      showsConnection {
        edges {
          ranking
        }
      }
      shows {
        name
      }
    }
  }
`


const GetRanking = (args) => {
    const { loading, error, data } = useQuery(GET_RANKING, { variables: {
        where: {
            name: args.name
        }
    }});

    if (loading) return <Loader/>;

    if (error) return `Errror! ${error.message}`;

    const show = data.users.shows

    const ranking = data.users.showsConnecton.edges[0]

    return (show, ranking)

  }
  export default GetRanking;




