import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import RoutineDetail from './RoutineDetail';

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RecommendRoutine = () => {
    const {recommendRoutine} = useSelector(state => state.user);
    return (
    <>
    <ContentForm>
        {Object.keys(recommendRoutine).map(value => (
            <RoutineDetail recommendValue={recommendRoutine[value]}/>
        ))}
    </ContentForm> 
    </>
    );
};

export default RecommendRoutine;