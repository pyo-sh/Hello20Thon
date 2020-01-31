import React, {useCallback, useState} from 'react';
import { Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AddMemoRequest } from '../../reducers/day';
import UserRecordMemoItem from './UserRecordMemoItem';

const UpperDiv = styled.div`
    & .Memo-Get{
        padding: 5px 0;
        display : flex;
        align-items: center;
    }
    & .Memo-Items{
        padding: 10px 5px;
        margin: 7.5px 0px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
`;
const AddInput = styled(Input)`
    margin-right: 5px;
    height: 35px;
    & :hover, :focus{
        border: 1px solid #2ed573;
    }
`;

const AddButton = styled(Button)`
    width: 60px;
    height: 35px;
    color: #2ed573;
    border: 1px solid #2ed573;
    & :hover, :focus{
        color: #2ed573;
        border: 1px solid #2ed573;
    }
`;

const UserRecordMemo = ({date, memo}) => {
    const dispatch = useDispatch();
    const [memoText, setMemoText] = useState('');
    const addMemoText = useCallback(()=> { // 메모추가
        if(memoText && memoText.trim()){
            // 메모 추가 할 때 디스패치
            dispatch(AddMemoRequest(date, memoText));
            setMemoText('');
        }
    }, [memoText]);

    const onChangeMemoText = useCallback((e) => {
        setMemoText(e.target.value);
    }, []);
    return (
        <UpperDiv>
            <div className="Memo-Items">
                {memo && memo.map(mo => <UserRecordMemoItem key={mo.key} date ={date} item={mo}/>)}
            </div>
            <div className="Memo-Get">
                <AddInput
                    placeholder="What did you do?"
                    value = {memoText}
                    onChange={onChangeMemoText}
                />
                <AddButton onClick={addMemoText}>추가</AddButton>
            </div>
        </UpperDiv>
    );
};

export default UserRecordMemo;