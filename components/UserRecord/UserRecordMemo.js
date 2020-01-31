import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';

const UpperDiv = styled.div`

`;
const AddInput = styled(Input)`

`;

const AddButton = styled(Button)`

`;

const UserRecordMemo = () => {
    return (
        <UpperDiv>
            <AddInput
                placeholder="What did you do?"
            />
            <AddButton>추가</AddButton>
        </UpperDiv>
    );
};

export default UserRecordMemo;