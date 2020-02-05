import React, { useCallback, useState } from "react";
import { Input, Button, Row, Col } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AddMemoRequest } from "../../reducers/day";
import UserRecordMemoItem from "./UserRecordMemoItem";

const UpperDiv = styled.div`
  & .Memo-Get {
    padding: 5px 0;
    display: flex;
    align-items: center;
  }
`;
const AddInput = styled(Input)`
  margin-right: 5px;
  height: 35px;
  & :hover,
  :focus {
    border: 1px solid #f1c40f;
    box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
  }
`;

const AddButton = styled(Button)`
  width: 60px;
  height: 35px;
  color: #e58e26;
  border: 1px solid #f1c40f;
  & :hover,
  :focus {
    color: #f1c40f;
    border: 1px solid #f1c40f;
  }
`;

const UserRecordMemo = ({ date, memo }) => {
  const dispatch = useDispatch();
  const [memoText, setMemoText] = useState("");
  const addMemoText = useCallback(() => {
    // 메모추가
    if (memoText && memoText.trim()) {
      // 메모 추가 할 때 디스패치
      dispatch(AddMemoRequest(date, memoText));
      setMemoText("");
    }
  }, [memoText]);

  const onChangeMemoText = useCallback(e => {
    setMemoText(e.target.value);
  }, []);
  return (
    <UpperDiv>
      <div className="Memo-Items">
        {memo &&
          memo.map(mo => (
            <UserRecordMemoItem key={mo.key} date={date} item={mo} />
          ))}
      </div>
      <div className="Memo-Get">
        <AddInput
          placeholder="What did you do?"
          value={memoText}
          onChange={onChangeMemoText}
          onPressEnter={addMemoText}
        />
        <AddButton onClick={addMemoText}>추가</AddButton>
      </div>
    </UpperDiv>
  );
};

export default UserRecordMemo;
