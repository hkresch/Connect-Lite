import React, {useEffect} from 'react';
import Loader from './Loader';
import {GetUser}  from '../queries/GetUser';
import { userProfileState } from '../atoms/UserInfoAtom';
import { useRecoilValue } from 'recoil';
import {showsState, RankingsState} from '../atoms/ShowInfoAtom'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Rate } from 'antd';
import { PlaySquareOutlined } from '@ant-design/icons';
import "../styles/Home.css"



function DisplayUser(){

  

  const user = useRecoilValue(userProfileState)
  const shows = useRecoilValue(showsState)
  const rankings = useRecoilValue(RankingsState)

  console.log(user)

    
const UserInfo = shows.map((show, index) => {
    const rankingContent = rankings[index].ranking;
      return (
        <div>
          <ul>{show.name} : {rankingContent}</ul>
          <ul>{show.description}</ul>
        </div>
      )})
    

      const data = shows.map((show,index) => ({
        title: show.name,
        description: show.description,
        content: rankings[index].ranking,
      }));
      
      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );




    return (
      <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={data}
      footer={
        <div>
          <b>TV Lite</b>
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}

        >
          <List.Item.Meta 
            avatar={<PlaySquareOutlined/>}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          <Rate disabled defaultValue={item.content} />
        </List.Item>
      )}
    />
      
    );
    

} 

export default DisplayUser;
