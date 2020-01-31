import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserRecordMemo from '../UserRecord/UserRecordMemo';
import UserRecordWeight from '../UserRecord/UserRecordWeight';
import UserRecordRoutine from '../UserRecord/UserRecordRoutine';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const UpperDiv = styled.div`
    max-width: 340px;
    min-width: 260px;
    padding: 10px;
    margin: 20px auto;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;

    & .Title{
        font-size: 25px;
        border-bottom: 2px solid #d9d9d9;
    }
    & .Routine{
        margin-bottom: 20px;
    }
`;

const UserRecord = () => {
    const nowDate = useSelector(state => state.day.nowPointingDate);
    const routine  = useSelector(state => state.day.routine[nowDate]);
    const memo = useSelector(state => state.day.memo[nowDate]);
    // 루틴들을 render
    const renderRoutine = () => {
        if(routine && routine.length !== 0){
            return routine.map((element, index) => (
                <UserRecordRoutine key={index} routineProp={element}/>
            ));
        }
        else    return null;
    }

    return (
        <UpperDiv>
            <div className="Weight">
                <UserRecordWeight/>
            </div>
            <div className="Routine">
                <div className="Title">루틴</div>
                {renderRoutine()}
            </div>
            <div className="Memo">
                <div className="Title">메모</div>
                <UserRecordMemo date={nowDate} memo={memo}/>
            </div>
        </UpperDiv>
    );
};

export default UserRecord;