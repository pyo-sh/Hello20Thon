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
`;
// 사용법 순서 :
// 달력 :
// 루틴 추가 및 추천 루틴
// 유튜브
// 스톱워치
const Howtouse = () => {
    return (
        <HowtouseWrapper>
            <span>
                <b>HYM</b>을 사용해주셔서 감사합니다. <br/>
                저희는 맨몸운동을 하고자 하는 여러분들을 위해 만들어졌습니다.<br/>
                집에서도 할 수 있는 맨몸운동을 통해 모두가 건강한 세상을 만드는 것이 저희의 목표입니다.<br/>
                우리 서비스의 사용 방법을 알려드리겠습니다.
            </span>
            <div>
                달력을 통해 날마다 자신의 몸무게가 몇 KG이였는지, 어떤 운동을 했는지, 다른 확인해야할 사항은 무엇인지, 운동을 못한 사유가 무엇인지 등에 대해 적을 수 있습니다.
            </div>
            <div>
                초보자분은 우리가 추천하는 초보자루틴을 적용하여 운동을 시작하실 수 있습니다.
                중, 고급자분들은 자신만의 운동 루틴을 추가하여 하는 것을 추천드립니다.
            </div>
            <div>
            <img src="/images/youtube.png"/>
                <div>
                저희 서비스에서 유튜브 검색을 지원합니다!
                유튜브 검색을 통해 운동 유튜버들의 자세를 참고하며 운동하세요! 
                </div>
                
            </div>
            <div>
            <img src="/images/stopwatch.png"/>
                <div>
                스톱워치를 사용하여 시간을 설정하고 운동을 해보세요!
                예쁜 목소리로 시간이 다 됐음을 알려줍니다!
                </div>
            </div>
            <div>
                <img src="/images/searchImage.png"/>
                <div>
            어떤 운동인지 보고 싶으시면 검색하세요! 구글에서 검색한 사진을 보여드리고 이미지를 클릭하면 해당 관련 글이 새 창에서 열립니다.</div>
            </div>
            <div>
                여러분들의 운동 파트너 <b>HYM</b>!
                더 발전하도록 노력하겠습니다!!
            </div>
        </HowtouseWrapper>
    );
};

export default Howtouse;