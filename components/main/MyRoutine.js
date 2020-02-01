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
  DatePicker
} from "antd";
import styled from "styled-components";
import Exercise from "./Exercise";
import {
  GetAreaValueAction,
  ADD_EXERCISE_REQUEST,
  AddRecordRequestAction,
  DELETE_EXERCISE_REQUEST
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

  &:hover {
    opacity: 0.7;
  }
`;

const RoutineMainBox = styled.div`
  display: flex;
  font-size: 30px;
  align-items: center;
  padding: 20px 0;

  & .RoutineBox-Icon{
    margin-right: 12.5px;
  }
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
  const [inputRoutineName, setInputRoutineName] = useState("");
  const [clickInput, setClickInput] = useState(false);
  const [isAddRoutineClick, setIsAddRoutineClick] = useState(false);
  const [isAddExerciseClick, setIsAddExerciseClick] = useState(false);
  const [exerciseAreaValue, setExerciseAreaValue] = useState(''); //운동 부위 값 저장
  const [key, setKey] = useState(1);
  const [totalExercise, setTotalExercise] = useState([]);
  const [id, setId ] = useState(0);
  const { _area, _posture, _count, userRecord } = useSelector(
    state => state.user
  );
  const nowDate = useSelector(state => state.day.nowPointingDate);

  const dispatch = useDispatch();

  //ADD ROUTINE 버튼 클릭
  const onAddRoutineClick = () => {
    setIsAddRoutineClick(true);
  };

  //ADD EXERCISE 버튼 클릭
  const onAddExerciseClick = () => {
    setIsAddExerciseClick(true);
  };

  //Drawer의 만들기 버튼 눌렀을 때
  const addRoutine = e => {
    e.preventDefault();
    //루틴 이름, 날짜, 운동들 추가함
    dispatch(
      AddRecordRequestAction({
        key: key,
        routineName: inputRoutineName,
        trainings: totalExercise
      })
    );
    setIsAddRoutineClick(false);
    setTotalExercise([]);
    setInputRoutineName('');
    setClickInput(false);
    setId(0);
    // setKey(key + 1); 나중에 고쳐라
  };

  //취소버튼 눌렀을때
  const onCloseDrawer = () => {
    setIsAddRoutineClick(false);
    setTotalExercise([]);
    setInputRoutineName('');
  };

  //Modal의 OK버튼 눌렀을 경우
  const onOkModal = () => {
    setTotalExercise([...totalExercise, {id : id ,area :_area, posture: _posture, count: _count}]);
    setId(id+1);
    setIsAddExerciseClick(false);
    setExerciseAreaValue('');
  };

  const onCloseModal = () => {
    setIsAddExerciseClick(false);
  };

  //운동 부위 값 가져오기
  const getAreaValue = value => {
    dispatch(GetAreaValueAction(value));
    setExerciseAreaValue(value);
  };

  //루틴 이름 입력
  const onChangeText = useCallback(e => {
    setInputRoutineName(e.target.value);
  }, []);

  //루틴 이름 저장
  const onRoutineName = useCallback(
    e => {
      e.preventDefault();
      if (!inputRoutineName || !inputRoutineName.trim()) {
        alert("공백 금지!");
      } else {
        setClickInput(true);
      }
    },
    [inputRoutineName]
  );

  const deleteExercise = id => e => {
    const temp = totalExercise.filter(exercise => exercise.id !== id);
    setTotalExercise(temp);
  };
  // 루틴을 내 캘린더에 저장할 때 (아이콘 클릭)
  const addRoutineOnClick = useCallback((key) => (e)=>{
    //nowDate
    dispatch(AddRoutineRequest(nowDate, userRecord[key]));
  }, [nowDate, userRecord]);

  const routineNameUpdate = () => {
    setClickInput(false);
    setInputRoutineName('');
  };

  return (
    <>
      <ContentForm>
        {Object.keys(userRecord).map(value => (
          <RoutineMainBox>
            <Icon 
              className="RoutineBox-Icon"
              type="plus"
              onClick={addRoutineOnClick(value)}
              />
            <RoutineDetail myValue={userRecord[value]}/>
          </RoutineMainBox>
        ))}

        <ContentAdd onClick={onAddRoutineClick}>
          {" "}
          {/* 이 버튼 누르면 Drawer 창 열림 */}
          <Icon type="plus-circle" style={{ fontSize: 30, marginRight: 20 }} />
          ADD ROUTINE
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
            {/*루틴 이름 작성 */}
            {clickInput ? (
              <>
              <div>{inputRoutineName}</div>
              <Button type="primary" onClick={routineNameUpdate}>수정</Button>
              </>
            ) : (
              <Form onSubmit={onRoutineName}>
                <Input
                  placeholder="루틴의 이름을 작성하세요"
                  onChange={onChangeText}
                  value={inputRoutineName}
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
            {totalExercise.map((training, i) => {
              return (
                <Content>
                  <DeleteIcon>
                    <Icon
                      type="close"
                      onClick={deleteExercise(training.id)}
                    />
                  </DeleteIcon>
                  {/*삭제 버튼 누르면 추가한 운동 삭제 */}
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
              );
            })}
          </RoutineForm>

          {/* 따로 빼자 */}
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
              value = {getExerciseName(exerciseAreaValue)}
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
            <Button onClick={addRoutine} type="primary">
              만들기
            </Button>
          </div>
        </Drawer>
      </ContentForm>
    </>
  );
};

export default MyRoutine;
