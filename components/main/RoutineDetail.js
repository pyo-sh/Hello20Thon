import React, { useState,useCallback } from 'react';
import styled from "styled-components";
import { Card, Drawer, Button, Icon, Modal, Select, Form, Input } from 'antd';
import { getExerciseCount, getExerciseName } from "../ExerciseFuction";
import { useDispatch, useSelector } from 'react-redux';
import { AddRecommendRequestAction, GetAreaValueAction, UpdateRecordRequestAction, DeleteRecordRequestAction } from '../../reducers/user';
import Exercise from './Exercise';
const { Option } = Select;
const Content = styled(Card)`
  margin-bottom: 20px;
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

const DeleteIcon = styled.div`
  text-align: right;
  margin-top: -25px;
  margin-right: -15px;
  padding-bottom: -20px;
  font-size: 20px;
  color: gray;
  opacity: 0;

  &:hover {
    opacity: 0.7;
  }
`;

const RoutineDetail = ({myValue, recommendValue}) => {
    const value = myValue || recommendValue;
    const dispatch = useDispatch();
    const [showDetail, setShowDetail] = useState(false);
    const [clickUpdate, setClickUpdate] =useState(false);
    const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);
    // const [isAddRoutineClick, setIsAddRoutineClick] = useState(false);
    const [exerciseAreaValue, setExerciseAreaValue] = useState(0); //운동 부위 값 저장
    const [totalExercise, setTotalExercise] = useState([]);
    const [id, setId] = useState(value.trainings.length+1);
    const [clickInputName, setClickInputName] = useState(false);
    const [updateRoutineName, setUpdateRoutineName] = useState('');
    const [tempName, setTempName] = useState(value.routineName);
    const {_area, _posture, _count} = useSelector(state => state.user);

    //ADD EXERCISE 버튼 클릭
    const onAddExerciseClick = () => {
        setIsAddExerciseClick(true);
    };
    const toggleShow = (e) => {
        setShowDetail(!showDetail);
    }

    const onCloseDrawer = () => {
        setShowDetail(!showDetail);
        setTotalExercise([]);
        setClickUpdate(false)
    };

    const addRecommendRoutine = () => {
        dispatch(AddRecommendRequestAction(value))
        // console.log(value);
    };

    const clickUpdateButton = (e) => {
        setClickUpdate(true);
        setTotalExercise(value.trainings)
    };

    //수정 완료 버튼 눌렀을 때 
    const updateRoutine = () =>{
        dispatch(UpdateRecordRequestAction(value.key, totalExercise, tempName));
        setClickUpdate(false);
        setTotalExercise([]);
        setShowDetail(!showDetail);
    };

    //Modal의 OK버튼 눌렀을 경우
    const onOkModal = () => {
        setTotalExercise([...totalExercise, {id : id ,area :_area, posture: _posture, count: _count}]);
        setIsAddExerciseClick(false);
        setId(id+1)
    };

    const onCloseModal = () => {
        setIsAddExerciseClick(false);
    };

    //운동 부위 값 가져오기
    const getAreaValue = value => {
        dispatch(GetAreaValueAction(value));
        setExerciseAreaValue(value);
    };

    const deleteTotalExercise = id => e => {
        const temp = totalExercise.filter(exercise => exercise.id !== id);
        setTotalExercise(temp);
    };

    const deleteRecord = () =>{
        dispatch(DeleteRecordRequestAction(value.key));
    };

    //루틴 이름 입력
    const onChangeText = useCallback(e => {
        setUpdateRoutineName(e.target.value);
    }, []);

    //루틴 이름 저장
    const onRoutineName = useCallback(
        e => {
        e.preventDefault();
        if (!updateRoutineName || !updateRoutineName.trim()) {
            alert("공백 금지!");
        } else {
            setClickInputName(!clickInputName);
            setTempName(updateRoutineName);
        }
        },
        [updateRoutineName]
    );

    const routineNameUpdate = () => {
        setClickInputName(!clickInputName);
    }
    return (
        <>
            <Content>
            {/* 추천 루틴은 삭제 안되게!!! */}
            {
                myValue ?
                <>
                <DeleteIcon>
                <Icon
                  type="close"
                  onClick={deleteRecord}
                />
                </DeleteIcon>
                </>
                :
                <></>
            }
                <Routine onClick={toggleShow}>{value.routineName}</Routine>
            </Content>
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
                    // 수정 버튼 눌렀을 경우
                    clickUpdate ?
                    <>
                    {
                        //이름 수정 눌렀을 경우 
                        !clickInputName ? (
                        <>
                        <div>{tempName}</div>
                        <Button type="primary" onClick={routineNameUpdate}>수정</Button>
                        </>
                        ) : (
                        <Form onSubmit={onRoutineName}>
                            <Input
                            placeholder="루틴의 이름을 작성하세요"
                            onChange={onChangeText}
                            value={updateRoutineName}
                            style={{ width: 200 }}
                            />
                            <Button type="primary" htmlType="submit">
                            입력
                            </Button>
                        </Form>
                    )}
                    <ExerciseAdd onClick={onAddExerciseClick}>
                    {/* 이 버튼 누르면 Modal 창 열림 */}
                    <div className="AddRoutine">
                      <div>
                        <Icon type="plus-circle" style={{ fontSize: 30 }} />
                      </div>
                      <div>ADD EXERCISE</div>
                    </div>
                    </ExerciseAdd>
                    
                    {totalExercise.map(training => (
                        <Content>
                            <DeleteIcon>
                                <Icon
                                type="close"
                                onClick={deleteTotalExercise(training.id)}
                                />
                            </DeleteIcon>{" "}
                            <Routine>        
                                <div style={{ fontSize: 25 }}>
                                {getExerciseName(training.posture)}
                                </div>
                                <div style={{ fontSize: 20 }}>
                                {training.count}
                                {getExerciseCount(training.area)}
                                </div>
                            </Routine>
                        </Content>
                    ))}
                    </>
                    : 
                    <>
                    {value.trainings.map(training => (
                        <Content>
                            <Routine>        
                                <div style={{ fontSize: 25 }}>
                                {getExerciseName(training.posture)}
                                </div>
                                <div style={{ fontSize: 20 }}>
                                {training.count}
                                {getExerciseCount(training.area)}
                                </div>
                            </Routine>
                        </Content>
                    ))}
                    </>
                }
            
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
                            {/* myValue의 trainings에 값을 넣어야함 addRecord */}
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

            <Modal
            title="운동 추가하기"
            visible={isAddExerciseClick}
            onOk={onOkModal}
            onCancel={onCloseModal}
            >
            <div>운동 종류</div>
            <Select
              style={{ width: 150, marginRight: 20 }}
              placeholder="Select a exercise"
              onChange={getAreaValue}
            >
              <Option value="aerobic-exercise">유산소 운동</Option>
              <Option value="abs">복근</Option>
              <Option value="quads">하체</Option>
              <Option value="glutes">엉덩이</Option>
              <Option value="triceps">삼두</Option>
              <Option value="biceps">이두</Option>
              <Option value="back">등</Option>
              <Option value="chest">가슴</Option>
            </Select>
            {exerciseAreaValue != null ? (
              <>
                <Exercise value={exerciseAreaValue} />
              </>
            ) : (
              <></>
            )}
          </Modal>
        </>
    );
};

export default RoutineDetail;