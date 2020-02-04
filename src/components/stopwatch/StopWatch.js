import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTimer } from "use-timer";
import { Button } from 'antd';
import styled from "styled-components";
// stopwatch 버튼 및 초
const TimerBottom = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  & .TimerBottom-Time{
    display: flex;
    justify-content: center;
    font-size: 45px;
    margin-bottom: 15px;
  }
  & .TimerBottom-BtnBox {
    display: flex;
    & Button{
      display: flex;
      justify-content: center;
      flex: 1;
      width: 70px;
      height: 35px;
      margin: 8px;
    }
  }
  & .TimerBottom-Reset{
    & :hover, :focus{
      color: #8854d0;
      background-color: #fff;
      border-color: #8854d0;
    }
  }
`;

const StopWatch = ({ allSeconds }) => {
  const audio = useRef(new Audio("/finish.mp3")); // finish mp3 가져오기
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [startCheck, setStartCheck] = useState(false);
  const { time, start, pause, reset } = useTimer({
    initialTime: allSeconds,
    timerType: "DECREMENTAL",
    endTime: 0
  });
  useEffect(() => {
    // allSeconds가 바뀌면 밑에 시 분 초 가 바뀌게
    reset();
  }, [allSeconds]);

  useEffect(() => {
    // 시 분 초 계산
    setHour(parseInt(time / 3600));
    setMinute(parseInt((time % 3600) / 60));
    setSecond(time % 60);
  }, [time]);

  useEffect(() => {
    // 처음엔 음성 안 나오고 start 누르고 나서부터 음성 나오게
    if (startCheck && time === 0) {
      audio.current.play();
      setStartCheck(false);
      return;
    } 
  }, [time]);

  const onClickStart = useCallback(() => { // 시작하고 stat했다고 체크
    start();
    setStartCheck(true)
  }, [time]);
  return (
    <TimerBottom>
      <div className="TimerBottom-Time">
        {`${hour < 10 ? `0${hour}` : hour} : ${
        minute < 10 ? `0${minute}` : minute} :
        ${second < 10 ? `0${second}` : second}`}
      </div>
      <div className="TimerBottom-BtnBox">
        <Button className="TimerBottom-Btn" type="primary" ghost onClick={onClickStart}>Start</Button>
        <Button className="TimerBottom-Btn" type="danger" ghost onClick={pause}>Pause</Button>
        <Button className="TimerBottom-Reset" type="dashed" onClick={reset}>Reset</Button>
      </div>
    </TimerBottom>
  );
};

export default StopWatch;
