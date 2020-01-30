import React, { useState, useCallback, useEffect } from "react";
import { Input } from "antd";
import StopWatch from "./StopWatch";
import styled from "styled-components";
// stop watch 시 분 초 입력 받는 컴포넌트
const TimerBox = styled.div`
    border : 1px solid #EDEDED;
    border-radius : 5px;
    & div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & div input {
        width : 10vw;
        margin-left: 4px;
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
      <div>
        <h2>스톱워치</h2>
      </div>
      <div>
        <label>시</label>
        <Input placeholder="시" type="number" value={h} onChange={onChangeH} />
      </div>
      <div>
        <label>분</label>
        <Input placeholder="분" type="number" value={m} onChange={onChangeM} />
      </div>
      <div>
        <label>초</label>
        <Input placeholder="초" type="number" value={s} onChange={onChangeS} />
      </div>
      <StopWatch allSeconds={allSeconds} />
    </TimerBox>
  );
};

export default StopWatchForm;
