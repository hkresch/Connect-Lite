import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { GenresState } from "../atoms/ShowInfoAtom";
import Loader from "../components/Loader";
import React from "react";




export const GET_GENRES = gql`
query Query {
    genres {
      name
    }
  }
`

// export function GetGenres() {
//   const [genreState, setGenreState] = useRecoilState(GenresState);
//   //set the recoil value

//   const { loading, error, data } = useQuery(GET_GENRES);

//   if (error) return 'Something Bad Happened'

//   if (loading) return <Loader/>


//   const genres = data.genres;

//   console.log(genres)

//   setGenreState(genres)

// }