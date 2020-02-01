import React, { useCallback, useState } from "./node_modules/react";
import { useDispatch } from "./node_modules/react-redux";
import { Button, Input } from "./node_modules/antd";
import styled from "./node_modules/styled-components";
import { DeleteMemoRequest, UpdateMemoRequest } from "../../reducers/day";

const MemoItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  & div {
      display : flex;
  }
`;

const UserRecordMemoItem = ({ date, item }) => {
  const dispatch = useDispatch();
  const [updateText, setUpdateText] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const deleteItem = useCallback(() => {
    dispatch(DeleteMemoRequest(date, item.key));
  }, []);


  const doUpdate = useCallback(() => {
    setIsUpdate(true);
    setUpdateText(item.contents);
  }, [item]);
  const cancleUpdate = useCallback(() => {
    setIsUpdate(false);
  }, []);

  const updatingText = useCallback((e) => {
    setUpdateText(e.target.value);
  },[]);

  const sendUpdateText = useCallback(()=> {
    dispatch(UpdateMemoRequest(date, item.key, updateText));
    setIsUpdate(false);
  }, [updateText]);
  return (
    <MemoItemBox>
      {!isUpdate ? (
        <>
          <div>{item.contents}</div>
          <div>
            <Button type="primary" onClick={doUpdate}>
              수정
            </Button>
            <Button type="danger" onClick={deleteItem}>
              삭제
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Input value={updateText} onChange={updatingText}></Input>
          </div>
          <div>
            <Button type="primary" onClick={sendUpdateText}>확인</Button>
            <Button type="danger" onClick={cancleUpdate}>취소</Button>
          </div>
        </>
      )}
    </MemoItemBox>
  );
};

export default UserRecordMemoItem;
