import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import  GET_USERS  from "../queries/GetAllUsers";
import Loader from '../components/Loader'
import { isRequiredInputField } from "graphql";



export const CREATE_USER = gql`  
    mutation MergePerson($email: String!, $name: String!, $active: Boolean!, $userIconUrl: String,$role: String) {
        mergePerson(email: $email, name: $name, active: $active, userIconUrl: $userIconUrl, role: $role) {
            name
            email
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

    return (
        <div>
            
        </div>

    )

}

    export default addUser;



