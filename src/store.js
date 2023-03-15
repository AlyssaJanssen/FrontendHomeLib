import { createStore } from "vuex";
//Firebase imports
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
        SET_LOGGED_IN(state, value) {
            state.user.isLoggedIn = value;
        },
        SET_USER(state, data) {
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
                context.commit("SET_USER", response.user);
                console.log(`User ${response.user.uid} created`);
                updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: "https://example.com/jane-q-user/profile.jpg",
                    })
                    .then(() => {
                        // Profile updated!
                        console.log(displayName);
                        // ...
                    })
                    .catch((error) => {
                        // An error occurred
                        console.log(error);
                        // ...
                    });
            } else {
                throw new Error("Unable to register user");
            }
        },

        async logIn(context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response) {
                context.commit("SET_USER", response.user);
            } else {
                throw new Error("login failed");
            }
        },

        async logOut(context) {
            await signOut(auth);
            context.commit("SET_USER", null);
        },

        async fetchUser(context, user) {
            context.commit("SET_LOGGED_IN", user !== null);
            if (user) {
                context.commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email,
                });
            } else {
                context.commit("SET_USER", null);
            }
        },
    },
});

// export the store
export default store;