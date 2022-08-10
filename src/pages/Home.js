import React, {useEffect, useState } from "react";
import "../styles/Home.css";
import Loader from "../components/Loader";
import { Layout } from 'antd';
import DisplayUser from "../components/DisplayUser";
import { userProfileState } from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import { GenerateRecommendation } from "../components/GenerateRecommendation";
import 'antd/dist/antd.css';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Tabs, Dropdown, Menu, PageHeader, Row, Tag, Typography } from 'antd';
import { DemoPie } from "../components/RatingsPieChart";
import LogoutModal from "../components/LogoutModal";
const { TabPane } = Tabs;




function Home () {
    const user = useRecoilValue(userProfileState)   

    const { Paragraph } = Typography;

    

    const content = (
      <>
        <Paragraph>
          Ant Design interprets the color system into two levels: a system-level color system and a
          product-level color system.
        </Paragraph>
        <Paragraph>
          Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
          easier for designers to have a clear psychological expectation of color when adjusting colors,
          as well as facilitate communication in teams.
        </Paragraph>

      </>
    );
    
    const Content = ({ children, extraContent }) => (
      <Row>
        <div
          style={{
            flex: 1,
          }}
        >
          {children}
        </div>
        <div className="image">{extraContent}</div>
      </Row>
    );

  

    return (
<>
<LogoutModal/>
        <PageHeader
        title={user.name}
        className="site-page-header"
        subTitle={user.email}
        tags={<Tag color="green">{user.role}</Tag>}
        avatar={{
          src: user.userIconUrl,
        }}
      >
        {/* <Content
          extraContent={
            <img
              src={user.userIconUrl}
              alt="content"
              width="100%"
            />
          }
        >
          {content}
        </Content> */}
        <Tabs defaultActiveKey="1" size={'large'}>
            <TabPane tab="My Shows" key="1"><DisplayUser/></TabPane>
            <TabPane tab="My Genres" key="2"><DemoPie/></TabPane>
            <TabPane tab="Recommendations"><GenerateRecommendation/></TabPane>
        </Tabs>
      </PageHeader>
      
      </>
    );
        


}

export default Home;

{/* <div>
<div className="dashboard">
    <div className="dashboard__container">
        <div>{user.email}</div>
        <DisplayUser/>
</div>
</div> */}