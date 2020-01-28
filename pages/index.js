import React from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
import {Tabs, Button} from 'antd';
import MyRoutine from "./MyRoutine";
import RecommendRoutine from "./RecommendRoutine";


const Home = () => {
  return (
    <>  
      <Tabs defaultActiveKey="1" style={{width: 400}}>
        <Tabs.TabPane tab="내 루틴" key="1">
          <MyRoutine />
        </Tabs.TabPane>
        <Tabs.TabPane tab="추천 루틴" key="2">
          <RecommendRoutine />
        </Tabs.TabPane>
      </Tabs>
    </> 
  );
};


export default Home;