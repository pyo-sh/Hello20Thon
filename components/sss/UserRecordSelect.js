import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select } from 'antd';
import styled from 'styled-components';

const Pick = styled(Select)`
    max-width: 350px;
    min-width: 300px;
`;
const PickInput = styled(Input)`
    /* max-width: 350px;
    min-width: 300px; */
`;

const { Option, OptGroup } = Select;

const UserRecordSelect = () => {
    const dispatch = useDispatch();
    const [kindOfTraining, setKindOfTraining] = useState("UserInput");
    const [useInput, setUseInput] = useState(true);

    // Select를 바꿀 때 마다 State 변경
    // props의 value는 값, options는 antd의 설정
    const onChangeSelect = useCallback((value, options) => {
        if(value==="UserInput"){
            setUseInput(true);
        }
        else{
            setUseInput(false);
        }
        console.log(value);
        console.log(options);
    }, []);

    const onChangeInput = useCallback((e) => {

    }, []);

    return (
        <>
            <Pick
            defaultValue="UserInput"
            onChange={onChangeSelect}
            >
                <Option value="UserInput">기타</Option>
                <OptGroup label="유산소 운동">
                    <Option value="walk">걷기</Option>
                    <Option value="run">달리기</Option>
                    <Option value="jump-rope">줄넘기</Option>
                    <Option value="bicycle">자전거</Option>
                    <Option value="hiking">하이킹</Option>
                    <Option value="swim">수영</Option>
                    <Option value="circuit">서킷 트레이닝</Option>
                </OptGroup>
                <OptGroup label="복근">
                    <Option value="sit-up">윗몸 일으키기</Option>
                    <Option value="reverse-crunche">리버스 크런치</Option>
                    <Option value="bicycle-crunche">바이시클 크런치</Option>
                    <Option value="flutter-kick">플러터 킥</Option>
                    <Option value="leg-raise">다리 올리기</Option>
                    <Option value="elbow-plank">엘보우 플랭크</Option>
                </OptGroup>
                <OptGroup label="하체">
                    <Option value="lunge">런치</Option>
                    <Option value="high-knee">하이니</Option>
                    <Option value="turning-kick">터닝킥</Option>
                    <Option value="climber">마운틴 클라이머</Option>
                    <Option value="plank-jump-in">플랭크 파이크 점프</Option>
                    <Option value="lunges-step-up">런지 스텝업</Option>
                </OptGroup>
                <OptGroup label="엉덩이">
                    <Option value="squats">스쿼트</Option>
                    <Option value="donkey-kick">동키킥</Option>
                    <Option value="bridge">힙 브릿지</Option>
                    <Option value="jump-knee-tuck">턱 점프</Option>
                    <Option value="fly-step">플라이 스탭</Option>
                    <Option value="side-leg-raise">사이드 레그 레이즈</Option>
                </OptGroup>
                <OptGroup label="팔(삼두)">
                    <Option value="close-grip-push-up">클로즈 그립 푸쉬업</Option>
                    <Option value="dips">딥스</Option>
                    <Option value="punch">펀치</Option>
                </OptGroup>
                <OptGroup label="팔(이두)">
                    <Option value="chin-ups">턱걸이</Option>
                    <Option value="doorframe-rows">문틀 로우</Option>
                    <Option value="body-rows">바디 로우</Option>
                    <Option value="sitting-pull-ups">시팅 풀업</Option>
                    <Option value="pseudo-planche">수도 플란체 푸쉬업</Option>
                </OptGroup>
                <OptGroup label="등">
                    <Option value="pull-ups">풀 업</Option>
                    <Option value="elbow-lifts">팔꿈치 들어올리기</Option>
                    <Option value="star-plank">스타 플랭크</Option>
                    <Option value="alt-armLeg-plank">반대쪽 팔다리 들어올리기 플랭크</Option>
                </OptGroup>
                <OptGroup label="가슴">
                    <Option value="push-up">팔굽혀 펴기</Option>
                    <Option value="plank-rotations">플랭크 로테이션</Option>
                    <Option value="chest-squeezes">체스트 스퀴즈</Option>
                    <Option value="shoulder-taps">숄더탭</Option>
                </OptGroup>
            </Pick>
            {useInput
            ?   <PickInput
                placeholder="운동을 적어주세요"
                />
            :   null}
        </>
    );
};

export default UserRecordSelect;