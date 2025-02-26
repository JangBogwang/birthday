// 3. src/router/index.ts 파일 생성
import { createRouter, createWebHistory } from 'vue-router'
import Hello from '../views/Hello.vue'
import Play from '../views/Play.vue'
import Talk from '../views/Talk.vue'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/talk',
    name: 'Talk',
    component: Talk
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router