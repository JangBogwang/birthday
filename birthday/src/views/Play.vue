<script setup lang="ts">
import { ref, onMounted } from "vue";

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
    "행복한 하루 보내!"
  ],
  eat: [
    "맛있다! 냠냠~",
    "밥 먹고 힘내요!"
  ],
  help: [
    "무엇을 도와드릴까요?",
    "힘내세요! 당신은 할 수 있어요!",
    "오늘 하루도 수고 많으셨어요."
  ],
  joke: [
    "웃긴 농담을 해볼까요? 코딩하다 버그를 만나면 디버그, 디버그가 안되면 디버깅~",
    "생일 축하합니다! 오늘은 특별한 날이에요! 🎂",
    "행복한 생일 되세요! 케이크 드셨나요? 🍰"
  ],
  dance: [
    "신나게 춤을 춥니다! 🕺💃",
    "우와~ 댄스 파티 타임!",
    "같이 춤을 춰요! 신나게~"
  ],
  surprise: [
    "깜짝 선물이 있어요! 🎁",
    "비밀인데... 사실 깜짝 파티를 준비했어요!",
    "서프라이즈! 짜잔~! ✨"
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
      setTimeout(() => typeNextChar(i + 1), 50);
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

const handleJoke = () => {
  currentMessage.value = getRandomMessage(messages.joke);
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

const handleSurprise = () => {
  currentMessage.value = getRandomMessage(messages.surprise);
  typeText(currentMessage.value);
};

// 페이지 로드 시 텍스트 출력 시작
onMounted(() => {
  typeText(fullText);
});
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
      <button @click="handleHelp" class="action-button help-btn">💕 따뜻한 한 마디</button>
      <button @click="handleJoke" class="action-button joke-btn">🎂 생일 축하</button>
      <button @click="handleDance" class="action-button dance-btn">💃 춤추기</button>
      <button @click="handleSurprise" class="action-button surprise-btn">🎁 서프라이즈</button>
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
.joke-btn     { background-color: #ffcc00; /* 밝은 노란색 */ }
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