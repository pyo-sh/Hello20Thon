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

const RoutineMainBox = styled.div`
  font-size: 30px;
  padding: 20px 0;
  & > div :hover {
    cursor: pointer;
    border : 1px solid #1890FF;
    color : #1890FF;
    opacity: 0.7;
  }
`;

const RecommendRoutine = () => {
    const {recommendRoutine} = useSelector(state => state.user);
    return (
    <>
    <ContentForm>
        {Object.keys(recommendRoutine).map((value, i) => (
            <RoutineMainBox key={i} >
                <RoutineDetail recommendValue={recommendRoutine[value]}/>
            </RoutineMainBox>
        ))}
    </ContentForm> 
    </>
    );
};

export default RecommendRoutine;