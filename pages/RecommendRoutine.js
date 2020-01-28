import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Content = styled(Card)`
    margin-left: 20px;
    margin-bottom: 20px;
    width: 300px;
`;

const Routine = styled.div`
    text-align: center;
`;

const RecommendRoutine = () => {
    return (
    <>
        <Content>
            <Routine>상체 운동</Routine>
        </Content>
        <Content>
            <Routine>하체 운동</Routine>
        </Content>
    </>
    );
};

export default RecommendRoutine;