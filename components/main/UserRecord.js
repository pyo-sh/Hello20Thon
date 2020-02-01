import React from 'react';
import { useSelector } from 'react-redux';
import UserRecordMemo from '../userRecord/UserRecordMemo';
import UserRecordWeight from '../userRecord/UserRecordWeight';
import UserRecordRoutine from '../userRecord/UserRecordRoutine';
import styled from 'styled-components';

const UpperDiv = styled.div`
    width: 340px;
    padding: 10px;
    margin: 20px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;

    & .Title{
        font-size: 25px;
        border-bottom: 2px solid #d9d9d9;
        display: flex;
        justify-content: space-between;
        padding-bottom: 4px;
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
                <UserRecordRoutine key={index} index={index} routineProp={element}/>
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
                <div className="Title">
                    루틴
                </div>
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