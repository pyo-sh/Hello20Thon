import React from 'react';
import {Tabs, Button} from 'antd';
import MyRoutine from "./MyRoutine";
import RecommendRoutine from "./RecommendRoutine";
const Main = () => {
    return (
        <>  
        <Tabs defaultActiveKey="1" style={{width: 400}}>
          <Tabs.TabPane tab="내 루틴" key="1">
            <MyRoutine /> {/*내 루틴 출력*/}
          </Tabs.TabPane>
          <Tabs.TabPane tab="추천 루틴" key="2">
            <RecommendRoutine /> {/*추천 루틴 출력*/}
          </Tabs.TabPane>
        </Tabs>
      </> 
    );
};

export default Main;