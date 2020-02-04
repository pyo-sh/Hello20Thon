import React from 'react';
import {Tabs} from 'antd';
import MyRoutine from "./MyRoutine";
import RecommendRoutine from "./RecommendRoutine";
import styled from 'styled-components';

const UpperDiv = styled.div`
  margin: 20px;
  padding-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const Main = () => {
    return (
      <UpperDiv>  
        <Tabs defaultActiveKey="1" type="card" style={{width: 400}}>
          <Tabs.TabPane tab="내 루틴" key="1">
            <MyRoutine /> {/*내 루틴 출력*/}
          </Tabs.TabPane>
          <Tabs.TabPane tab="추천 루틴" key="2">
            <RecommendRoutine /> {/*추천 루틴 출력*/}
          </Tabs.TabPane>
        </Tabs>
      </UpperDiv> 
    );
};

export default Main;