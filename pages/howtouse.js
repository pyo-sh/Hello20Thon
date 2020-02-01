import React from 'react';
import styled from 'styled-components';
// 우리 앱 사용 방법 적을거임

const HowtouseWrapper = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : flex-start;
    font-size : 20px;
    & div img {
        width : 80%;
        max-width : 300px;
        min-width : 200px;
    }
    & .Title{
        align-self: center;
        font-size: 80px;
        font-family: fantasy;
    }
    & .SubTitle{
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
    & .How-Routine{
        display: flex;
        padding: 10px;
        margin: 20px;
        border-bottom: 5px solid #00943230;
    }
    & .How-Private{
        align-self: flex-end;
        display: flex;
        padding: 10px;
        margin: 20px;
        border-bottom: 5px solid #d980fa30;
    }
    & .How-Youtube{
        display: flex;
        padding: 10px;
        margin: 20px;
        border-bottom: 5px solid #0652DD30;
    }
    & .How-Stopwatch{
        align-self: flex-end;
        display: flex;
        padding: 10px;
        margin: 20px;
        border-bottom: 5px solid #FFC31230;
    }
    & .How-Search{
        display: flex;
        padding: 10px;
        margin: 20px;
        border-bottom: 5px solid #1e272e30;
    }
    & .How-Description{
        padding: 0 50px;
        
        display: flex;
        flex-direction:column;
        justify-content: center;
    }
    & .How-Description-Title{
        font-size: 40px;
        font-weight: bold;
    }
    & .How-Description-Content{
        padding-top: 15px;
        padding-left: 20px;
    }
`;
// 사용법 순서 :
// 달력 :
// 루틴 추가 및 추천 루틴
// 유튜브
// 스톱워치
const Howtouse = () => {
    return (
        <HowtouseWrapper>
            <h1 className="Title">HYM</h1>
            <div className="SubTitle">
                사용해주셔서 감사합니다. <br/>
                저희는 맨몸운동을 하고자 하는 여러분들을 위해 만들어졌습니다.<br/>
                집에서도 할 수 있는 맨몸운동을 통해 모두가 건강한 세상을 만드는 것이 저희의 목표입니다.<br/>
                우리 서비스의 사용 방법을 알려드리겠습니다.
            </div>
            <div className="How-Routine">
                <div className="How-Description">
                    <div className="How-Description-Title"> 직접 만들어보는 루틴 </div>
                    <div className="How-Description-Content">
                        초보자분은 우리가 추천하는 초보자루틴을 적용하여 운동을 시작하실 수 있습니다.<br/>
                        중, 고급자분들은 자신만의 운동 루틴을 추가하여 하는 것을 추천드립니다.
                    </div>
                </div>
            </div>
            <div className="How-Private">
                <div className="How-Description">
                    <div className="How-Description-Title"> 자신만의 운동루틴 기록 </div>
                    <div className="How-Description-Content">
                        달력을 통해 날마다 자신의 몸무게가 몇 KG이였는지 적어보세요!<br/>
                        하고싶은 운동의 루틴을 만들어서 달력이 가리키고 있는 날짜에 추가할 수 있습니다!<br/>
                        날마다 얼마만큼의 운동을 했는지 체크하세요.<br/>
                        운동을 못 했거나, 그 날 확인해야 할 사항이 있다면 메모기능을 사용하시면 간편합니다!
                    </div>
                </div>
            </div>
            <div className="How-Youtube">
                <img src="/images/youtube.png"/>
                <div className="How-Description">
                    <div className="How-Description-Title"> 유튜브 검색 </div>
                    <div className="How-Description-Content">
                        저희 서비스에서 유튜브 검색을 지원합니다!<br/>
                        유튜브 검색을 통해 운동 유튜버들의 자세를 참고하며 운동하세요! 
                    </div>
                </div>
            </div>
            <div className="How-Stopwatch">
                <div className="How-Description">
                    <div className="How-Description-Title"> 스톱워치 </div>
                    <div className="How-Description-Content">
                        스톱워치를 사용하여 시간을 설정하고 운동을 해보세요!<br/>
                        예쁜 목소리로 시간이 다 됐음을 알려줍니다!
                    </div>
                </div>
                <img src="/images/stopwatch.png"/>
            </div>
            <div className="How-Search">
                <img src="/images/searchImage.png"/>
                <div className="How-Description">
                    <div className="How-Description-Title"> 운동사진 검색 </div>
                    <div className="How-Description-Content">
                        어떤 운동인지 보고 싶으시면 검색하세요!<br/>
                        구글에서 검색한 사진을 보여드리고 이미지를 클릭하면 해당 관련 글이 새 창에서 열립니다.
                    </div>
                </div>
            </div>
            <div>
                여러분들의 운동 파트너 <b>HYM</b>!
                더 발전하도록 노력하겠습니다!!
            </div>
        </HowtouseWrapper>
    );
};

export default Howtouse;