import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Icon } from "antd";
import styled from "styled-components";
import { DeleteMemoRequest, UpdateMemoRequest } from "../../reducers/day";

const MemoItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px 5px;
  margin: 7.5px 0px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;

  & .Memo-Item-Contents {
    min-height: 32.5px;
    display : flex;
    align-items: center;
    padding: 4px 11px;
    white-space:pre-wrap;
    cursor : pointer;
    width: 100%;
  }
  & .Memo-Item-Input{
    resize: none;
    overflow: hidden;
    min-height: 32.5px;
    & :hover, :focus{
      border: 1px solid #f1c40f;
      box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
    }
  }
  & .Memo-Item-Icon{
    font-size: 20px;
    margin-left: 10px;
    margin-right: 5px;
    & :hover {
      color : ${props => props.isUpdate ? "yellowgreen" : "red"}
    }
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
  // const cancleUpdate = useCallback(() => {
  //   setIsUpdate(false);
  // }, []);

  const updatingText = useCallback((e) => {
    setUpdateText(e.target.value);
  },[]);

  const sendUpdateText = useCallback(()=> {
    if(updateText && updateText.trim()){
      dispatch(UpdateMemoRequest(date, item.key, updateText));
    }
    setIsUpdate(false);
  }, [updateText]);
  return (
    <MemoItemBox isUpdate={isUpdate}>
      {!isUpdate ? (
        <>
          <div 
            className="Memo-Item-Contents"
            onClick={doUpdate}
            >
            {item.contents}
          </div>
          <Icon
            className="Memo-Item-Icon"
            type="close"
            onClick={deleteItem}
          />
        </>
      ) : (
        <>
          <Input.TextArea
            className="Memo-Item-Input"
            autoSize
            value={updateText}
            onChange={updatingText}
            />
          <Icon
            className="Memo-Item-Icon"
            type="check"
            onClick={sendUpdateText}
            />
        </>
      )}
    </MemoItemBox>
  );
};

export default UserRecordMemoItem;
