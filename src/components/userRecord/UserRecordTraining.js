import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ToggleTrainingRequest,
  UpdateTrainingCountRequest
} from "../../reducers/day";
import { Icon, Input } from "antd";
import styled from "styled-components";
import { getExerciseCount } from "../ExerciseFuction";

const UpperDiv = styled.div`
  position: relative;
  bottom: 10px;

  margin: 5px 0;
  padding: 10px;
  border: 2px solid ${props => (props.done ? "#7bed9faa" : "#e74c3c")};
  border-radius: 4px;

  overflow: hidden;
  animation-name: openup;
  animation-duration: 0.3s;
  @keyframes openup {
    from {
      height: 0px;
    }
    to {
      height: 55px;
    }
  }
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 20px;

  & .Training-Posture {
    margin-left: 10px;
  }
  & .Training-Count {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    & .Training-Count-Input {
      width: 35px;
      height: 30px;
      & ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      & :hover,
      :focus {
        border: 1px solid #00cec9;
        box-shadow: 0 0 0 2px #00cec930;
      }
      text-align: end;
      padding: 4px 2px;
      margin-bottom: 2px;
      font-size: 20px;
    }
    & .Training-Count-Number {
      width: 35px;
      height: 30px;
      padding: 0 4px;
      padding-bottom: 4px;
      text-align: end;
      cursor: pointer;
    }
    & .Training-Count-Cell {
      width: 22px;
      padding-top: 2px;
      margin-left: 3px;
    }
  }
`;
const DoneIcon = styled(Icon)`
  font-size: 30px;
  color: ${props => (props.myoption === "yes" ? "#52c41a" : "black")};
`;

const UserRecordTraining = ({ index, parentIndex, trainingProp }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0); // 운동의 ID
  const [area, setArea] = useState(""); // 운동 범위
  const [posture, setPosture] = useState(""); // 운동 종류
  const [count, setCount] = useState(0); // 운동 갯수
  const [isCountUpdating, setIsCountUpdating] = useState(false); // 운동 시간 / 갯수 바꾸는 중인지
  const [countDetail, setCountDetail] = useState(""); // 운동 시간인지 횟수인지 구분
  const [done, setDone] = useState(false); // 했는지 안했는지
  const { isTrainingToggling } = useSelector(state => state.day); // 운동 했는지 안했는지 토글
  const nowDate = useSelector(state => state.day.nowPointingDate);

  // componentDidMount
  useEffect(() => {
    setId(trainingProp.id);
    setArea(trainingProp.area);
    setPosture(trainingProp.posture);
    setCount(trainingProp.count);
    setCountDetail(trainingProp.countDetail);
    setDone(trainingProp.done);
  }, [trainingProp]);

  const iconToggle = useCallback(
    e => {
      dispatch(ToggleTrainingRequest(nowDate, parentIndex, index, !done));
    },
    [nowDate, index, parentIndex, done]
  );

  const countOnClick = useCallback(e => {
    setIsCountUpdating(true);
  }, []);
  const sendUpdateCount = useCallback(e => {
    const value = parseInt(e.target.value);
    if (value)
      dispatch(UpdateTrainingCountRequest(nowDate, parentIndex, index, value));
    setIsCountUpdating(false);
  }, []);

  return (
    <UpperDiv done={done}>
      <DoneIcon
        type={isTrainingToggling ? "loading" : done ? "check" : "border"}
        myoption={done ? "yes" : "no"}
        onClick={iconToggle}
      />
      <div className="Training-Posture">{posture}</div>
      <div className="Training-Count">
        {isCountUpdating ? (
          <Input
            className="Training-Count-Input"
            type="number"
            defaultValue={count}
            onPressEnter={sendUpdateCount}
          />
        ) : (
          <div className="Training-Count-Number" onClick={countOnClick}>
            {count}
          </div>
        )}
        <div className="Training-Count-Cell">
          {getExerciseCount(countDetail)}
        </div>
      </div>
    </UpperDiv>
  );
};

export default UserRecordTraining;
