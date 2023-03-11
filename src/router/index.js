import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            // this route requires authentication
            meta: {
                requiresAuth: true,
            },
        },
    ],
    scrollBehavior() {
        document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    },
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    })
}

router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("you dont have access!");
            next("/")
        }
    } else {
        next();
    }
});

export default router;