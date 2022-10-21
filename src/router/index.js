import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/Books.vue'
import BookDetail from '@/views/BookDetail.vue'

const routes = [
    {
      path: "/books",
      name: "Books",
      component: Books
  },
  {
    path: "/books/:bookId(\\d+)/:act?",
    name: "BookDetail",
    component: BookDetail    
  },
  { path: '/:pathMatch(.*)*', redirect: '/books' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
