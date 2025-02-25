<script setup lang="ts">
import { ref, onMounted } from "vue";

// 대사 설정
const fullText = "안녕하세요! 저는 여러분의 가이드입니다.";
const displayedText = ref("");

// 한 글자씩 출력하는 함수
const typeText = (text: string, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];
    setTimeout(() => typeText(text, index + 1), 100); // 100ms 간격으로 출력
  }
};

// 페이지 로드 시 텍스트 출력 시작
onMounted(() => {
  typeText(fullText);
});
</script>

<template>
  <div class="container">
    <div class="character-wrapper">
      <img src="/character.png" alt="Character" class="character" />
      <div class="speech-bubble">
        <p>{{ displayedText }}</p>
      </div>
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
  max-width: 80vw; /* 기존 px 고정값 대신 반응형 너비 적용 */
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  white-space: normal; /* 글자가 자동으로 줄바꿈 되도록 설정 */
  word-wrap: break-word; /* 긴 단어도 줄바꿈 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 텍스트가 한 줄로 길어지지 않도록 조정 */
.speech-bubble p {
  display: inline-block;
  text-align: center;
  line-height: 1.5; /* 줄 간격 조정 */
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
</style>
