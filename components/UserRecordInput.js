import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';

const AddInput = styled(Input)`

`;

const AddButton = styled(Button)`

`;

const UserRecordInput = () => {
    return (
        <Row gutter={[16, 8]}>
            <Col xs={12} xxl={15}>
                <AddInput
                    placeholder="What did you do?"
                />
            </Col>
            <Col xs={4} xxl={4}>
                <AddButton>추가</AddButton>
            </Col>
        </Row>
    );
};

export default UserRecordInput;