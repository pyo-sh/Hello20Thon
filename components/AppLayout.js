import React from "react";
import Link from 'next/link';
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import styled from "styled-components";
const { Header, Footer } = Layout;

const LayoutHeader = styled(Header)`
  background: white;
  display: flex;
`;

const LayoutFooter = styled(Footer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AppLayout = ({ children }) => {
  return (
    <div>
      <LayoutHeader>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="home"><Link href="/"><a>HYM</a></Link></Menu.Item>
          <Menu.Item key="howtouse"><Link href="howtouse"><a>사용법</a></Link></Menu.Item>
        </Menu>
      </LayoutHeader>
      {children}
      <LayoutFooter>HYM : Team DPengers</LayoutFooter>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
