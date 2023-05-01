<template>
    <Sidebar />
    <div
        class="text-start flex justify-start mt-16 border border-gray-600 h-full shadow-2xl max-w-3xl mx-auto mb-16 pt-6 pb-6">
        <div class="mt-4 w-9/12 mx-auto mb-4">
            <h1 class="text-2xl flex font-bold text-gray-800 dark:text-gray-300">
                Account Details
            </h1>
            <hr class="mt-2 mb-2 border-1 border-gray-700 dark:border-gray-400" />
            <!-- Form only holds inputs for email and displayName, to send them to be updated -->
            <form class="space-y-6 w-full" @submit.prevent="editUserAccount">
                <div>
                    <label for="username"
                        class="flex mt-4 text-md font-medium text-gray-900 dark:text-white items-start justify-start">Username</label>
                    <input type="username" name="username" id="username" autocomplete="displayName"
                        class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-sky-700 focus:border-sky-300 dark:focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
                        required v-model="displayName" />
                    <label for="email"
                        class="flex mt-4 text-md font-medium text-gray-900 dark:text-white items-start justify-start">Email</label>
                    <input type="email" name="email" id="email" autocomplete="email"
                        class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-sky-700 focus:border-sky-300 dark:focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
                        required v-model="email" />
                    <label for="password"
                        class="flex mt-4 text-md font-medium text-gray-900 dark:text-white items-start justify-start">Current
                        Password</label>
                    <input type="password" name="password" id="password"
                        class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-sky-700 focus:border-sky-300 dark:focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
                        required v-model="password" />
                    <button type="submit"
                        class="w-full mt-10 text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-1 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-sky-500">
                        Save Changes
                    </button>
                    <div v-if="this.err" class="text-sm text-yellow-400 block w-72 p-2.5">
                        <p>Error saving account details</p>
                    </div>
                </div>
            </form>
            <h1 class="text-xl mt-8 flex font-bold text-gray-800 dark:text-gray-300">
                Change Password
            </h1>
            <hr class="mt-2 mb-10 border-1 border-gray-700 dark:border-gray-400" />
            <RouterLink
                class="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-1 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-sky-500"
                to="/resetpassword">
                Change Password
            </RouterLink>
            <h1 class="text-xl mt-8 flex font-bold text-gray-800 dark:text-gray-300">
                Delete Account
            </h1>
            <hr class="mt-2 mb-4 border-1 border-gray-700 dark:border-gray-400" />
            <h1 class="text-lg mt-8 mb-2 text-gray-800 dark:text-gray-300">
                Deleting your account is <em><b>irreversible</b></em>.
            </h1>
            <button @click="deleteAccount" class="text hover:text-red-600 dark:hover:text-yellow-500 mt-4 font-semibold">
                Delete account
            </button>
        </div>
    </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";

import {
    updateProfile,
    updateEmail,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    data() {
        return {
            email: this.user.data.email,
            password: "",
            displayName: this.user.data.displayName,
            err: null,
        };
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const pushToHomePage = async () => {
            await router.push("/");
        };

        const pushToLogin = async () => {
            await router.push("/login");
        };

        auth.onAuthStateChanged((user) => {
            store.dispatch("fetchUser", user);
        });

        const user = computed(() => {
            return store.getters.user;
        });

        return { user, pushToHomePage, pushToLogin };
    },
    components: {
        Sidebar,
    },
    methods: {
        async deleteAccount() {
            let currentUserId = auth.currentUser.uid;
            let x = window.confirm(
                "Are you sure you wish to delete your account and remove all of your data from HomeLib? This can't be reversed!"
            );
            if (x) {
                try {
                    const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
                    await axios.delete(
                        `https://backendhomelib-production.up.railway.app/deleteuser/${currentUserId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    );
                    await this.pushToHomePage();
                } catch (error) {
                    console.log(error);
                }
                const user = auth.currentUser;
                deleteUser(user).then(() => {
                    setTimeout(function () {
                        alert("Account Successfully Deleted. Thank you for using HomeLib!");
                    }, 1);
                })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        async editUserAccount() {
            let currentUserId = auth.currentUser.uid;
            const idToken = await auth.currentUser.getIdToken( /* forceRefresh */ true);
            // update the displayname with the users input
            updateProfile(auth.currentUser, {
                displayName: this.displayName,
            }).then(() => {
                // now send that users updates to be stored in the db
                axios
                    .put(
                        `https://backendhomelib-production.up.railway.app/update/${currentUserId}/${this.displayName}`,
                        {
                            displayName: this.displayName,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    ).catch(function (error) {
                        console.log(error);
                    });
            }).catch((error) => {
                console.log(error);
            });
            const user = auth.currentUser;
            // need to reauthenticate user before updating email in Firebase
            const credential = EmailAuthProvider.credential(user.email, this.password)
            reauthenticateWithCredential(user, credential).then(() => {
                // User re-authenticated, now update email
                updateEmail(user, this.email)
                    .then(() => {
                        window.alert("Your account has been successfully updated!");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }).catch((error) => {
                console.log(error);
            });
        },
    },
};
</script>
