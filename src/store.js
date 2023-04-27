import { createStore } from "vuex";
import { auth } from "../src/firebase.config.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import axios from "axios";

const store = createStore({
    getters: {
        user(state) {
            return state.user;
        },
    },
    state: {
        user: {
            isLoggedIn: false,
            data: null,
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
            const resp = await createUserWithEmailAndPassword(auth, email, password);
            if (resp) {
                updateProfile(auth.currentUser, {
                        displayName: name,
                    })
                    .then(() => {
                        context.commit("setUser", resp.user);
                        // now send that newly registered user to be stored in the db
                        axios
                            .post("https://backendhomelib-production.up.railway.app/register", {
                                userId: resp.user.uid,
                                displayName: resp.user.displayName,
                                books: [],
                            })
                            .then(function(resp) {})
                            .catch(function(error) {
                                console.log(error);
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
            const resp = await signInWithEmailAndPassword(auth, email, password);
            if (resp) {
                context.commit("setUser", resp.user);
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