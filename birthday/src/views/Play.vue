<script setup lang="ts">
import { ref, onMounted } from "vue";

// 대사 설정
const fullText = "안녕하세요! 저는 여러분의 가이드입니다.";
const displayedText = ref("");
const currentMessage = ref(fullText);

// 버튼 액션 메시지
const messages = {
  greeting: "안녕하세요! 반갑습니다.",
  info: "저는 여러분을 도와드릴 가이드입니다.",
  help: "무엇을 도와드릴까요?",
  joke: "웃긴 농담을 해볼까요? 코딩하다 버그를 만나면 디버그, 디버그가 안되면 디버깅~",
  dance: "신나게 춤을 춥니다! 🕺💃",
  bye: "안녕히 가세요! 다음에 또 만나요."
};

// 캐릭터 상태
const isWaving = ref(false);
const isDancing = ref(false);

// 한 글자씩 출력하는 함수
const typeText = (text: string, index = 0) => {
  displayedText.value = "";
  
  const typeNextChar = (i = 0) => {
    if (i < text.length) {
      displayedText.value += text[i];
      setTimeout(() => typeNextChar(i + 1), 50); // 50ms 간격으로 출력
    }
  };
  
  typeNextChar();
};

// 버튼 액션 함수들
const handleGreeting = () => {
  isWaving.value = true;
  currentMessage.value = messages.greeting;
  typeText(currentMessage.value);
  setTimeout(() => {
    isWaving.value = false;
  }, 2000);
};

const handleInfo = () => {
  currentMessage.value = messages.info;
  typeText(currentMessage.value);
};

const handleHelp = () => {
  currentMessage.value = messages.help;
  typeText(currentMessage.value);
};

const handleJoke = () => {
  currentMessage.value = messages.joke;
  typeText(currentMessage.value);
};

const handleDance = () => {
  isDancing.value = true;
  currentMessage.value = messages.dance;
  typeText(currentMessage.value);
  setTimeout(() => {
    isDancing.value = false;
  }, 3000);
};

const handleBye = () => {
  currentMessage.value = messages.bye;
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
      <img 
        src="/character.png" 
        alt="Character" 
        class="character"
        :class="{ 'wave-animation': isWaving, 'dance-animation': isDancing }"
      />
      <div class="speech-bubble">
        <p>{{ displayedText }}</p>
      </div>
    </div>
    
    <div class="buttons-container">
      <button @click="handleGreeting" class="action-button greeting-btn">
        인사하기
      </button>
      <button @click="handleInfo" class="action-button info-btn">
        정보보기
      </button>
      <button @click="handleHelp" class="action-button help-btn">
        도움요청
      </button>
      <button @click="handleJoke" class="action-button joke-btn">
        농담하기
      </button>
      <button @click="handleDance" class="action-button dance-btn">
        춤추기
      </button>
      <button @click="handleBye" class="action-button bye-btn">
        작별인사
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #dad4c4;
}

.character-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.character {
  width: 150px;
  height: auto;
  transition: transform 0.3s ease;
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

/* 말풍선 스타일 */
.speech-bubble {
  position: absolute;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
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
}

/* 텍스트가 한 줄로 길어지지 않도록 조정 */
.speech-bubble p {
  display: inline-block;
  text-align: center;
  line-height: 1.5;
  max-width: 100%;
}

/* 말풍선 꼬리 */
.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 15px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

/* 버튼 컨테이너 */
.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
}

/* 버튼 스타일 */
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
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.action-button:active {
  transform: translateY(1px);
}

/* 각 버튼별 색상 */
.greeting-btn {
  background-color: #4CAF50;
}

.info-btn {
  background-color: #2196F3;
}

.help-btn {
  background-color: #9C27B0;
}

.joke-btn {
  background-color: #FF9800;
}

.dance-btn {
  background-color: #E91E63;
}

.bye-btn {
  background-color: #607D8B;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .buttons-container {
    flex-direction: column;
    width: 80%;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>