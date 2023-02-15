import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddBookView from '../views/AddBookView.vue'
import BooksView from '../views/BooksView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/add-book',
            name: 'addBook',
            component: AddBookView
        },
        {
            path: '/books',
            name: 'Books',
            component: BooksView
        }
    ]
})

export default router