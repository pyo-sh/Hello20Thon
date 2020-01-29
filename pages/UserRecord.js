import React from 'react';
import UserRecordMemo from '../components/UserRecordMemo';
import UserRecordSelect from '../components/UserRecordSelect';
import UserRecordList from '../components/UserRecordList';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const UpperDiv = styled.div`
    max-width: 340px;
    min-width: 260px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;

    & .Title{
        font-size: 25px;
    }
`;

const UserRecord = () => {
    return (
        <UpperDiv>
            <div className="Title">루틴</div>
            {/* <Row gutter={[16, 8]}>
                <Col xs={8} xxl={12}>
                    <UserRecordSelect/>
                </Col>
            </Row> */}
            <Row gutter={[16, 8]}>
                <Col>
                    <UserRecordList/>
                </Col>
            </Row>
            <div className="Memo">메모</div>
            <Row>
                <Col>
                    <UserRecordMemo/>
                </Col>
            </Row>
        </UpperDiv>
    );
};

export default UserRecord;