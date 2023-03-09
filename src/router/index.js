import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Book from "../views/Book.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Dashboard from "../components/Dashboard.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            // the home path has the BookList
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/book/:id",
            name: "Book",
            component: Book,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/",
            name: "Dashboard",
            component: Dashboard,
        },
    ],
    scrollBehavior() {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
    }
});

export default router;