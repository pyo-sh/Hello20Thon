import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled(Card)`
    margin-bottom: 20px;
    width: 300px;
    font-size: 18px;
`;

const Routine = styled.div`
    text-align: center;
    cursor: pointer;
`;

const RecommendRoutine = () => {
    return (
    <>
    <ContentForm>
        <Content>
                <Routine>상체 운동</Routine>
            </Content>
            <Content>
                <Routine>하체 운동</Routine>
        </Content>
    </ContentForm> 
    </>
    );
};

export default RecommendRoutine;