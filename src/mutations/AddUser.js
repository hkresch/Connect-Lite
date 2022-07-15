import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import  GET_USERS  from "../queries/GetAllUsers";
import Loader from '../components/Loader'
import { isRequiredInputField } from "graphql";





export const CREATE_USER = gql`
mutation Mutation($input:[USERCreateInput!]!){
    createUsers(input: $input) {
        users {
            name 
            email
        }
    }
}
`

const addUser = () => {
    
    
    const [addUser, {data, loading, error, reset}] = useMutation(CREATE_USER,
    {
        refetchQueries: [
            {
            query: GET_USERS
            },
            'GetUsers'
        ]
    });

    if (loading) return <Loader/>;

    if (error) return `Submission error! ${error.message}`;

    addUser({
        variables:{
            "input": [
                {
                    "name": nameInput.value,
                    "id": hfiosa,
                    "email": emailInput.value,
                    "authProvider": authInput.value,

                }
            ]
        }
    });

    return (
        <div>
            <p key={user.name}>
                {user.name}
            </p>
        </div>

    )

}

    export default addUser;



