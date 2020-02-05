/*
"aerobic-exercise": "유산소 운동"
"abs": "복근"
"quads": "하체"
"glutes": "엉덩이"
"triceps": "삼두"
"biceps": "이두"
"back": "등"
"chest": "가슴"

"walk: "걷기"
"run": "달리기"
"jump-rope": "줄넘기"
"bicycle": "자전거"
"hiking": "하이킹"
"swim": "수영"
"circuit": "서킷 트레이닝"

"sit-up": "윗몸 일으키기"
"reverse-crunche": "리버스 크런치"
"bicycle-crunche": "바이시클 크런치"
"flutter-kick": "플러터 킥"
"leg-raise": "다리 올리기"
"elbow-plank": "엘보우 플랭크"

"lunge": "런치"
"high-knee": "하이니"
"turning-kick": "터닝킥"
"climber": "마운틴 클라이머"
"plank-jump-in": "플랭크 파이크 점프"
"lunges-step-up": "런지 스텝업"

"squats": "스쿼트"
"donkey-kick": "동키킥"
"bridge": "힙 브릿지"
"jump-knee-tuck": "턱 점프"
"fly-step": "플라이 스탭"
"side-leg-raise": "사이드 레그 레이즈"

"close-grip-push-up": "클로즈 그립 푸쉬업"
"dips": "딥스"
"punch": "펀치-"
"chin-ups": "턱걸이"
"doorframe-rows": "문틀 로우"
"body-rows": "바디 로우"
"sitting-pull-ups": "시팅 풀업"
"pseudo-planche": "수도 플란체 푸쉬업"

"pull-ups": "풀 업"
"elbow-lifts": "팔꿈치 들어올리기"
"star-plank": "스타 플랭크"
"alt-armLeg-plank": "반대쪽 팔다리 들어올리기 플랭크"

"push-up": "팔굽혀 펴기"
"plank-rotations": "플랭크 로테이션"
"chest-squeezes": "체스트 스퀴즈"
"shoulder-taps": "숄더탭"
*/

// Count의 단위가 무엇인지 반환
// value는 area이다.
// 유산소 운동만 분이다
export const getExerciseCount = value => {
  switch (value) {
    case "시간":
      return "분";
    default:
      return "개";
  }
};

export const getExerciseName = {
  유산소: [
    "직접 입력하기",
    "걷기",
    "달리기",
    "줄넘기",
    "자전거",
    "하이킹",
    "서킷 트레이닝",
    "점핑잭"
  ],
  복근: [
    "직접 입력하기",
    "윗몸 일으키기",
    "크런치",
    "리버스 크런치",
    "바이시클 크런치",
    "엘보우 플랭크",
    "플러터 킥",
    "다리 올리기",
    "사이드 레그 레이즈",
    "마운틴 클라이머",
    "스타 플랭크",
    "반대쪽 팔다리 들어올리기 플랭크"
  ],

  하체: [
    "직접 입력하기",
    "런지",
    "사이드 런지",
    "백 런지",
    "스쿼트",
    "점프 스쿼트",
    "와이드 스쿼트",
    "버피 테스트",
    "런지 스텝업",
    "하이니",
    "플랭크 파이크 점프",
    "턱 점프",
    "동키킥",
    "힙 브릿지"
  ],

  삼두: [
    "직접 입력하기",
    "원암 트라이셉스 푸쉬업",
    "다이아몬드 푸쉬업",
    "딥스",
    "내로우 푸쉬업"
  ],
  가슴: [
    "직접 입력하기",
    "푸쉬업",
    "와이드 푸쉬업",
    "내로우 푸쉬업",
    "디클라인 푸쉬업",
    "인클라인 프쉬업",
    "딥스",
    "체스트 스퀴즈"
  ],
  이두: ["직접 입력하기", "친업"],
  등: [
    "직접 입력하기",
    "친업",
    "문틀 로우",
    "바디 로우",
    "시팅 풀업",
    "풀업",
    "팔꿈치 들어올리기",
    "슈퍼맨"
  ],
  어깨: [
    "직접 입력하기",
    "숄더탭",
    "파이크 푸쉬업",
    "타이프라이터 푸쉬업",
    "숄더 시저스",
    "트라이앵글 프레스"
  ]
};
