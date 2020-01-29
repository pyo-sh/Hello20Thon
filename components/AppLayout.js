import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button, Row, Col } from 'antd';
import Youtube from '../components/Youtube';
import UserCalender from './UserCalender';
import UserRecord from '../pages/UserRecord'

const AppLayout = ({children}) => { // props

    return (
        <div>
            <Row>
                <Col xs={24} lg={7} xl={6}>
                    <UserCalender/>
                    <UserRecord/>
                </Col>
                <Col xs={24} lg={17} xl={9}>
                    {children}
                </Col>
                <Col xs={24} lg={24} xl={9}>
                    {/* <Youtube/> */}
                </Col>
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children : PropTypes.node,
}

export default AppLayout;