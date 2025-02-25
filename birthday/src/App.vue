<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* 전체 화면 크기 조정 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #dad4c4; /* 배경색 추가 */
}

/* 가운데 영역 */
.content {
  width: 90vw; /* 모바일에서 적절한 크기로 */
  max-width: 400px; /* 최대 너비 제한 */
  height: 80vh; /* 화면의 80% 크기 */
  background: #dad4c4;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  overflow: hidden;
}

/* 데스크탑 환경에서 효과 */
@media screen and (min-width: 768px) {
  .container {
    background-color: #dad4c4; /* 모바일이 아닐 때 배경색 변경 */
  }
}
</style>