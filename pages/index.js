import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Youtube from "../components/youtube/Youtube";
import UserCalender from "../components/UserCalender";
import UserRecord from "../components/main/UserRecord";
import StopWatchForm from "../components/stopwatch/StopWatchForm";
import Main from '../components/main/Main';
import styled from 'styled-components';

const InputNickname = styled.div`
  position: absolute;
  top : 50%;
  left : 50%;
  transform : translate(-50%, -50%);
  font-size: 40px;
  font-weight : bold;
  
  & .nicknameForm{
    display : flex;
  }
  & .nicknameInput {
      width : 80%;
  }

`;
const Home = () => {
  const [check, setCheck] = useState(false);
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const checkName = localStorage.getItem("name");
    if (checkName) {
      setCheck(true);
    }
  }, []);
  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);
  const onSubmitNickname = useCallback(e => {
      e.preventDefault();
      if(!nickname || !nickname.trim()){
          alert('빈칸은 안 됩니다!!');
          return;
      }
      localStorage.setItem("name", nickname);
      alert(`${nickname}님 환영합니다`);
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
            <Youtube />
          </Col>
          <Col xs={24} sm={12} xl={6}>
            <StopWatchForm/>
          </Col>
        </Row>
      </div>
    )}
  </>
  );
};


export default Home;