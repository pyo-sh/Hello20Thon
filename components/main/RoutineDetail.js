// 이미 추가 된 루틴에 운동을 추가 할 때 사용하는 컴포넌트
import React, { useState,useCallback , useEffect} from 'react';
import styled from "styled-components";
import { Card, Drawer, Button, Icon, Modal, Select, Form, Input, message } from 'antd';
import { getExerciseCount, getExerciseName } from "../ExerciseFuction";
import { useDispatch } from 'react-redux';
import { AddRecommendRequestAction, UpdateRecordRequestAction, DeleteRecordRequestAction } from '../../reducers/user';
const { Option } = Select;

const ExerciseBox = styled.div`
  font-size: 30px;
  padding: 20px 0;
`;

const Content = styled(Card)`
  width: 300px;
  font-size: 18px;
`;

const Routine = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const RoutineForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & > .InputRoutineName{
      display: flex;
      justify-content: center;
      align-items: center;
  }
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
    const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);    //상세 루틴의 ADD EXERCISE 버튼 클릭 시 
    const [exerciseAreaValue, setExerciseAreaValue] = useState(0); //운동 부위 값 저장
    const [detailExerciseValue, setDetailExerciseValue] = useState(''); //운동 자세 값 저장
    const [exerciseCount, setExerciseCount] = useState(0);  //운동 횟수 저장
    const [totalExercise, setTotalExercise] = useState([]);
    const [id, setId] = useState(value.trainings.length+1);
    const [clickInputName, setClickInputName] = useState(false);
    const [updateRoutineName, setUpdateRoutineName] = useState('');
    const [tempName, setTempName] = useState(value.routineName);

    //상세 루틴의 ADD EXERCISE 버튼 클릭
    const onAddExerciseClick = useCallback(() => {
        setIsAddExerciseClick(true);
    }, []);

    const toggleShow = useCallback(() => {
        setShowDetail(prev => !prev);
    },[]);

    //상세 루틴 정보 Drawer 닫았을때
    const onCloseDrawer = useCallback(() => {
        setShowDetail(prev => !prev);
        setTotalExercise([]);
        setClickUpdate(false);
        setTempName(value.routineName);
    },  [value && value.routineName, showDetail]);

    //내 루틴에 추천 루틴 추가 
    const addRecommendRoutine = useCallback(() => {
        dispatch(AddRecommendRequestAction(value))
        setShowDetail(!showDetail);
    }, [showDetail, value]);

    //상세 루틴의 수정 버튼 눌렀을 때
    const clickUpdateButton = useCallback(() => {
        setClickUpdate(true);
        setTotalExercise(value.trainings);
    }, [value && value.trainings]);

    //수정 완료 버튼 눌렀을 때 
    const updateRoutine = useCallback(() =>{
        dispatch(UpdateRecordRequestAction(value.key, totalExercise, tempName));
        setClickUpdate(false);
        setTotalExercise([]);
    }, [value && value.key, totalExercise, tempName]);

    //상세 루틴의 운동 추가 Modal의 OK버튼 눌렀을 경우
    const onOkModal = useCallback(() => {
        setTotalExercise(prev =>[...prev, {id : id ,area :exerciseAreaValue, posture: detailExerciseValue, count: exerciseCount}]);
        setIsAddExerciseClick(false);
        setId(id+1)
        //임시 저장된 값들 초기화
        setExerciseAreaValue('');  
        setDetailExerciseValue('');
        setExerciseCount(0);
    }, [id, totalExercise, exerciseAreaValue, detailExerciseValue, exerciseCount]);

    //상세 루틴의 운동 추가 Modal 닫을 때 
    const onCloseModal = useCallback(() => {
        setIsAddExerciseClick(false);
    }, []);

    //운동 부위 값 가져오기
    const getAreaValue = useCallback(value => {
        setExerciseAreaValue(value);
    }, []);
    
    //운동 자세 값 저장
    const getDetailValue = useCallback(postureValue => {
        setDetailExerciseValue(postureValue) 
    }, []);

    //운동 횟수 입력
    const onCountText = useCallback((e) => {
        setExerciseCount(e.target.value)
    }, []);

    const deleteTotalExercise = useCallback(id => () => {
        const temp = totalExercise.filter(exercise => exercise.id !== id);
        setTotalExercise(temp);
    },[totalExercise]);

    const deleteRecord = useCallback(() =>{
        dispatch(DeleteRecordRequestAction(value.key));
    }, [value && value.key]);

    //루틴 이름 입력
    const onChangeText = useCallback(e => {
        setUpdateRoutineName(e.target.value);
    }, []);

    //루틴 이름 저장
    const onRoutineName = useCallback(
        e => {
        e.preventDefault();
        if (!updateRoutineName || !updateRoutineName.trim()) {
            message.error("루틴 이름을 입력해 주세요");
        } else {
            setClickInputName(!clickInputName);
            setTempName(updateRoutineName);
        }
        },
        [updateRoutineName, clickInputName]
    );

    const routineNameUpdate = useCallback((e) => {
        setClickInputName(!clickInputName);
    }, [clickInputName]);

    return (
        <>
            <Content onClick={toggleShow}>
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
                <Routine>{value.routineName}</Routine>
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
                        <div className = "InputRoutineName">
                        {tempName}<Button type="link" onClick={routineNameUpdate}>수정</Button>
                        </div>
                        ) : (
                        <Form onSubmit={onRoutineName}>
                            <Input
                            placeholder="루틴의 이름을 작성하세요"
                            onChange={onChangeText}
                            value={updateRoutineName}
                            style={{ width: 200 }}
                            />
                            <Button type="link" htmlType="submit">
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
                    
                    {totalExercise.map((training, i) => (
                        <ExerciseBox key={i}>
                            <Content>
                                <DeleteIcon>
                                    <Icon
                                    type="close"
                                    onClick={deleteTotalExercise(training.id)}
                                    />
                                </DeleteIcon>{" "}
                                <Routine>        
                                    <div style={{ fontSize: 25 }}>
                                    {training.posture}
                                    </div>
                                    <div style={{ fontSize: 20 }}>
                                    {training.count}
                                    {getExerciseCount(training.area)}
                                    </div>
                                </Routine>
                            </Content>
                        </ExerciseBox>
                    ))}
                    </>
                    : 
                    <>
                    {value.trainings.map((training,i) => (
                        <ExerciseBox key={i}>
                        <Content>
                            <Routine>        
                                <div style={{ fontSize: 25 }}>
                                {training.posture}
                                </div>
                                <div style={{ fontSize: 20 }}>
                                {training.count}
                                {getExerciseCount(training.area)}
                                </div>
                            </Routine>
                        </Content>
                        </ExerciseBox>
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
                            <Button type="primary" onClick={clickUpdateButton}>
                            수정
                            </Button>
                            <Button onClick={onCloseDrawer} style={{ marginLeft: 8 }}>
                            취소
                            </Button>
                            </> 
                        }
                        </>
                        :
                        // 추가 루틴을 눌렀을 때 
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
              onChange={getAreaValue}
              value = {Object.keys(getExerciseName).filter(v => v === exerciseAreaValue)}
            >
              {Object.keys(getExerciseName).map((v, i) => <Option value={v} key={i}>{v}</Option>)}
            </Select>
            {exerciseAreaValue 
            ? (<>
                <Select 
                  style={{width: 200}} 
                  value={getExerciseName[exerciseAreaValue].filter(v => v === detailExerciseValue)} 
                  onChange={getDetailValue}
                >
                  {getExerciseName[exerciseAreaValue].map((v, i) => <Option value={v} key={i}>{v}</Option>)}
                </Select>
                <div style={{marginTop: 10}}>
                    <div>운동 시간</div>
                    <Input onChange={onCountText} value={exerciseCount} style={{width: 100}}/>
                </div>
                </>) 
                :
              (
              <></>
            )}
          </Modal>
        </>
    );
};

export default RoutineDetail;