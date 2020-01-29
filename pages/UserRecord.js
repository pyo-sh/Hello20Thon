import React from 'react';
import UserRecordInput from '../components/UserRecordInput';
import UserRecordSelect from '../components/UserRecordSelect';
import UserRecordList from '../components/UserRecordList';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const UpperDiv = styled.div`
    width: 350px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;
`;

const UserRecord = () => {
    return (
        <UpperDiv>
            <div className="Title">루틴</div>
            <Row gutter={[16, 8]}>
                <Col xs={8} xxl={12}>
                    <UserRecordSelect/>
                </Col>
            </Row>
            <div className="Memo">메모</div>
            <Row>
                <Col>
                    <UserRecordInput/>
                </Col>
            </Row>
        </UpperDiv>
    );
};

export default UserRecord;