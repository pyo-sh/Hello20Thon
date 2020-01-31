import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { getExerciseCount, getExerciseName } from '../ExerciseFuction';

const UpperDiv = styled.div`
    position: relative;
    bottom: 10px;
    height: 100%;

    overflow: hidden;
    animation-name: openup; 
    animation-duration: 0.3s;
    @keyframes openup {
        from {
            height: 20px;
        }
        to {
            height: 55px;
        }
    }

    display: flex;
    justify-content: flex-start;
    align-items: center;

    border: 2px solid ${props => props.done   ?   "#7bed9faa"   :   "#f5222d50"};
    border-radius: 4px;
    margin: 5px 0;
    padding: 10px;

    font-size: 20px;

    & .Training-Posture{
        margin-left: 10px;
    }
    & .Training-Count{
        margin-left: auto;
    }
`;

const UserRecordTraining = ( { trainingProp } ) => {
    const [id, setId] = useState(0);            // 운동의 ID
    const [area, setArea] = useState("");       // 운동 범위
    const [posture, setPosture] = useState(""); // 운동 종류
    const [count, setCount] = useState(0);      // 운동 갯수
    const [done, setDone] = useState(false);    // 했는지 안했는지

    // componentDidMount
    useEffect(() => {
        setId(trainingProp.id);
        setArea(trainingProp.area);
        setPosture(trainingProp.posture);
        setCount(trainingProp.count);
        setDone(trainingProp.done);
    },[trainingProp])

    return (
        <UpperDiv done={done}>
            {done
            ?   <Icon type="check" style={{color: '#52c41a', fontSize: '30px'}}/>
            :   <Icon type="border" style={{fontSize: '27px'}}/>
            }
            <div className="Training-Posture">
                {getExerciseName(posture)}
            </div>
            <div className="Training-Count">
                {count}{getExerciseCount(area)}
            </div>
        </UpperDiv>
    );
};

export default UserRecordTraining;