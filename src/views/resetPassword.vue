<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      error: null,
      emailSent: false,
    };
  },
  methods: {
    sendResetEmail() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.emailSent = true;
          console.log("Password Reset Email sent!")
        })
        .catch((error) => {
          this.emailSent = false;
          this.error = error.message;
        });
    },
  },
};
</script>
<template>
  <div class="text-center container grid justify-center mt-20">
    <h1 class="text-2xl flex font-bold">Reset Your Password</h1>
    <form class="space-y-6" action="#" @submit.prevent="sendResetEmail">
      <div>
        <label
          for="email"
          class="flex mt-2 text-sm font-medium text-gray-900 dark:text-white items-start justify-start"
          >Email</label
        >
        <input
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-sky-700 focus:border-sky-300 dark:focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          placeholder="Enter Your HomeLib email"
          required
          v-model="email"
        />
        <button
          type="submit"
          class="w-full mt-2 text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-blue-800"
        >
          Send Password Reset Email
        </button>
        <div v-if="this.emailSent" class=" text-sm text-yellow-400 block w-72 p-2.5">
          <p>Check your email for reset instructions!</p>
        </div>
      </div>
    </form>
  </div>
</template>
