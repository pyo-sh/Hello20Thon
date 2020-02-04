// 이미 추가 된 루틴에 운동을 추가 할 때 사용하는 컴포넌트
import React, { useState,useCallback , useEffect} from 'react';
import styled from "styled-components";
import { Card, Drawer, Button, Icon, Modal, Select, Form, Input, message, Popconfirm } from 'antd';
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
    font-size: 20px;
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
  & :hover {
    border: dashed 2px #1890FF;
    color: #1890FF;
    opacity: 0.7;
  }
`;

const DeleteIcon = styled.div`
  text-align: right;
  margin-top: -25px;
  margin-right: -15px;
  padding-bottom: -20px;
  font-size: 20px;
  color: gray;
  opacity: 0;
  cursor: pointer;

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
    const [updateRoutineName, setUpdateRoutineName] = useState(''); //수정된 루틴 이름
    const [tempName, setTempName] = useState(value.routineName);    //루틴 이름 수정
    const [directExerciseValue, setDirectExerciseValue] = useState(''); //직접 입력하기
    const [exerciseCountDetail, setExerciseCountDetail] = useState('');  //시간이지 횟수인지

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
        message.success("내 루틴에 추가 완료!")
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
        message.success("수정 완료!")
        dispatch(UpdateRecordRequestAction(value.key, totalExercise, tempName));
        setClickUpdate(false);
        setTotalExercise([]);
    }, [value && value.key, totalExercise, tempName]);

    const onOkModal = useCallback((e) => {
        if(directExerciseValue){
          setTotalExercise([...totalExercise, {id: id, area: exerciseAreaValue, posture: directExerciseValue, count: exerciseCount, countDetail: exerciseCountDetail}]);
          setDirectExerciseValue('');
        } else{
          //추가 할 운동의 id와 운동 부위, 운동 자세, 운동 횟수 배열에 추가
          setTotalExercise([...totalExercise, {id : id ,area : exerciseAreaValue, posture: detailExerciseValue, count: exerciseCount, countDetail: exerciseCountDetail}]);
        }
        setId(id+1);
        setIsAddExerciseClick(false);
        //임시 저장된 값들 초기화
        setExerciseAreaValue('');  
        setDetailExerciseValue('');
        setExerciseCountDetail('');
        setExerciseCount(0);
      }, [id, exerciseAreaValue, detailExerciseValue, exerciseCount, directExerciseValue, exerciseCountDetail]);

    //상세 루틴의 운동 추가 Modal 닫을 때 
    const onCloseModal = useCallback(() => {
        setIsAddExerciseClick(false);
        setExerciseAreaValue('');
        setDetailExerciseValue('');
        setDirectExerciseValue('');
        setExerciseCountDetail('');
        setExerciseCount(0);
    }, []);

    //운동 부위 값 가져오기
    const getAreaValue = useCallback(value => {
        setExerciseAreaValue(value);
    }, []);
    
    //운동 자세 값 저장
    const getDetailValue = useCallback(postureValue => {
        setDetailExerciseValue(postureValue) 
    }, []);

    // 시간인지 횟수 인지 저장
    const getExerciseCountDetail = useCallback(countDetailValue => {
        setExerciseCountDetail(countDetailValue)
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
        const userSelector = confirm("정말 삭제하시겠습니까?")
        if (userSelector) dispatch(DeleteRecordRequestAction(value.key));
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

    //직접 입력 창
    const onDirectInput = useCallback(e => {
        setDirectExerciseValue(e.target.value);
    }, []);

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
                              <Popconfirm
                                title="정말로 삭제하시겠습니까?"
                                placement="topRight"
                                onConfirm={deleteTotalExercise(training.id)}
                                okText="네"
                                cancelText="아니요"
                              >
                                <DeleteIcon>
                                    <Icon
                                    type="close"
                                    />
                                </DeleteIcon>
                                </Popconfirm>
                                <Routine>        
                                    <div style={{ fontSize: 25 }}>
                                    {training.posture}
                                    </div>
                                    <div style={{ fontSize: 20 }}>
                                    {training.count}
                                    {getExerciseCount(training.countDetail)}
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
                                {getExerciseCount(training.countDetail)}
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
                            <Button type="primary" ghost onClick={updateRoutine}>
                            완료
                            </Button>
                            <Button onClick={onCloseDrawer} style={{ marginLeft: 8 }}>
                            취소
                            </Button>
                            </>
                            :
                            <>
                            <Button type="primary" ghost onClick={clickUpdateButton}>
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
                        <Button type="primary" ghost onClick={addRecommendRoutine}>
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
            width = {620}
          >
            <div>운동 종류</div>
            <Select
                placeholder = "운동 부위"
                style={{ width: 120, marginRight: 20 }}
                onChange={getAreaValue}
                value = {Object.keys(getExerciseName).filter(v => v === exerciseAreaValue)}
            >
              {Object.keys(getExerciseName).map((v, i) => <Option value={v} key={i}>{v}</Option>)}
            </Select>
            {exerciseAreaValue 
            ? (<>
                <Select 
                    placeholder = "운동 자세"
                    style={{width: 190, marginRight: 20}} 
                    value={getExerciseName[exerciseAreaValue].filter(v => v === detailExerciseValue)} 
                    onChange={getDetailValue}
                >
                  {getExerciseName[exerciseAreaValue].map((v, i) => <Option value={v} key={i}>{v}</Option>)}
                </Select>
                {
                  detailExerciseValue == "직접 입력하기" ? <Input placeholder = "직접 운동을 입력하세요" onChange={onDirectInput} value={directExerciseValue} style={{width: 210}}/> : <></>
                }
                <div style={{marginTop: 20}}>
                  <div>운동 시간/횟수 (시간은 분 단위입니다.)</div>
                  <Select 
                    style={{width: 100, marginRight: 20}}
                    onChange = {getExerciseCountDetail}
                    value = {exerciseCountDetail}
                  >
                    <Option value="시간">시간</Option>
                    <Option value="횟수">횟수</Option>
                  </Select>
                  <Input type="number" onChange={onCountText} value={exerciseCount} style={{width: 80}}/>  
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