import { createStore } from "vuex";
import { auth } from "../src/firebase.config.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import axios from "axios";

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
                        // language code from users settings
                        user.languageCode = "it";
                        // const actionCodeSettings = {
                        //     url: `${import.meta.env.VITE_APP_HOST_NAME}/register/?email=${user.email}`,
                        // };
                        // send the signed in user a verification email
                        sendEmailVerification(user)
                            .then(function() {
                                // Verification email sent.
                                console.log("Verification Email sent!");
                            })
                            .catch(function(error) {
                                // Error occurred. Inspect error.code.
                                console.log(error);
                            });
                       // grab created users access token to send to server side for back end authentication
                        // let accessToken = user.getIdToken()
                        //     .then(function(token) {
                        //         accessToken = token;
                        //         console.log(accessToken);
                        //         // send to back end w/ axios
                        //         const res = axios.get(`http://localhost:3000/api/v1/books`, {
                        //             headers: {
                        //                 Authorization: `Bearer ${accessToken}`,
                        //             },
                        //         });
                        //         console.log(res.data)



                        //     });
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