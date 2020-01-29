import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import UserRecordRoutine from './UserRecordRoutine';

const UpperDiv = styled.div`
    & .List-Title{
        margin: 5px 10px;
        font-size: 20px;
    }
    & .List-Exercises{
        border: 1px solid #d9d9d9;
        border-Radius: 4px;
        margin-top: 20px;
        padding: 5px;
        & .List-Exercises-Title{
            width: 80px;
            position: relative;
            bottom: 20px;
            background-color: white;

            font-size: 17px;
            text-align: center;

        }
    }
`;

const dummyRecord = {
    "Wed Jan 01 2020": {
        key: "Wed Jan 01 2020",
        name: "하체 뿜뿜 나만의 운동법",
        trainings: [
            {
                id: 0,
                area: "quads",
                posture: "lunge",
                count: 12,
                done: true,
            },
            {
                id: 1,
                area: "quads",
                posture: "turning-kick",
                count: 5,
                done: false,
            },
            {
                id: 2,
                area: "quads",
                posture: "climber",
                count: 100,
                done: false,
            }
        ],
    },
    "Thu Jan 02 2020": {
        key: "Thu Jan 02 2020",
        name: "어깨 불쑥 어깨깡패 운동법",
        trainings: [

        ],
    },
    "Fri Jan 03 2020": {
        key: "Fri Jan 03 2020",
        name: "뒷태 미남 등 폭발 운동법",
        trainings: [

        ],
    },
    "Sat Jan 04 2020": {
        key: "Sat Jan 04 2020",
        name: "오늘은 조졌다, 삼두이두복근",
        trainings: [

        ],
    },
};

// { area: "", posture: "", count: number (갯수), done: true/false }
const UserRecordList = () => {
    const nowDate = useSelector(state => state.user.nowPointingDate);
    const [recordList, setRecordList] = useState({});

    // componentDidMount
    useEffect(() => {
        setRecordList(dummyRecord);
    },[])

    return (
        <UpperDiv>
            <div className="List-Title">{recordList[nowDate] && recordList[nowDate].name}</div>
            <div className="List-Exercises">
                <div className="List-Exercises-Title"> Trainings </div>
                {recordList[nowDate] && <UserRecordRoutine routineTrainings={recordList[nowDate].trainings}></UserRecordRoutine>}
            </div>
        </UpperDiv>
    );
};

export default UserRecordList;