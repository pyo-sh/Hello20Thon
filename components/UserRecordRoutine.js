import React, { useCallback, useState, useEffect } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
// import getExerciseName from './ExerciseFuction';
import { getExerciseCount, getExerciseName } from './ExerciseFuction';

const UpperDiv = styled.div`
    position: relative;
    bottom: 10px;
    height: 100%;
    overflow: hidden;
`;

const TrainingDiv = styled.div`
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
    align-items: center;

    border: 2px solid ${props => props.done   ?   "#7bed9faa"   :   "#f5222d50"};
    border-radius: 4px;
    margin: 5px 0;
    padding: 10px;

    & .Training-Div{
        margin-left: 10px;
        font-size: 20px;
    }
`;

const UserRecordRoutine = ( { routineTrainings } ) => {
    const [trainings, setTrainings] = useState([]); // 기록 루틴 리스트

    // componentDidMount
    useEffect(() => {
        setTrainings(routineTrainings);
    },[routineTrainings])

    // { area: "", posture: "", count: number (갯수), done: true/false }
    // 운동들의 출력
    const showTrainings = () => {
        if(trainings && trainings.length !== 0)
        {
            const result = trainings.map((element, index) => (
                <TrainingDiv key={index} done={element.done}>
                    {element.done
                    ?   <Icon type="check" style={{color: '#52c41a', fontSize: '30px'}}/>
                    :   <Icon type="border" style={{fontSize: '27px'}}/>
                    }
                    <div className="Training-Div">
                        {getExerciseName(element.posture)}
                        {element.count}{getExerciseCount(element.area)}
                    </div>
                </TrainingDiv>
            ));
            return result;
        }
        else    console.log("지금은 트레이닝이 없다");
    }

    return (
        <UpperDiv>
            {showTrainings()}
        </UpperDiv>
    );
};

export default UserRecordRoutine;