import { createStore } from "vuex";
import { auth } from "../src/firebase.config.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification
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
                        context.commit("setUser", response.user);
                        console.log(`User ${response.user.uid} created`);
                        // Now I have access to the signed in user
                        const user = auth.currentUser;
                        user.languageCode = 'it';
                        // const actionCodeSettings = {
                        //     url: `${import.meta.env.VITE_APP_HOST_NAME}/register/?email=${user.email}`,
                        // };
                        // send the signed in user a verification email
                        sendEmailVerification(user)
                            .then(function() {
                                // Verification email sent.
                                console.log("Verification Email sent!")
                            })
                            .catch(function(error) {
                                // Error occurred. Inspect error.code.
                                console.log(error)
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                throw new Error("Error registering new user");
            }
        },

        async login(context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response) {
                context.commit("setUser", response.user);
                console.log("Logged in successfully");
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