import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button, Row, Col } from 'antd';

import UserCalender from './UserCalender';

const AppLayout = ({children}) => { // props

    return (
        <div>
            <Row>
                <Col xs={24} md={6}>
                    <UserCalender/>
                </Col>
                <Col xs={24} md={24}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="#"><a target="_blank">Made by mgw</a></Link>
                </Col>
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children : PropTypes.node,
}

export default AppLayout;