<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router"; // 🚀 Vue Router 사용

const router = useRouter(); // 라우터 인스턴스 가져오기

// 대사 설정
const initialText = "안녕하세요! 저는 귀여운 오리 동글이에요. 클릭해보세요!";
const clickResponses = [
  "와! 간지럽네요!",
  "히히, 또 클릭하시겠어요?",
  "오늘 기분이 너무 좋아요!",
  "저를 또 클릭해주셔서 감사합니다!",
  "안녕하세요? 반가워요~",
  "깜짝이야! 살살 클릭해주세요!",
  "짜잔! 반가워요!",
  "오! 클릭해주셨네요!"
];

const displayedText = ref("");
const isTyping = ref(true);
const showBubble = ref(false);
const isBobbing = ref(false);
const isJumping = ref(false);
const isSpinning = ref(false);
const showButton = ref(true);
const clickCount = ref(0);
const buttonText = ref("캐릭터와 대화하기");

// 말풍선 표시 타이밍 컨트롤
onMounted(() => {
  // 약간의 지연 후 말풍선 표시 (캐릭터가 먼저 보이게)
  setTimeout(() => {
    showBubble.value = true;
    // 말풍선이 나타난 후 텍스트 타이핑 시작
    setTimeout(() => {
      typeText(initialText);
    }, 300);
  }, 500);
});

// 캐릭터 클릭 이벤트 핸들러
const handleCharacterClick = () => {
  // 이미 애니메이션 중이면 무시
  if (isJumping.value || isSpinning.value) return;
  
  // 애니메이션 상태 활성화
  clickCount.value++;
  
  // 버튼 텍스트 업데이트
  updateButtonText();
  
  // 랜덤 효과 선택 (3가지 중 랜덤)
  const randomEffect = Math.floor(Math.random() * 3);
  
  // 랜덤 대사 선택
  const randomResponse = clickResponses[Math.floor(Math.random() * clickResponses.length)];
  
  // 선택된 효과에 따라 애니메이션 적용
  if (randomEffect === 0) {
    // 효과 1: 점프
    isJumping.value = true;
    setTimeout(() => {
      isJumping.value = false;
    }, 1000);
  } else if (randomEffect === 1) {
    // 효과 2: 스핀
    isSpinning.value = true;
    setTimeout(() => {
      isSpinning.value = false;
    }, 1000);
  } else {
    // 효과 3: 점프 + 밥
    isJumping.value = true;
    isBobbing.value = true;
    setTimeout(() => {
      isJumping.value = false;
      setTimeout(() => {
        isBobbing.value = false;
      }, 500);
    }, 1000);
  }
  
  // 새 대사로 말풍선 업데이트
  displayedText.value = "";
  typeText(randomResponse);
  
  // 주기적으로 원래 대사로 돌아감
  if (clickCount.value % 5 === 0) {
    setTimeout(() => {
      displayedText.value = "";
      typeText("계속 클릭하시면 더 많은 반응을 보여드릴게요!");
    }, 3000);
  }
};

// 버튼 텍스트 업데이트 함수
const updateButtonText = () => {
  const buttonTexts = [
    "캐릭터와 대화하기",
    "또 말 걸어보기",
    "한 번 더 대화하기",
    "계속 대화하기",
    "캐릭터 반응 보기"
  ];
  
  // 클릭 횟수에 따라 다른 텍스트 표시
  const index = clickCount.value % buttonTexts.length;
  buttonText.value = buttonTexts[index];
};

// 마침표, 쉼표 등에서 살짝 멈추는 타이핑 효과
const typeText = (text: string, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];
    
    // 현재 캐릭터가 마침표나 쉼표 또는 느낌표면 잠시 더 오래 멈춤
    const delay = text[index].match(/[.,!?]/) ? 400 : 
                 text[index].match(/[\s]/) ? 80 : 100;
    
    // 타이핑 중 캐릭터 움직임 효과 적용
    if (!isJumping.value && !isSpinning.value) {
      isBobbing.value = true;
    }
    
    setTimeout(() => {
      // 다음 글자로 이동
      typeText(text, index + 1);
    }, delay);
  } else {
    // 타이핑 완료
    isTyping.value = false;
    if (!isJumping.value && !isSpinning.value) {
      isBobbing.value = false;
    }
  }
};

// 말하는 중에 따옴표와 점 깜빡임 효과
const cursorVisible = ref(true);
setInterval(() => {
  if (isTyping.value) {
    cursorVisible.value = !cursorVisible.value;
  } else {
    cursorVisible.value = true; // 타이핑 끝나면 커서 고정
  }
}, 500);

// 타이핑 중 마지막에 커서 표시
const textWithCursor = computed(() => {
  if (isTyping.value && cursorVisible.value) {
    return displayedText.value + "|";
  }
  return displayedText.value;
});

// 🚀 "다음으로" 버튼 클릭 시 이동
const goToNext = () => {
  router.push("/play");
};

</script>

<template>
  <div class="container">
    <div class="character-wrapper">
      <!-- 말풍선 (페이드인 효과) -->
      <div
        v-if="showBubble"
        class="speech-bubble"
        :class="{ 'fade-in': showBubble, 'bubble-bounce': isJumping }"
      >
        <p>{{ textWithCursor }}</p>
      </div>
      
      <!-- 캐릭터 이미지 (클릭 가능, 다양한 애니메이션) -->
      <img
        src="/character.png"
        alt="Character"
        class="character"
        :class="{
          'bobbing': isBobbing,
          'jumping': isJumping,
          'spinning': isSpinning,
          'clickable': true
        }"
        @click="handleCharacterClick"
      />
      
      <!-- 항상 표시되는 대화 버튼 -->
      <button 
        class="chat-button" 
        @click="handleCharacterClick"
        :class="{ 'pulse': clickCount === 0 }"
      >
        {{ buttonText }}
      </button>

      <!-- 🚀 다음으로 버튼 -->
      <button v-if="showButton" class="next-button" @click="goToNext">다음으로 →</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
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
}

.character {
  width: 150px;
  height: auto;
  transition: transform 0.2s ease;
  margin-top: 30px;
  cursor: pointer;
}

.clickable:hover {
  filter: brightness(1.1);
  transform: scale(1.05);
}

/* 말하는 동안 캐릭터 미세 움직임 효과 */
.bobbing {
  animation: bobbing 0.5s infinite alternate ease-in-out;
}

/* 클릭 시 점프 효과 */
.jumping {
  animation: jump 1s ease-in-out;
}

/* 클릭 시 회전 효과 */
.spinning {
  animation: spin 1s ease-in-out;
}

/* 말풍선 스타일 */
.speech-bubble {
  position: relative;
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  max-width: 80vw;
  width: 280px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  white-space: normal;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  margin-bottom: 20px;
}

/* 말풍선 점프 효과 */
.bubble-bounce {
  animation: bubbleBounce 1s ease-in-out;
}

/* 말풍선 페이드인 효과 */
.fade-in {
  animation: fadeIn 0.6s forwards ease-out;
}

/* 텍스트가 한 줄로 길어지지 않도록 조정 */
.speech-bubble p {
  display: inline-block;
  text-align: center;
  line-height: 1.5;
  max-width: 100%;
}

/* 말풍선 꼬리 */
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

/* 대화 버튼 스타일 */
.chat-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.chat-button:hover {
  background-color: #333;
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.chat-button:active {
  transform: scale(0.95);
}

/* 처음 버튼에 주목 효과 */
.pulse {
  animation: buttonPulse 2s infinite;
}

/* 텍스트 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 캐릭터 말하는 애니메이션 */
@keyframes bobbing {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px);
  }
}

/* 점프 애니메이션 */
@keyframes jump {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

/* 스핀 애니메이션 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 말풍선 점프 애니메이션 */
@keyframes bubbleBounce {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

/* 버튼 펄스 애니메이션 */
@keyframes buttonPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(74, 74, 74, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 74, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 74, 74, 0);
  }
}

/* 🚀 다음으로 버튼 스타일 */
.next-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.next-button:hover {
  background-color: #45a049;
}
</style>