import React from "react";
import { useState } from "react";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import { Button, Chip, FormControl, Select, TextField } from "@mui/material";
import { ADD_SHOW } from "../mutations/AddShow";
import { GET_SHOWS } from "../queries/GetAllShows";
import { useMutation } from "@apollo/client";






const AddShowButton = () => {

    const user = useRecoilValue(userProfileState)
    const [newShow, setNewShow] = useState("")
    const [genre, setGenre] = useState("")
    

    const [AddShow] = useMutation(ADD_SHOW, {
        refetchQueries: [
            {query: GET_SHOWS},
            'GetShows'
        ],
    })

    if (user.role === "admin"){
        return (
            <div>
            <TextField
            id="outlined-show-input"
            label="Add a Show!"
            type="show"
            onInput={(e) => setNewShow(e.target.value)}
            />
            <Button variant="text" onClick={(e) => AddShow({variables:
                {
                    "input": [
                      {
                        "name": newShow
                      }
                    ]
                  }
            })}>Add Show!</Button>
            <div class="row">
                <div class="col-md-12">
                    <select class="mdb-select colorful-select dropdown-primary md-form" multiple searchable="Search here...">
                        
                    </select>
                </div>
                </div>
            </div>)}
   else{
        return <div/>
    }


}

export default AddShowButton;