<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router"; // 🚀 Vue Router 사용

const router = useRouter(); // 라우터 인스턴스 가져오기

// 대사 설정
const fullText = "안녕하세요! 저는 여러분의 가이드입니다.";
const displayedText = ref("");
const isTyping = ref(true);
const showBubble = ref(false);
const isBobbing = ref(false);
const showButton = ref(false); // 🚀 버튼 표시 여부 추가

// 말풍선 표시 타이밍 컨트롤
onMounted(() => {
  setTimeout(() => {
    showBubble.value = true;
    setTimeout(() => {
      typeText(fullText);
    }, 300);
  }, 500);
});

// 타이핑 효과
const typeText = (text: string, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];

    const delay = text[index].match(/[.,!?]/) ? 400 : 
                 text[index].match(/[\s]/) ? 80 : 100;

    isBobbing.value = true;

    setTimeout(() => {
      typeText(text, index + 1);
    }, delay);
  } else {
    isTyping.value = false;
    isBobbing.value = false;
    showButton.value = true; // 🚀 타이핑 완료 후 버튼 표시
  }
};

// 말하는 중에 커서 깜빡임 효과
const cursorVisible = ref(true);
setInterval(() => {
  if (isTyping.value) {
    cursorVisible.value = !cursorVisible.value;
  } else {
    cursorVisible.value = true;
  }
}, 500);

// 커서 추가된 텍스트 표시
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
      <!-- 말풍선 -->
      <div v-if="showBubble" class="speech-bubble" :class="{ 'fade-in': showBubble }">
        <p>{{ textWithCursor }}</p>
      </div>

      <!-- 캐릭터 이미지 -->
      <img src="/character.png" alt="Character" class="character" :class="{ 'bobbing': isBobbing }" />

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
}

.bobbing {
  animation: bobbing 0.5s infinite alternate ease-in-out;
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

.fade-in {
  animation: fadeIn 0.5s forwards ease-out;
}

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
