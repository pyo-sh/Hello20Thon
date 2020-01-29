import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col } from "antd";
import Youtube from "../components/Youtube";
import UserCalender from "./UserCalender";
import UserRecord from "../pages/UserRecord";
import styled from 'styled-components';
import StopWatchForm from "./StopWatchForm";

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
const AppLayout = ({ children }) => {
  // props
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
              {children}
            </Col>
            <Col xs={18} sm={18} xl={9}>
              {/* <Youtube /> */}
            </Col>
            <Col xs={6} sm={6} xl={6}>
              <StopWatchForm/>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
