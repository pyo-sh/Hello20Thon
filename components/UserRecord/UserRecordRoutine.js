import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRoutineRequest } from '../../reducers/day';
import { Button } from 'antd';
import styled from 'styled-components';
import UserRecordTraining from './UserRecordTraining';

const UpperDiv = styled.div`
    padding: 0px 5px;
    margin: 7.5px 0px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    & .List{
        display: flex;
        justify-content: space-between;

        margin: 7px;
        padding-top: 5px;
    }
    & .List-Title{
        width: 225px;
        margin-left: 5px;
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
const DeleteButton = styled(Button)`
    width: 60px;
    height: 35px;
`;

// key: 0, name: "", trainings: []
const UserRecordRoutine = ( { index, routineProp } ) => {
    const dispatch = useDispatch();
    const nowDate = useSelector(state => state.day.nowPointingDate);
    const [key, setKey] = useState(0);
    const [name, setName] = useState("");
    const [trainings, setTrainings] = useState([]);

    // Prop이 바뀔 때 마다 render
    useEffect(() => {
        setKey(routineProp.key);
        setName(routineProp.routineName);
        setTrainings(routineProp.trainings);
    },[routineProp])

    // Trainings의 배열을 card로
    const renderTrainings = () => {
        if(trainings && trainings.length !== 0){
            return trainings.map((element, i) => (
                <UserRecordTraining key={i} trainingProp={element}/>
            ));
        }
        else    return null;
    }

    const deleteOnClick = useCallback((e) => {
        const userSelect = confirm("정말 삭제하시겠습니까?");
        if(userSelect)  dispatch(DeleteRoutineRequest(nowDate, index));
        else    console.log("겁쟁이녀석,,")
    }, [nowDate, index]);

    return (
        <UpperDiv>
            <div className="List">
                <div className="List-Title">{name}</div>
                <DeleteButton type="danger" ghost onClick={deleteOnClick}>삭제</DeleteButton>
            </div>
            <div className="List-Exercises">
                <div className="List-Exercises-Title"> Trainings </div>
                {renderTrainings()}
            </div>
        </UpperDiv>
    );
};

export default UserRecordRoutine;