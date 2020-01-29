import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Drawer, Modal, Select, Input, Form, Button } from 'antd';
import styled from 'styled-components';
import Exercise from './Exercise';
import {GetAreaValueAction, ADD_EXERCISE_REQUEST} from '../reducers/user';

const { Option } = Select;

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

//루틴
const Content = styled(Card)`
    margin-bottom: 20px;
    width: 300px;
    font-size: 18px;
`;

//루틴 추가
const ContentAdd = styled(Card)`
    margin-bottom: 20px;
    width: 300px;
    border: dashed 2px lightgray;
    text-align: center;
    font-size: 27px;
    cursor: pointer;
    color: gray;
    /* & .AddRoutine{
        color: gray;
        opacity: 0.8;
        margin-left: -10px;
        display: flex;
        justify-content: space-around;
        align-items:center;
    } */
`;

const RoutineForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

//운동 추가
const ExerciseAdd = styled(Card)`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 300px;
    border: dashed 2px lightgray;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
`;

const Routine = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

// const ExerciseForm = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;

const MyRoutine = () => {
    const [inputRoutineName, setInputRoutineName] = useState('');
    const [clickInput, setClickInput] = useState(false);
    const [isAddRoutineClick, setIsAddRoutineClick] = useState(false);
    const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);
    const [exerciseAreaValue, setExerciseAreaValue] = useState(''); //운동 부위 값 저장
    const {_area, _posture, _count, userRecord} = useSelector(state => state.user);

    const dispatch = useDispatch();
    
    //ADD ROUTINE 버튼 클릭
    const onAddRoutineClick = () => {
        setIsAddRoutineClick(true);
    };

    //ADD EXERCISE 버튼 클릭
    const onAddExerciseClick = () => {
        setIsAddExerciseClick(true);
    };

    const onCloseDrawer = () => {
        setIsAddRoutineClick(false);
    };

    const onOkModal = () => {
        dispatch({
            type: ADD_EXERCISE_REQUEST,
            data: {
              _area,
              _posture,
              _count
            }
        });
        setIsAddExerciseClick(false);
    };

    const onCloseModal = () => {
        setIsAddExerciseClick(false);
    };

    //운동 부위 값 가져오기
    const getAreaValue = (value) => {
        dispatch(GetAreaValueAction(value));
        setExerciseAreaValue(value);
    };

    const onChangeText = useCallback((e) => {
        setInputRoutineName(e.target.value)
    }, []);

    const onRoutineName = useCallback((e) => {
        e.preventDefault();
        if(!inputRoutineName || !inputRoutineName.trim()){
            alert("공백 금지!");
        } else{
            setClickInput(true);
        }
    },[inputRoutineName]);

    return (
        <>
            <ContentForm>
                <Content>
                    <Routine>상체 운동</Routine>
                </Content>
                <Content>
                    <Routine>하체 운동</Routine>
                </Content>
                <ContentAdd onClick={onAddRoutineClick}>    {/* 이 버튼 누르면 Drawer 창 열림 */}
                    <Icon type="plus-circle" style={{fontSize: 30, marginRight:20}}/>ADD ROUTINE
                </ContentAdd>
                <Drawer
                    title="나만의 루틴"
                    placement="right"
                    width={400}
                    closable={false}
                    onClose={onCloseDrawer}
                    visible={isAddRoutineClick}
                >
                    <RoutineForm>
                        {
                            clickInput == true
                            ?
                            <div>{inputRoutineName}</div>
                            :
                            <Form onSubmit={onRoutineName}>
                                <Input placeholder="루틴의 이름을 작성하세요" onChange={onChangeText} value = {inputRoutineName} style={{width: 200}}/>
                                <Button type="primary" htmlType="submit">입력</Button>
                            </Form>
                        }
                        <ExerciseAdd onClick={onAddExerciseClick}>  {/* 이 버튼 누르면 Modal 창 열림 */}
                            <div className = "AddRoutine">
                                <div><Icon type="plus-circle" style={{fontSize: 30}}/></div>    
                                <div>ADD EXERCISE</div>
                            </div>
                        </ExerciseAdd>
                        {userRecord.key.trainings.map((training) => {
                            return (
                                <Content>
                                    <Routine>
                                        <div style={{fontSize: 25}}>{training.posture}</div>
                                        <div style={{fontSize: 20}}>{training.count}</div>
                                    </Routine>
                                </Content>
                            );
                        })
                        }
                        
                    </RoutineForm>

                    <Modal
                        title="운동 추가하기"
                        visible={isAddExerciseClick}
                        onOk={onOkModal}
                        onCancel={onCloseModal}
                    >
                        <div>운동 종류</div>
                        <Select style={{width: 150, marginRight: 20}} placeholder="Select a exercise" onChange={getAreaValue}>
                            <Option value="aerobic-exercise">유산소 운동</Option>
                            <Option value="abs">복근</Option>
                            <Option value="quads">하체</Option>
                            <Option value="glutes">엉덩이</Option>
                            <Option value="triceps">삼두</Option>
                            <Option value="biceps">이두</Option>
                            <Option value="back">등</Option>
                            <Option value="chest">가슴</Option>
                        </Select>
                        {
                            exerciseAreaValue != null 
                            ?
                            <>
                                <Exercise value = {exerciseAreaValue}/>
                            </>
                            :
                            <></>
                        }
                    </Modal>
                    <div
                        style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }}
                    >
                    <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onCloseDrawer} type="primary">
                        Submit
                    </Button>
                    </div>
                </Drawer>
            </ContentForm>
            </>
    );
};

export default MyRoutine;