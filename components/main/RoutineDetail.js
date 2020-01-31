import React, { useState } from 'react';
import styled from "styled-components";
import { Card, Drawer, Button, Icon } from 'antd';
import { getExerciseCount, getExerciseName } from "../ExerciseFuction";
import { useDispatch } from 'react-redux';
import { AddRecommendRequestAction } from '../../reducers/user';

const Content = styled(Card)`
  width: 300px;
  font-size: 18px;
`;

const Routine = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
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

const RoutineDetail = ({myValue, recommendValue}) => {
    const value = myValue || recommendValue;
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState(false);
    const [clickUpdate, setClickUpdate] =useState(false);

    const toggleShow = (e) => {
        setShowDetail(!showDetail);
    }

    const onCloseDrawer = () => {
        setShowDetail(!showDetail);
        setClickUpdate(false)
    };

    const addRecommendRoutine = () => {
        dispatch(AddRecommendRequestAction(value))
        // console.log(value);
    };

    const clickUpdateButton = () => {
        setClickUpdate(true);
    };

    const updateRoutine = () =>{

    };

    console.log(value);
    return (
        <>
        
            <Content>
                <Routine onClick={toggleShow}>{value.routineName}</Routine>
            </Content>
            {/* {showDetail && value.trainings.map(train => (
                <li>{train.posture} {train.count}</li>
            ))} */}
            <Drawer
                title={value.routineName}
                placement="right"
                width={400}
                closable={false}
                onClose={onCloseDrawer}
                visible={showDetail}
            > 
            <RoutineForm>
                {
                    clickUpdate ?
                    <>
                    <ExerciseAdd>
                    {/* 이 버튼 누르면 Modal 창 열림 */}
                    <div className="AddRoutine">
                      <div>
                        <Icon type="plus-circle" style={{ fontSize: 30 }} />
                      </div>
                      <div>ADD EXERCISE</div>
                    </div>
                    </ExerciseAdd>
                    </>
                    : <></>
                }
            {value.trainings.map(training => (
                <Content>
                    <Routine>        
                        <div style={{ fontSize: 25 }}>
                        {getExerciseName(training.posture)}
                        </div>
                        <div style={{ fontSize: 20 }}>
                        {training.count}
                        {getExerciseCount(training.posture)}
                        </div>
                  </Routine>
                </Content>
            ))}
            </RoutineForm>
                <div
                    style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    borderTop: "1px solid #e9e9e9",
                    padding: "10px 16px",
                    background: "#fff",
                    textAlign: "right"
                    }}
                >
                    {
                        //내 루틴에서 루틴 클릭시 수정 버튼 뜨게
                        myValue ? 
                        <>
                        {
                            //내 루틴 수정 버튼 눌렀을때 수정 화면에서 완료, 취소 버튼 나오게 
                            clickUpdate ? 
                            <>
                            <Button type="primary" onClick={updateRoutine}>
                            완료
                            </Button>
                            <Button onClick={onCloseDrawer} style={{ marginLeft: 8 }}>
                            취소
                            </Button>
                            </>
                            :
                            <>
                            <Button type="primary" onClick={clickUpdateButton} style={{background: "gray", borderColor: "gray"}}>
                            수정
                            </Button>
                            <Button onClick={onCloseDrawer} style={{ marginLeft: 8 }}>
                            취소
                            </Button>
                            </> 
                        }
                        </>
                        :
                        <>
                        <Button type="primary" onClick={addRecommendRoutine}>
                        추가
                        </Button>
                        <Button onClick={onCloseDrawer} style={{ marginLeft: 8 }}>
                        취소
                        </Button>
                        </>
                    }
                </div>
            </Drawer>
        </>
    );
};

export default RoutineDetail;