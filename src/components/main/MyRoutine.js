//새로운 루틴을 추가할 때
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Icon,
  Drawer,
  Modal,
  Select,
  Input,
  Form,
  Button,
  message,
  Popconfirm
} from "antd";
import styled from "styled-components";
import {
  AddRecordRequestAction
} from "../../reducers/user";
import {
  AddRoutineRequest
} from '../../reducers/day';
import { getExerciseCount, getExerciseName } from "../ExerciseFuction";
import RoutineDetail from "./RoutineDetail";

const { Option } = Select;

const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 30px;
`;

//루틴
const Content = styled(Card)`
  margin-bottom: 20px;
  width: 300px;
  font-size: 18px;
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

const RoutineMainBox = styled.div`
  display: flex;
  font-size: 30px;
  align-items: center;
  padding: 20px 0;
  & > div :hover {
    cursor: pointer;
    border : 1px solid #1890FF;
    color: #1890FF;
    opacity: 0.7;
  }
  & .RoutineBox-Icon{
    margin-right: 12.5px;
  }
  & .RoutineBox-Icon:hover{
    margin-right: 12.5px;
    color : #1890FF;
    opacity: 0.7;
  }
`;

//루틴 추가 style
const ContentAdd = styled(Card)`
  margin-top: 20px;
  width: 300px;
  border: dashed 2px lightgray;
  text-align: center;
  font-size: 27px;
  cursor: pointer;
  color: gray;

  & :hover {
    border: dashed 2px #1890FF;
    color: #1890FF;
    opacity: 0.7;
  }
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

const Routine = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MyRoutine = () => {
  const [inputRoutineName, setInputRoutineName] = useState(""); //루틴 이름 저장
  const [clickInput, setClickInput] = useState(false);    //루틴 이름 입력 버튼 
  const [isAddRoutineClick, setIsAddRoutineClick] = useState(false);    //ADD ROUTINE 버튼 클릭 여부
  const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);  //ADD EXERCISE 버튼 클릭 여부
  const [exerciseAreaValue, setExerciseAreaValue] = useState(''); //운동 부위 값 저장
  const [detailExerciseValue, setDetailExerciseValue] = useState(''); //운동 자세 값 저장
  const [exerciseCount, setExerciseCount] = useState(0);  //운동 횟수 저장
  const [totalExercise, setTotalExercise] = useState([]); //추가된 운동을 저장하는 배열
  const [directExerciseValue, setDirectExerciseValue] = useState(''); //직접 입력하기
  const [exerciseCountDetail, setExerciseCountDetail] = useState('');  //시간인지 횟수인지
  const [id, setId] = useState(0);
  const {userRecord} = useSelector(
    state => state.user
  );
  
  const nowDate = useSelector(state => state.day.nowPointingDate);

  const dispatch = useDispatch();

  //운동 부위 값 가져오기
  const getAreaValue = useCallback(value => {
    setExerciseAreaValue(value);
  }, []);

  //운동 자세 값 저장
  const getDetailValue = useCallback(postureValue => {
    setDetailExerciseValue(postureValue)
  }, []);

  //직접 입력 창
  const onDirectInput = useCallback(e => {
    setDirectExerciseValue(e.target.value);
  }, []);

  // 시간인지 횟수 인지 저장
  const getExerciseCountDetail = useCallback(countDetailValue => {
    setExerciseCountDetail(countDetailValue)
  }, []);

  //운동 횟수 입력
  const onCountText = useCallback((e) => {
    setExerciseCount(e.target.value)
  }, []);

  //ADD ROUTINE 버튼 클릭
  const onAddRoutineClick = useCallback((e) => {
    setIsAddRoutineClick(true);
  }, []);

  // //ADD EXERCISE 버튼 클릭
  const onAddExerciseClick = useCallback((e) => {
    setIsAddExerciseClick(true);
  }, []);

  //ADD ROUTINE Drawer의 만들기 버튼 눌렀을 때
  const addRoutine = useCallback(e => {
    e.preventDefault();
    if (!inputRoutineName || !inputRoutineName.trim()) {
      message.error("루틴 이름을 입력해 주세요");
    } else if(totalExercise.length === 0){
      message.error("운동을 추가해 주세요");
    }else {
      message.success("새 루틴 추가!")
      //루틴 이름, 날짜, 운동들 추가함
      dispatch(
        AddRecordRequestAction({
          routineName: inputRoutineName,
          trainings: totalExercise
        })
      );
      setIsAddRoutineClick(false);
      setClickInput(false);
      //운동 추가 배열, 루틴 이름, id 초기화
      setTotalExercise([]);
      setInputRoutineName('');
      setId(0);
    } 
  }, [inputRoutineName, totalExercise]);

  //ADD ROUTINE Drawer의 취소버튼 눌렀을때
  const onCloseDrawer = useCallback((e) => {
    setIsAddRoutineClick(false);
    //운동 추가 배열, 루틴 이름 초기화
    setTotalExercise([]);
    setInputRoutineName('');
    setClickInput(false)
  },[]);

  //Modal의 OK버튼 눌렀을 경우
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

  //운동 추가 창닫기
  const onCloseModal = useCallback((e) => {
    setIsAddExerciseClick(false);
    setExerciseAreaValue('');
    setDetailExerciseValue('');
    setDirectExerciseValue('');
    setExerciseCountDetail('');
    setExerciseCount(0);
  }, []);

  //루틴 이름 입력
  const onChangeText = useCallback(e => {
    setInputRoutineName(e.target.value);
  }, []);

  //루틴 이름 저장
  const onRoutineName = useCallback(
    e => {
      e.preventDefault();
      if (!inputRoutineName || !inputRoutineName.trim()) {
        message.error("루틴 이름을 입력해 주세요")
      } else {
        setClickInput(true);
      }
    },
    [inputRoutineName]
  );

  //추가 중인 운동 삭제
  const deleteExercise = useCallback(id => e => {
      setTotalExercise(totalExercise.filter(exercise => exercise.id !== id));
  }, [totalExercise]);

  // 루틴을 내 캘린더에 저장할 때 (아이콘 클릭)
  const addRoutineOnClick = useCallback((key) => (e)=>{
    //nowDate
    dispatch(AddRoutineRequest(nowDate, userRecord[key]));
  }, [nowDate, userRecord]);

  const routineNameUpdate = useCallback((e) => {
    setClickInput(false);
    setInputRoutineName('');
  },[]);

  return (
    <>
      {/* 내 루틴 배열 */}
      <ContentForm>
        {Object.keys(userRecord).map((value, i) => (
          <RoutineMainBox key={i}>
            <Icon 
              className="RoutineBox-Icon"
              type="plus"
              onClick={addRoutineOnClick(value)}
              />
            <RoutineDetail myValue={userRecord[value]}/>
          </RoutineMainBox>
        ))}

        {/* 이 버튼 누르면 ADD ROUINTE Drawer 창 열림 */}
        <ContentAdd onClick={onAddRoutineClick}>
          <Icon type="plus-circle" style={{ fontSize: 30, marginRight: 20 }} />
          ADD ROUTINE
        </ContentAdd>

        {/* ADD ROUTINE Drawer 창 */}
        <Drawer
          title="나만의 루틴"
          placement="right"
          width={400}
          closable={false}
          onClose={onCloseDrawer}
          visible={isAddRoutineClick}
        >
          {/* 새 루틴에 운동 추가 */}
          <RoutineForm>
            {/*루틴 이름 작성 */}
            {clickInput ? (
              <div className="InputRoutineName">
                {inputRoutineName}<Button type="link" onClick={routineNameUpdate}>수정</Button>
              </div> 
            ) : (
              <Form onSubmit={onRoutineName}>
                <Input
                  placeholder="루틴의 이름을 작성하세요"
                  onChange={onChangeText}
                  value={inputRoutineName}
                  style={{ width: 200 }}
                />
                <Button type="link" htmlType="submit">
                  입력
                </Button>
              </Form>
            )}

            {/* 이 버튼 누르면 Modal 창 열림 */}
            <ExerciseAdd onClick={onAddExerciseClick}>
              <div className="AddRoutine">
                <div>
                  <Icon type="plus-circle" style={{ fontSize: 30 }} />
                </div>
                <div>ADD EXERCISE</div>
              </div>
            </ExerciseAdd>

            {/* 추가한 운동 출력 */}
            {totalExercise.map((training, i) => {
              return (
                <Content key={i}>
                  <Popconfirm
                    title="정말로 삭제하시겠습니까?"
                    placement="topRight"
                    onConfirm={deleteExercise(training.id)}
                    okText="네"
                    cancelText="아니요"
                  >
                  <DeleteIcon>
                    <Icon
                      type="close"
                    />
                  </DeleteIcon>
                  </Popconfirm>
                  {/*삭제 버튼 누르면 추가한 운동 삭제 */}
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
              );
            })}
          </RoutineForm>

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
                  detailExerciseValue == "직접 입력하기" ? <Input placeholder="직접 운동을 입력하세요" onChange={onDirectInput} value={directExerciseValue} style={{width: 210}}/> : <></>
                }
                <div style={{marginTop: 20}}>
                  <div>운동 시간/횟수 (시간은 초 단위입니다.)</div>
                  <Select 
                    style={{width: 120, marginRight: 20}}
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
            <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
              취소
            </Button>
            <Button onClick={addRoutine} type="primary" ghost>
              만들기
            </Button>
          </div>
        </Drawer>
      </ContentForm>
    </>
  );
};

export default MyRoutine;
