import React, { useState, useCallback } from "react"; // next에서는 안 써도 되지만 useState 등을 사용하기 위해서 어차피 써야함.
import styled from 'styled-components';
import {Tabs} from 'antd';
import MyRoutine from "./MyRoutine";
import RecommendRoutine from "./RecommendRoutine";

// const Menu = styled.div`
//   display: flex;
//   font-size: 25px;
  
//   & .myRoutine{
//     border-bottom: solid 3px gray;
//     margin-right: 30px;
//     cursor: pointer;
//   }

//   & .recommend {
//     border-bottom: solid 3px gray;    
//     cursor: pointer;
//   }
// `;

const Home = () => {
  
  // const [isClick, setIsClick] = useState(false); //디폴트값 '내 루틴'

  // const onClickMine = (e) => {
  //   setIsClick(false);
  // };

  // const onClickRecommend = (e) =>{
  //   setIsClick(true);
  // };

  return (
    <>
      {/* <Menu>
        <div className = "myRoutine" onClick={onClickMine}>내 루틴</div>
        <div className = "recommend" onClick={onClickRecommend}>추천 루틴</div>
      </Menu>
      {
        isClick ? <div>추천</div> : <MyRoutine />
      } */}
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