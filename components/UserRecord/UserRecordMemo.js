import React, {useCallback, useState} from 'react';
import { Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AddMemoRequest } from '../../reducers/day';
import UserRecordMemoItem from './UserRecordMemoItem';

const UpperDiv = styled.div`

`;
const AddInput = styled(Input)`

`;

const AddButton = styled(Button)`

`;

const UserRecordMemo = ({date, memo}) => {
    const dispatch = useDispatch();
    const [memoText, setMemoText] = useState('');
    const addMemoText = useCallback(()=> { // 메모추가
        // 메모 추가 할 때 디스패치
        dispatch(AddMemoRequest(date, memoText));
        setMemoText('');
    }, [memoText]);

    const onChangeMemoText = useCallback((e) => {
        setMemoText(e.target.value);
    }, []);
    return (
        <UpperDiv>
            {memo && memo.map(mo => <UserRecordMemoItem key={mo.key} date ={date} item={mo}/>)}
            <AddInput
                placeholder="What did you do?"
                value = {memoText}
                onChange={onChangeMemoText}
                onPressEnter={addMemoText}
            />
            <AddButton onClick={addMemoText}>추가</AddButton>
        </UpperDiv>
    );
};

export default UserRecordMemo;