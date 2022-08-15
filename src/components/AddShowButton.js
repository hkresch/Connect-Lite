import React from "react";
import { useState } from "react";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import { Button, Chip, FormControl, TextField, InputLabel, OutlinedInput } from "@mui/material";
import { ADD_SHOW } from "../mutations/AddShow";
import { GET_SHOWS } from "../queries/GetAllShows";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries/GetGenres";
import 'antd/dist/antd.css'
import { Select } from 'antd'
import { GenresState } from "../atoms/ShowInfoAtom";
import Loader from "./Loader";






const AddShowButton = () => {

    const user = useRecoilValue(userProfileState)
    const [newShow, setNewShow] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    

    const [AddShow] = useMutation(ADD_SHOW, {
        refetchQueries: [
            {query: GET_SHOWS},
            'GetShows'
        ],
    })

    const { loading, error, data } = useQuery(GET_GENRES)

    if (loading) return <Loader/>;
    
    if (error) return "Error";

    console.log(data.genres[0].name)

    let selectedGenres = []

    const { Option } = Select;

    

    const selectGenres = [];


    for (let i = 0; i<(data.genres.length); i++){
        selectGenres.push(<Option key={data.genres[i].name}> {data.genres[i].name}</Option>)
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`)
        selectedGenres = value;
        console.log(selectedGenres)
    }

    if (user.role === "admin"){
        return (
            <div>
            <TextField
            id="outlined-show-input"
            label="Add a Show!"
            type="show"
            onInput={(e) => setNewShow(e.target.value)}
            />
            
            <TextField
            multiline
            id="outlined-show-input"
            label="Add Description!"
            type="description"
            onInput={(e) => setDescription(e.target.value)}
            />
            

            <div>
           <Select
            mode="multiple"
            allowClear
            style={{
                width: '100%',
            }}
            placeholder="Please Select"
            onChange = {handleChange}
            >
                {selectGenres}
            </Select>
            <br/>
                </div>
                <div>
                <Button variant="text" onClick={(e) => AddShow({variables:
            {
                "input": [
                {
                    "name": newShow,
                    "description": description,
                    "genres": {
                    "connect": [
                        {
                        "where": {
                            "node": {
                            "name_IN": selectedGenres,
                            }
                        }
                        }
                    ]
                    }
                }
                ]
            }
            })}>Add Show!</Button>
                </div>
                </div>)}
            
   else{
        return <div/> 
    }


}

export default AddShowButton;