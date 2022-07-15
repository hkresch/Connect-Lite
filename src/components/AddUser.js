import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client"


export const CREATE_USER = gql`
mutation ($input: [USERCreateInput!]!) {
    createUsers(input: $input) {
      users {
        name
      }
    }
  }
 `
;;

function addUser() {
    const [name, setName] = useState("");
    const [createTodo, { error }] = useMutation(CREATE_USER, {
        refetchQueries: [
            {
                query: USER_QUERY
            }
        ]
    })
}