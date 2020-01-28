import React, { useState } from 'react';
import { Card, Icon, Drawer, Modal, Select } from 'antd';
import styled from 'styled-components';
import Exercise from './Exercise';

const { Option } = Select;

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled(Card)`
    margin-bottom: 20px;
    width: 300px;
    font-size: 18px;
`;

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
    justify-content: center;
    align-items: center;
`;

const ExerciseAdd = styled(Card)`
    margin-bottom: 20px;
    width: 300px;
    border: dashed 2px lightgray;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
`;

const Routine = styled.div`
    text-align: center;
`;

// const ExerciseForm = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;

const MyRoutine = () => {
    const [isAddRoutineClick, setIsAddRoutineClick] = useState(false);
    const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);
    const [isValue, setIsValue] = useState('');

    const onAddRoutineClick = () => {
        setIsAddRoutineClick(true);
    };

    const onAddExerciseClick = () => {
        setIsAddExerciseClick(true);
    };

    const onCloseDrawer = () => {
        setIsAddRoutineClick(false);
    };

    const onCloseModal = () => {
        setIsAddExerciseClick(false);
    };

    const getValue = (value) => {
        setIsValue(value);
    };

    return (
        <>
            <ContentForm>
                <Content>
                    <Routine>상체 운동</Routine>
                </Content>
                <Content>
                    <Routine>하체 운동</Routine>
                </Content>
                <ContentAdd onClick={onAddRoutineClick}>
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
                        <ExerciseAdd onClick={onAddExerciseClick}>
                            <div className = "AddRoutine">
                                <div><Icon type="plus-circle" style={{fontSize: 30}}/></div>
                                <div>ADD EXERCISE</div>
                            </div>
                        </ExerciseAdd>
                    </RoutineForm>

                    <Modal
                        title="운동 추가하기"
                        visible={isAddExerciseClick}
                        onOk={onCloseModal}
                        onCancel={onCloseModal}
                    >
                        <div>운동 종류</div>
                        <Select style={{width: 150, marginRight: 20}} placeholder="Select a exercise" onChange={getValue}>
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
                            isValue != null 
                            ?
                            <Exercise value = {isValue}/>
                            :
                            <></>
                        }
                    </Modal>
                </Drawer>
            </ContentForm>
            </>
    );
};

export default MyRoutine;