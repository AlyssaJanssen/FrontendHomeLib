import { createStore } from "vuex";
import { auth } from "../src/firebase.config.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const store = createStore({
    state: {
        user: {
            isLoggedIn: false,
            data: null,
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setLoggedIn(state, value) {
            state.user.isLoggedIn = value;
        },
        setUser(state, data) {
            state.user.data = data;
        },
    },
    actions: {
        async register(context, { email, password, name }) {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (response) {
                updateProfile(auth.currentUser, {
                        displayName: name,
                    })
                    .then(() => {
                        console.log("Registered successfully, updated displayName")
                        context.commit("setUser", response.user);
                        console.log(`User ${response.user.uid} created`);

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                //dispatch.fetchUser(context, response) // gets the displayName on register to dashboard screen
                //console.log(this.displayName); // says not defined right after user registers but is fine on login
            } else {
                throw new Error("Error registering new user");
            }
        },

        async login(context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response) {
                context.commit("setUser", response.user);
                console.log("Logged in successfully")
            } else {
                throw new Error("Error logging in");
            }
        },

        async logout(context) {
            await signOut(auth);
            context.commit("setUser", null);
        },

        async fetchUser(context, user) {
            context.commit("setLoggedIn", user !== null);
            if (user) {
                context.commit("setUser", {
                    displayName: user.displayName,
                    email: user.email,
                });
            } else {
                context.commit("setUser", null);
            }
        },
    },
});

export default store;