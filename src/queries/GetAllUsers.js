import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loader from '../components/Loader';
import { Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const GET_USERS = gql`
query Query {
    users {
      name
    }
  }
`


function GetAllUsers () {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <Loader/>;

    if (error) return `Error! ${error.message}`;
    
    const source = []
    for (let i = 0; i<data.users.length; i++){
        source.push({title: data.users[i].name, description: data.users[i].email})
    }
    console.log(source)


    return (
        <>
        <h1 style={{justifyContent: 'center'}}>Users</h1>
        <List
        style={{justifyContent: 'center', fontSize: '25px'}}
        itemLayout="horizontal"
        dataSource={source}
        renderItem={(item) => (
            <List.Item style={{justifyContent: 'center', fontSize:'25px'}} >
                <List.Item.Meta
                      style={{justifyContent: 'center', fontSize: '25px'}}
                       avatar={<UserOutlined />}
                       title={item.title}
                       description={item.description}
                     />   
            </List.Item>
        )}
        />
        </>
    );
    
} 

export default GetAllUsers