<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router"; // 🚀 Vue Router 사용

const router = useRouter(); // 라우터 인스턴스 가져오기

// --------------------
// 1. 대사 관련 변수 및 초기화
// --------------------
const initialText = "어떤 말이든 들어줄게";
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

// 사용자가 하소연을 하면 캐릭터가 해줄 위로 멘트들 (원하는 만큼 추가/수정 가능)
const comfortingMessages = [
  "마음이 많이 힘드셨군요. 그래도 괜찮아요, 전 항상 여기 있어요!",
  "뭐든 잘 풀릴 거예요. 너무 걱정하지 마세요!",
  "조금 쉬어가도 괜찮아요. 힘든 걸 참고 견디는 것도 대단한 거랍니다.",
  "그래도 언젠가 좋은 날이 찾아올 거예요. 함께 힘내봐요!",
  "하루하루 버텨내느라 고생이 많아요. 조금만 더 힘내봐요!",
  "따라해봐. 어쩌라고!",
  "지금의 어려움도 결국 지나갈 거예요. 그때까지 조금만 더 힘을 내봐요.",
  "무슨 일이 있어도 넌 잘하고 있어요. 너무 자책하지 마세요.",
  "자신을 믿어요. 충분히 이겨낼 수 있어요.",
  "지금은 힘들어도 그 끝에는 빛이 있을 거예요. 함께 이겨내요.",
  "쉬어가며 조금씩 나아가면 돼요. 급할 거 없어요.",
  "마음껏 울어도 돼요. 그 후엔 다시 일어설 수 있을 거예요.",
  "한 발짝씩 나아가면 언젠가는 그 끝에 웃을 수 있어요.",
  "지금은 힘든 시간이지만, 더 나은 시간이 올 거예요. 조금만 더 기다려봐요."
];

// --------------------
// 2. 화면 표시/상태 관리용 ref
// --------------------
const displayedText = ref("");
const isTyping = ref(true);
const showBubble = ref(false);
const isBobbing = ref(false);
const isJumping = ref(false);
const isSpinning = ref(false);
const showButton = ref(true);
const clickCount = ref(0);

// 사용자 입력 관리용
const userInput = ref("");       // 사용자가 입력한 텍스트

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

// --------------------
// 3. 캐릭터 애니메이션 & 클릭 이벤트
// --------------------
const handleCharacterClick = () => {
  // 이미 애니메이션 중이면 무시
  if (isJumping.value || isSpinning.value) return;
  
  // 애니메이션 상태 활성화
  clickCount.value++;
  
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
    // 효과 3: 점프 + 밥(살짝 위아래 흔들)
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


// --------------------
// 4. 타이핑 효과 함수
// --------------------
const typeText = (text: string, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];
    
    // 현재 글자가 마침표/쉼표/느낌표 등이라면 조금 더 지연
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

// --------------------
// 5. 타이핑 시 커서 깜빡임
// --------------------
const cursorVisible = ref(true);
setInterval(() => {
  if (isTyping.value) {
    cursorVisible.value = !cursorVisible.value;
  } else {
    cursorVisible.value = true; // 타이핑이 끝나면 커서 고정
  }
}, 500);

const textWithCursor = computed(() => {
  if (isTyping.value && cursorVisible.value) {
    return displayedText.value + "|";
  }
  return displayedText.value;
});

// --------------------
// 6. 사용자 입력 처리
// --------------------
const handleUserSubmit = () => {
  if (!userInput.value.trim()) {
    return; // 빈 입력이면 무시
  }
  
  // 캐릭터가 새롭게 말풍선을 채울 수 있도록 초기화
  displayedText.value = "";
  isTyping.value = true;

  // 1) 입력 창 비우기
  userInput.value = "";
  
  // 2) "위로 멘트" 중 랜덤 골라서 타이핑
  const randomIndex = Math.floor(Math.random() * comfortingMessages.length);
  const response = comfortingMessages[randomIndex];
  
  // 실제 타이핑 시작
  typeText(response);
};

// --------------------
// 7. 페이지 이동 (다음으로 버튼)
// --------------------
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

      <!-- 사용자 텍스트 입력창 + 전송 버튼 -->
      <div class="input-area">
        <input
          type="text"
          v-model="userInput"
          placeholder="아무 말이나 하소연해보세요..."
          @keyup.enter="handleUserSubmit"
        />
        <button @click="handleUserSubmit">전송</button>
      </div>

      <!-- 🚀 다음으로 버튼 -->
      <button v-if="showButton" class="next-button" @click="goToNext">돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
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

/* 캐릭터 이미지 */
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

/* 캐릭터가 말하는 동안 미세 움직임 */
.bobbing {
  animation: bobbing 0.5s infinite alternate ease-in-out;
}

/* 캐릭터 점프 */
.jumping {
  animation: jump 1s ease-in-out;
}

/* 캐릭터 스핀 */
.spinning {
  animation: spin 1s ease-in-out;
}

/* 말풍선 */
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

/* 말풍선 올라오는 애니메이션 */
.bubble-bounce {
  animation: bubbleBounce 1s ease-in-out;
}

/* 말풍선 페이드인 효과 */
.fade-in {
  animation: fadeIn 0.6s forwards ease-out;
}

/* 말풍선 텍스트 */
.speech-bubble p {
  display: inline-block;
  text-align: center;
  line-height: 1.5;
  max-width: 100%;
}

/* 말풍선 꼬리 */
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

/* 입력창+전송 버튼 컨테이너 */
.input-area {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

/* 사용자 입력창 */
.input-area input {
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
}

/* 전송 버튼 */
.input-area button {
  padding: 10px 20px;
  background-color: #ff8e8e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}
.input-area button:hover {
  background-color: #ff6f6f;
}

/* 다음으로 버튼 */
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

/* 애니메이션 정의 */
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

@keyframes bobbing {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px);
  }
}

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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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
</style>
