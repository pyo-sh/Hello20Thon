import React from "react";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Header, Footer } = Layout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction : column;
  width : 100%;
  height: 100vh;
`;
const LayoutHeader = styled(Header)`
  background: white;
  display: flex;
  justify-content : space-between;
`;

const LayoutFooter = styled(Footer)`
  display: flex;
  margin-top : auto;
  justify-content: center;
  align-items: center;
  font-weight : bold;
  font-size :1em;
`;
const AppLayout = ({ children }) => {
  const {name} = useSelector(state => state.user);
  return (
    <LayoutWrapper>
      <LayoutHeader>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="home"><Link href="/"><a><b>HYM</b></a></Link></Menu.Item>
          <Menu.Item key="howtouse"><Link href="howtouse"><a>사용법</a></Link></Menu.Item>
        </Menu>
        {name && <span>{`${name}님 환영합니다.`}</span>}
      </LayoutHeader>
      {children}
      <LayoutFooter>HYM : Team DPengers</LayoutFooter>
    </LayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
