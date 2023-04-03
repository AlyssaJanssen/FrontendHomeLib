import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config.js";
import HomePage from "../views/Home.vue";
import Book from "../views/Book.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Search from "../views/Search.vue";
import ClientHome from "../views/ClientHome.vue";
import MyLibrary from "../views/MyLibrary.vue";
import NotFound from "../views/NotFound.vue";
import ForgotPassword from "../views/forgotPassword.vue"
import EmailVerification from "../views/emailverification.vue"

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            // the home path has the BookList
            path: "/",
            name: "HomePage",
            component: HomePage,
        },
        {
            path: "/search",
            name: "Search",
            component: Search,
            meta: {
                requiresAuth: true,
            },
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
            path: "/home",
            name: "ClientHome",
            component: ClientHome,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/mylibrary",
            name: "MyLibrary",
            component: MyLibrary,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: "/:pathMatch(.*)",
            name: "not-found",
            component: NotFound
        },
        {
            path: "/forgotpassword",
            name: "forgotpassword",
            component: ForgotPassword,
            beforeEnter(to, from, next) {
                const user = auth.currentUser;
                if (user) {
                    next({ name: "home" });
                } else {
                    next();
                }
            },
        },
        {
            path: "/emailverification",
            name: "emailverification",
            component: EmailVerification,
        },
    ],
    // when users click links to home or top of page, then it scrolls smoothly instead of suddenly. This looks nicer.
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
    });
};

// Navigation Guards: this checks if user is authenticated to see the page
router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            // proceed to next route
            next();
        } else {
            alert("you dont have access!");
            next("/");
        }
    } else {
        next();
    }
});

export default router;