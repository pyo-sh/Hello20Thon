import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col } from "antd";
import Youtube from "../components/youtube/Youtube";
import Search from "../components/search/Search";
import UserCalender from "../components/UserCalender";
import UserRecord from "../components/main/UserRecord";
import StopWatchForm from "../components/stopwatch/StopWatchForm";
import Main from '../components/main/Main';
import styled from 'styled-components';
import { SetUserNameAction } from "../reducers/user";

const InputNickname = styled.div`
  width : 100%;
  height : 85vh;
  font-size: 40px;
  font-weight : bold;
  display : flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
  & .nicknameForm{
    display : flex;
  }
  & .nicknameInput {
      width : 80%;
  }

`;
const Home = () => {
  const dispatch  = useDispatch();
  const [check, setCheck] = useState(false);
  const [nickname, setNickname] = useState("");


  useEffect(() => { // 처음에 로컬스토리지에 데이터 저장 되어있는지 확인.
    const checkName = localStorage.getItem("name");
    if (checkName) {
      setCheck(true);
      dispatch(SetUserNameAction(checkName));
    }
   // 처음에 이름 있으면 로컬스토리지 데이터
    // 다들고 와서 기본값으로 세팅해줘야 할듯.
  }, []);
  const onChangeNickname = useCallback(e => { // 이름 적을 때
    setNickname(e.target.value);
  }, []);
  const onSubmitNickname = useCallback(e => { // 이름 제출
      e.preventDefault();
      if(!nickname || !nickname.trim()){
          alert('빈칸은 안 됩니다!!');
          return;
      }
      localStorage.setItem("name", nickname);
      alert(`${nickname}님 환영합니다`);
      dispatch(SetUserNameAction(nickname));
      setCheck(true);
    },
    [nickname]
  );
  return (
    <>
    {!check ? (
        <InputNickname>
          당신의 닉네임을 알려주세요!
          <Form className="nicknameForm" onSubmit={onSubmitNickname}>
            <Input className ="nicknameInput" value={nickname} onChange={onChangeNickname} />
            <Button htmlType="submit" type="primary">입력</Button>
          </Form>
        </InputNickname>
    ) : (
      <div>
        <Row>
          <Col xs={24} sm={12} xl={7}>
            <UserCalender />
            <UserRecord />
          </Col>
          <Col xs={24} sm={12} xl={8}>
            <Main/>
          </Col>
          <Col xs={24} sm={12} xl={9}>
            {/* <Youtube /> */}
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <StopWatchForm/>
            {/* <Search/> */}
          </Col>
        </Row>
      </div>
    )}
  </>
  );
};


export default Home;