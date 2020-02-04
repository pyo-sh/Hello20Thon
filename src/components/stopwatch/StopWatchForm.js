import React, { useState, useCallback, useEffect } from "react";
import { Input } from "antd";
import StopWatch from "./StopWatch";
import styled from "styled-components";
// stop watch 시 분 초 입력 받는 컴포넌트
const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  border : 1px solid #d9d9d9;
  border-radius : 5px;
  width: 400px;
  margin: 20px;
  padding: 15px;
  & div input {
    width : 10vw;
    max-width : 100px;
    min-width : 50px;
    margin-left: 4px;
  }
  & .Timer-Title{
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 25px;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
  }
  & .Timer-Body{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .Timer-GetTime{
    margin: 10px;
    & div{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 7px;
    }
    & label{
      font-size: 20px;
      margin-left: 5px;
    }
  }
  & .Timer-Input{
    width: 60px;
    padding-right: 5px;

    font-size: 20px;
    text-align: end;

    border: none;
    border-radius: 0px;
    border-bottom: 2px solid #d9d9d9;
    & ::-webkit-outer-spin-button, ::-webkit-inner-spin-button{
      margin-left: 10px;
    }
    & :hover, :focus{
      border-bottom: 2px solid #00000090;
      box-shadow: none;
    }
  }
`;

// 시 분 초 입력 받기
const StopWatchForm = () => {
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);
  const [allSeconds, setAllSeconds] = useState(0);
  const onChangeH = useCallback(e => {
    setH(parseInt(e.target.value));
  }, []);
  const onChangeM = useCallback(e => {
    setM(parseInt(e.target.value));
  }, []);
  const onChangeS = useCallback(e => {
    setS(parseInt(e.target.value));
  }, []);

  useEffect(() => {
    const sec = (h ? h * 3600 : 0) + (m ? m * 60 : 0) + (s ? s : 0);
    setAllSeconds(sec);
  }, [h, m, s]);
  return (
    <TimerBox>
      <div className="Timer-Title"> 스톱워치 </div>
      <div className="Timer-Body">
        <StopWatch allSeconds={allSeconds} />
        <div className="Timer-GetTime">
          <div>
            <Input
              placeholder="시"
              id="hour"
              type="number"
              className="Timer-Input"
              value={h}
              onChange={onChangeH}
              />
            <label htmlFor="hour">시</label>
          </div>
          <div>
            <Input
              placeholder="분"
              id="minute"
              type="number"
              className="Timer-Input"
              value={m}
              onChange={onChangeM}
              />
            <label htmlFor="minute">분</label>
          </div>
          <div>
            <Input
              placeholder="초"
              id ="second"
              type="number"
              className="Timer-Input"
              value={s}
              onChange={onChangeS}
              />
            <label htmlFor="second">초</label>
          </div>
        </div>
      </div>
    </TimerBox>
  );
};

export default StopWatchForm;
