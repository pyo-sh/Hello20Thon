import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddWeightRequest } from "../../reducers/day";
import { Input } from "antd";
import styled from "styled-components";

const UpperDiv = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 10px;
  & .Weight-Amount {
    width: 50px;
    padding: 0 4px;
    margin: 0 2px;
    font-weight: bold;
    text-align: end;
  }
`;
const WeightInput = styled(Input)`
  width: 50px;
  margin: 0 2px;
  text-align: end;
  & ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & :hover,
  :focus {
    border: 1px solid #2ed573;
  }
`;

const UserRecordWeight = () => {
  const dispatch = useDispatch();
  const nowDate = useSelector(state => state.day.nowPointingDate); // 현재 선택한 날짜
  const weight = useSelector(state => state.day.weight[nowDate] || 0); // 무게
  const [isClicked, setIsClicked] = useState(false); // 클릭했는지 (변경할 것인지)
  // const { weightAdded } = useSelector(state => state.day); // 무게에 대한 변경이 완료되었는지 (로딩 추가시 사용)

  // 캘린더를 바꿀 때 몸무게 Div로
  useEffect(() => {
    setIsClicked(false);
  }, [nowDate]);

  // Div를 클릭했을 때
  const onClickDiv = useCallback(e => {
    setIsClicked(true);
  }, []);
  // Input 상태에서 weight에 대한 입력을 받을 때
  const onPressEnter = useCallback(
    e => {
      const value = parseInt(e.target.value);
      if (value) {
        dispatch(AddWeightRequest(nowDate, value));
      }
      // 무게가 추가되면 input -> div 로 바꾸기 위함
      setIsClicked(false);
    },
    [nowDate]
  );

  return (
    <UpperDiv>
      Weight:
      {isClicked ? (
        <WeightInput
          type="number"
          onPressEnter={onPressEnter}
          defaultValue={weight}
        />
      ) : (
        <div className="Weight-Amount" onClick={onClickDiv}>
          {weight}
        </div>
      )}
      kg
    </UpperDiv>
  );
};

export default UserRecordWeight;