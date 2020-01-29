import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "use-timer";
import { Button } from 'antd';
import styled from "styled-components";
// stopwatch 버튼 및 초
const TimerBottom = styled.div`
  display: flex;
  flex-direction: column;
  & div p {
    font-size: 20px;
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
      return;
    } else {
      setStartCheck(true);
    }
  }, [time]);

  return (
    <TimerBottom>
      <div>
        <p>{`${hour < 10 ? `0${hour}` : hour} : ${
          minute < 10 ? `0${minute}` : minute
        } : ${second < 10 ? `0${second}` : second}`}</p>
      </div>
      <div>
        <Button type = "primary" onClick={start}>Start</Button>
        <Button type = "danger" onClick={pause}>Pause</Button>
        <Button type="default" onClick={reset}>Reset</Button>
      </div>
    </TimerBottom>
  );
};

export default StopWatch;
