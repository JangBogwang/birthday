<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// 대사 설정
const fullText = "안녕하세요! 저는 여러분의 가이드입니다.";
const displayedText = ref("");
const isTyping = ref(true);
const showBubble = ref(false);
const isBobbing = ref(false);

// 말풍선 표시 타이밍 컨트롤
onMounted(() => {
  // 약간의 지연 후 말풍선 표시 (캐릭터가 먼저 보이게)
  setTimeout(() => {
    showBubble.value = true;
    // 말풍선이 나타난 후 텍스트 타이핑 시작
    setTimeout(() => {
      typeText(fullText);
    }, 300);
  }, 500);
});

// 마침표, 쉼표 등에서 살짝 멈추는 타이핑 효과
const typeText = (text: string, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];
    
    // 현재 캐릭터가 마침표나 쉼표 또는 느낌표면 잠시 더 오래 멈춤
    const delay = text[index].match(/[.,!?]/) ? 400 : 
                 text[index].match(/[\s]/) ? 80 : 100;
    
    // 타이핑 중 캐릭터 움직임 효과 적용
    isBobbing.value = true;
    
    setTimeout(() => {
      // 다음 글자로 이동
      typeText(text, index + 1);
    }, delay);
  } else {
    // 타이핑 완료
    isTyping.value = false;
    isBobbing.value = false;
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
</script>

<template>
  <div class="container">
    <div class="character-wrapper">
      <!-- 말풍선 (페이드인 효과) -->
      <div
        v-if="showBubble"
        class="speech-bubble"
        :class="{ 'fade-in': showBubble }"
      >
        <p>{{ textWithCursor }}</p>
      </div>
      
      <!-- 캐릭터 이미지 (말할 때 미세하게 움직임) -->
      <img
        src="/character.png"
        alt="Character"
        class="character"
        :class="{ 'bobbing': isBobbing }"
      />
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
  margin-top: 30px; /* 말풍선과 캐릭터 사이 간격 */
}

/* 말하는 동안 캐릭터 미세 움직임 효과 */
.bobbing {
  animation: bobbing 0.5s infinite alternate ease-in-out;
}

/* 말풍선 스타일 */
.speech-bubble {
  position: relative; /* absolute에서 relative로 변경 */
  background: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  max-width: 80vw;
  width: 280px; /* 고정 너비 설정 */
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
  margin-bottom: 20px; /* 말풍선과 캐릭터 사이 간격 */
}

/* 말풍선 페이드인 효과 */
.fade-in {
  animation: fadeIn 0.5s forwards ease-out;
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
</style>