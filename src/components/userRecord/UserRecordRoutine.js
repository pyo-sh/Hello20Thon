import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteRoutineRequest,
  UpdateRoutineNameRequest
} from "../../reducers/day";
import { Button, Icon, Input } from "antd";
import styled from "styled-components";
import UserRecordTraining from "./UserRecordTraining";

const UpperDiv = styled.div`
  padding: 0px 5px;
  margin: 7.5px 0px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  & .List {
    display: flex;
    justify-content: space-between;

    margin: 7px;
    padding-top: 5px;
  }
  & .List-Title-Input {
    width: 225px;
    height: 35px;
    font-size: 20px;
    & :hover,
    :focus {
      border: 1px solid #00cec9;
      box-shadow: 0 0 0 2px #00cec930;
    }
  }
  & .List-Title {
    width: 225px;
    margin-left: 5px;
    font-size: 20px;
    padding: 2px 0;
    padding-left: 7px;
    cursor: pointer;
  }
  & .List-Exercises {
    border-top: 1px solid #d9d9d9;
    margin-top: 20px;
    padding: 5px;
    & .List-Exercises-Title {
      width: 80px;
      position: relative;
      bottom: 20px;
      background-color: white;
      font-size: 17px;
      text-align: center;
    }
  }
  & .List-Exercises-Icon {
    cursor: pointer;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #d9d9d9;
  }
`;
const DeleteButton = styled(Button)`
  width: 60px;
  height: 35px;
`;

const UserRecordRoutine = ({ index, routineProp }) => {
  const dispatch = useDispatch();
  const nowDate = useSelector(state => state.day.nowPointingDate);
  // 추가 제작 시 key 사용
  // const [key, setKey] = useState(0);
  const [name, setName] = useState(""); // 루틴 이름 설정
  const [isNameChanging, setIsNameChanging] = useState(false);
  const [trainings, setTrainings] = useState([]); // 운동들의 배열
  const [isOpened, setIsOpened] = useState(false); // 열 수 있게하는 bool

  // Prop이 바뀔 때 마다 render
  useEffect(() => {
    // setKey(routineProp.key);
    setName(routineProp.routineName);
    setTrainings(routineProp.trainings);
  }, [routineProp]);

  // Trainings의 배열을 card로
  const renderTrainings = () => {
    if (trainings && trainings.length !== 0) {
      return trainings.map((element, i) => (
        <UserRecordTraining
          key={i}
          index={i}
          parentIndex={index}
          trainingProp={element}
        />
      ));
    } else return null;
  };
  // 삭제 버튼을 누를 시 발생
  const deleteOnClick = useCallback(
    e => {
      const userSelect = confirm("정말 삭제하시겠습니까?");
      // confirm 버튼을 눌렀을 때
      if (userSelect) dispatch(DeleteRoutineRequest(nowDate, index));
    },
    [nowDate, index]
  );

  const nameOnClick = useCallback(e => {
    setIsNameChanging(true);
  }, []);
  const updatingName = useCallback(
    e => {
      setName(e.target.value);
    },
    [name]
  );
  const sendUpdateName = useCallback(
    e => {
      if (name && name.trim()) {
        dispatch(UpdateRoutineNameRequest(nowDate, index, name));
      } else {
        setName(routineProp.routineName);
      }
      setIsNameChanging(false);
    },
    [nowDate, index, name, routineProp.routineName]
  );

  // 루틴을 여는 Icon을 눌렀을 때 발생하는 Event
  const openOnClick = useCallback(e => {
    setIsOpened(true);
  }, []);
  const closeOnClick = useCallback(e => {
    setIsOpened(false);
  }, []);

  return (
    <UpperDiv>
      <div className="List">
        {isNameChanging ? (
          <Input
            className="List-Title-Input"
            defaultValue={name}
            onChange={updatingName}
            onPressEnter={sendUpdateName}
          />
        ) : (
          <div className="List-Title" onClick={nameOnClick}>
            {name}
          </div>
        )}
        <DeleteButton type="danger" ghost onClick={deleteOnClick}>
          삭제
        </DeleteButton>
      </div>
      {isOpened ? (
        <>
          <div className="List-Exercises">
            <div className="List-Exercises-Title"> Trainings </div>
            {renderTrainings()}
          </div>
          <div className="List-Exercises-Icon" onClick={closeOnClick}>
            <Icon type="up" />
          </div>
        </>
      ) : (
        <div className="List-Exercises-Icon" onClick={openOnClick}>
          <Icon type="down" />
        </div>
      )}
    </UpperDiv>
  );
};

export default UserRecordRoutine;