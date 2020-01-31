import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import UserRecordTraining from './UserRecordTraining';

const UpperDiv = styled.div`
    padding: 0px 5px;
    margin: 7.5px 0px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    & .List-Title{
        margin: 7px;
        padding-top: 5px;
        font-size: 20px;
    }
    & .List-Exercises{
        border-top: 1px solid #d9d9d9;
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

// key: 0, name: "", trainings: []
const UserRecordRoutine = ( { routineProp } ) => {
    const [key, setKey] = useState(0);
    const [name, setName] = useState("");
    const [trainings, setTrainings] = useState([]);

    // Prop이 바뀔 때 마다 render
    useEffect(() => {
        setKey(routineProp.key);
        setName(routineProp.name);
        setTrainings(routineProp.trainings);
    },[routineProp])

    // Trainings의 배열을 card로
    const renderTrainings = () => {
        if(trainings && trainings.length !== 0){
            return trainings.map((element, index) => (
                <UserRecordTraining key={index} trainingProp={element}/>
            ));
        }
        else    return null;
    }

    return (
        <UpperDiv>
            <div className="List-Title">{name}</div>
            <div className="List-Exercises">
                <div className="List-Exercises-Title"> Trainings </div>
                {renderTrainings()}
            </div>
        </UpperDiv>
    );
};

export default UserRecordRoutine;