<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // 🚀 Vue Router 사용

const router = useRouter(); // 라우터 인스턴스 가져오기

// 대사 설정
const fullText = "안녕하세요! 저는 여러분의 가이드입니다.";
const displayedText = ref("");
const currentMessage = ref(fullText);

// 버튼 액션 메시지 - 각 액션별로 여러 메시지 배열로 변경
const messages = {
  greeting: [
  "안녕!",
  "만나서 정말 반가워!",
  "오늘 하루도 멋진 하루!",
  "행복한 하루 보내!",
  "오늘도 웃음 가득한 하루 되길 바래요!",
  "새로운 하루가 시작됐어요. 힘차게 시작해봐요!",
  "오늘 하루도 당신에게 좋은 일만 가득하길!"
  ],
  eat: [
  "맛있다! 냠냠~",
  "밥 먹고 힘내요!",
  "오늘도 맛있는 음식으로 힘을 얻자!",
  "식사 맛있게 했으면 힘든 일도 잘 풀릴 거야!",
  "밥이 최고야! 든든하게 먹고 가자!"
  ],
  help: [
    "너는 정말 멋져! 항상 긍정적인 에너지가 넘쳐!",
    "너의 미소는 세상을 밝게 만들어. 정말 아름다워!",
    "네가 노력하는 모습, 정말 감동적이에요. 계속해서 멋지게 나아가세요!",
    "매일 조금씩 성장하는 너를 보면 정말 대단해 보여요!",
    "너는 언제나 긍정적이고 밝은 에너지를 주는 사람이라서 좋아요.",
    "내가 가장 좋아하는 점은 너의 웃음이에요. 그 웃음으로 많은 사람들이 행복해져요!",
    "너는 정말 잘하고 있어요. 조금씩 나아지고 있다는 걸 잊지 마세요.",
    "네가 있는 곳이 행복의 시작이에요. 언제나 고마워요!",
    "지금의 당신이 가장 멋져요. 계속 그대로 빛나세요!",
    "너의 열정은 모두에게 긍정적인 영향을 주고 있어요. 멋져요!",
    "‘성공은 노력의 결과물이 아니라, 도전하는 과정이 중요하다.’",
    "‘오늘의 힘든 일은 내일의 큰 성과로 돌아올 거야.’",
    "‘어떤 일이든 할 수 있는 힘이 당신 안에 있다.’",
    "‘한 걸음씩 나아가는 것이 가장 중요한 거야. 그게 바로 성공의 시작이지.’",
    "‘어제보다 나은 오늘이 중요해. 계속 나아가세요.’",
    "‘실패는 성공의 어머니. 실패에서 배우고, 다시 도전하는 게 진정한 강함이다.’",
    "‘자신을 믿고, 끝까지 포기하지 마세요. 성공은 노력하는 자에게 찾아옵니다.’",
    "‘당신은 그 누구보다 특별하고, 능력 있는 사람이에요. 계속 도전하세요.’",
    "‘매일 조금씩 성취감을 느끼는 것, 그것이 바로 큰 성공을 이루는 길이에요.’",
    "‘지금까지 해온 것들이 결국에는 큰 변화로 다가올 거예요. 계속해서 자신을 믿으세요.’"
  ],
  birthday: [
    "생일 축하해! 오늘은 특별한 날이야! 🎂",
    "행복한 생일 되세요! 케이크는 먹었어? 🍰",
    "생일 정말 축하해! 오늘 하루는 모든 게 다 잘 될 거야! 🎉",
    "생일 축하합니다! 기쁨 가득한 하루 되길 바래요! 🎈",
    "생일은 한 해의 새로운 시작! 멋진 일들만 가득할 거예요. 🎁",
    "생일 맞이한 오늘, 모든 소원이 이루어지길 기원해요! 🕯️",
    "생일 축하해! 오늘은 온 세상이 너를 위해 축하하는 날! 💐",
    "하루하루가 특별하지만 오늘만큼은 더 특별하길 바라요. 생일 축하해요! 🎂",
    "생일이 이렇게 기쁜 날이구나! 기쁨 가득한 하루 보내세요! 🎊",
    "생일 축하해요! 오늘은 너만의 하루야! 행복하게 보내길! 🥳",
    "오늘만큼은 네가 주인공이야! 생일 축하하고, 오늘을 만끽하세요! 🎉"
  ],
  dance: [
    "신나게 춤을 춥니다! 🕺💃",
    "우와~ 댄스 파티 타임!",
    "같이 춤을 춰요! 신나게~"
  ]
};

// 캐릭터 상태
const isWaving = ref(false);
const isDancing = ref(false);
const isEating = ref(false);

// 한 글자씩 출력하는 함수
const typeText = (text: string) => {
  displayedText.value = "";
  
  const typeNextChar = (i = 0) => {
    if (i < text.length) {
      displayedText.value += text[i];
      setTimeout(() => typeNextChar(i + 1), 60);
    }
  };

  typeNextChar();
};

// 랜덤 메시지 선택 함수
const getRandomMessage = (messageArray: string[]) => {
  const randomIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomIndex];
};

// 버튼 액션 함수들
const handleGreeting = () => {
  isWaving.value = true;
  currentMessage.value = getRandomMessage(messages.greeting);
  typeText(currentMessage.value);
  setTimeout(() => {
    isWaving.value = false;
  }, 2000);
};

const handleEat = () => {
  isEating.value = true;
  currentMessage.value = getRandomMessage(messages.eat);
  typeText(currentMessage.value);
  setTimeout(() => {
    isEating.value = false;
  }, 3000);
};

const handleHelp = () => {
  currentMessage.value = getRandomMessage(messages.help);
  typeText(currentMessage.value);
};

const handlebirthday = () => {
  currentMessage.value = getRandomMessage(messages.birthday);
  typeText(currentMessage.value);
};

const handleDance = () => {
  isDancing.value = true;
  currentMessage.value = getRandomMessage(messages.dance);
  typeText(currentMessage.value);
  setTimeout(() => {
    isDancing.value = false;
  }, 3000);
};

// 페이지 로드 시 텍스트 출력 시작
onMounted(() => {
  typeText(fullText);
});

// 🚀 "다음으로" 버튼 클릭 시 이동
const goToNext = () => {
  router.push("/talk"); // "/talk" 페이지로 이동
};
</script>

<template>
  <div class="container">
    <div class="character-wrapper">
      <div class="speech-bubble">
        <p>{{ displayedText }}</p>
      </div>
      <template v-if="isEating">
        <video src="/eating.mp4" autoplay muted class="character"></video>
      </template>
      <template v-else>
        <img 
          src="/character.png" 
          alt="Character" 
          class="character"
          :class="{ 'wave-animation': isWaving, 'dance-animation': isDancing }"
        />
      </template>
    </div>
    
    <div class="buttons-container">
      <button @click="handleGreeting" class="action-button greeting-btn">👋 인사하기</button>
      <button @click="handleEat" class="action-button eat-btn">🍔 밥 먹기</button>
      <button @click="handleHelp" class="action-button help-btn">💕 좋은 말</button>
      <button @click="handlebirthday" class="action-button birthday-btn">🎂 생일 축하</button>
      <button @click="handleDance" class="action-button dance-btn">💃 춤추기</button>
      <button class="action-button surprise-btn" @click="goToNext">💬 상담 받기</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #dad4c4; /* 더 밝고 따뜻한 배경색 */
  padding: 20px;
  font-family: 'Arial Rounded MT Bold', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.character-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

/* 말풍선 스타일 (데스크탑) */
.speech-bubble {
  position: absolute;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 80vw;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  white-space: normal;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  min-width: 200px;
  z-index: 1;
  border: 3px solid #ffcae5; /* 귀여운 테두리 추가 */
}

/* 말풍선 꼬리 추가 */
.speech-bubble:after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: white;
  z-index: 1;
}

.speech-bubble:before {
  content: '';
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  border: 12px solid transparent;
  border-top-color: #ffcae5;
  z-index: 0;
}

/* 캐릭터 이미지 */
.character {
  width: 150px;
  height: auto;
  transition: transform 0.3s ease;
  margin-top: 30px;
}

/* 애니메이션 */
.wave-animation {
  animation: wave 0.5s ease-in-out infinite;
}

.dance-animation {
  animation: dance 0.5s ease-in-out infinite;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

@keyframes dance {
  0% { transform: translateY(0); }
  25% { transform: translateY(-10px) rotate(-5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0); }
}

/* 버튼 컨테이너 */
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
}

/* 버튼 스타일 - 더 귀여운 디자인 */
.action-button {
  padding: 12px 20px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  position: relative;
}

.action-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-100%);
  transition: transform 0.3s;
}

.action-button:hover:before {
  transform: translateY(0);
}

.action-button:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.action-button:active {
  transform: translateY(1px);
}

/* 버튼 아이콘 */
.button-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

/* 버튼 텍스트 */
.button-text {
  font-size: 14px;
  font-weight: bold;
}

/* 각 버튼별 색상 - 더 밝고 귀여운 색으로 변경 */
.greeting-btn { background-color: #4cd964; /* 밝은 녹색 */ }
.eat-btn      { background-color: #5ac8fa; /* 밝은 파란색 */ }
.help-btn     { background-color: #c969ff; /* 밝은 보라색 */ }
.birthday-btn     { background-color: #ffcc00; /* 밝은 노란색 */ }
.dance-btn    { background-color: #ff6b9a; /* 밝은 분홍색 */ }
.surprise-btn { background-color: #87a1ff; /* 밝은 청록색 */ }

/* 반응형 디자인 (모바일) */
@media (max-width: 768px) {
  .character-wrapper {
    position: static; /* 더 이상 relative로 위치 조정하지 않음 */
    display: block;
    text-align: center;
  }
  
  .speech-bubble {
    position: static; /* 절대 위치 해제 */
    transform: none;
    max-width: 90%;
    margin: 0 auto 10px; /* 중앙 정렬 및 아래 여백 추가 */
    z-index: 2; /* 필요시 추가 */
  }
  
  .character {
    margin-top: 0; /* 상단 여백 제거 */
  }
  
  .buttons-container {
    display: flex;
    flex-direction: row; /* 가로 배치 */
    flex-wrap: wrap; /* 줄 바꿈 허용 */
    justify-content: center; /* 중앙 정렬 */
    width: 90%; /* 너비 조정 */
    margin: 20px auto 0; /* 중앙 정렬 및 상단 여백 */
    gap: 10px; /* 버튼 간격 */
  }
  
  .action-button {
    width: calc(50% - 10px); /* 한 줄에 2개씩 (간격 고려) */
    padding: 10px 0; /* 상하 패딩 */
    font-size: 14px;
  }
  
  .button-icon {
    font-size: 20px;
  }
}
</style>