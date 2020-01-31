import React, { useState, useCallback } from 'react';
import { useSeletor, useDispatch } from 'react-redux';
import { Select, Input } from 'antd';
import {GetPostureValueAction, GetCountValueAction} from '../../reducers/user';

const { Option } = Select;

const Exercise = ({value}) => {
    const dispatch = useDispatch();
    const [DetailExerciseValue, setDetailExerciseValue] = useState('');

    const getDetailValue = (postureValue) => {
        dispatch(GetPostureValueAction(postureValue))
        setDetailExerciseValue(postureValue)
        // console.log(postureValue)
    };

    const getCount = (e) => {
        dispatch(GetCountValueAction(e.target.value))
        // console.log(e.target.value)
    };

    // const getCount = useCallback((e) => {
    //     setCountValue(e.target.value)
    // }, []);

    switch(value){
        case 'aerobic-exercise':
            return (
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="walk">걷기</Option>
                    <Option value="run">달리기</Option>
                    <Option value="jump-rope">줄넘기</Option>
                    <Option value="bicycle">자전거</Option>
                    <Option value="hiking">하이킹</Option>
                    <Option value="swim">수영</Option>
                    <Option value="circuit">서킷 트레이닝</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 시간</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'abs':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="sit-up">윗몸 일으키기</Option>
                    <Option value="reverse-crunche">리버스 크런치</Option>
                    <Option value="bicycle-crunche">바이시클 크런치</Option>
                    <Option value="flutter-kick">플러터 킥</Option>
                    <Option value="leg-raise">다리 올리기</Option>
                    <Option value="elbow-plank">엘보우 플랭크</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'quads':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="lunge">런치</Option>
                    <Option value="high-knee">하이니</Option>
                    <Option value="turning-kick">터닝킥</Option>
                    <Option value="climber">마운틴 클라이머</Option>
                    <Option value="plank-jump-in">플랭크 파이크 점프</Option>
                    <Option value="lunges-step-up">런지 스텝업</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'glutes':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="squats">스쿼트</Option>
                    <Option value="donkey-kick">동키킥</Option>
                    <Option value="bridge">힙 브릿지</Option>
                    <Option value="jump-knee-tuck">턱 점프</Option>
                    <Option value="fly-step">플라이 스탭</Option>
                    <Option value="side-leg-raise">사이드 레그 레이즈</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'triceps':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="close-grip-push-up">클로즈 그립 푸쉬업</Option>
                    <Option value="dips">딥스</Option>
                    <Option value="punch">펀치</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'biceps':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="chin-ups">턱걸이</Option>
                    <Option value="doorframe-rows">문틀 로우</Option>
                    <Option value="body-rows">바디 로우</Option>
                    <Option value="sitting-pull-ups">시팅 풀업</Option>
                    <Option value="pseudo-planche">수도 플란체 푸쉬업</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'back':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="pull-ups">풀 업</Option>
                    <Option value="elbow-lifts">팔꿈치 들어올리기</Option>
                    <Option value="star-plank">스타 플랭크</Option>
                    <Option value="alt-armLeg-plank">반대쪽 팔다리 들어올리기 플랭크</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        case 'chest':
            return(
                <>
                <Select style={{width: 200}} placeholder="Select a exercise" onChange={getDetailValue}>
                    <Option value="push-up">팔굽혀 펴기</Option>
                    <Option value="plank-rotations">플랭크 로테이션</Option>
                    <Option value="chest-squeezes">체스트 스퀴즈</Option>
                    <Option value="shoulder-taps">숄더탭</Option>
                </Select>
                {
                    DetailExerciseValue != null
                    ?
                    <>
                    <div style={{marginTop: 10}}>
                        <div>운동 횟수</div>
                        <Input onPressEnter={getCount} style={{width: 100}}/>
                    </div>
                    </>
                    :
                    <></>
                }
                </>
            )
        default:
            return null;
    }
};

export default Exercise;