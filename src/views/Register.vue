<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "RegisterComponent",
  setup() {
    const email = ref("");
    const password = ref("");
    const name = ref("");
    const error = ref(null);
    const store = useStore();
    const router = useRouter();

    const Register = async () => {
      try {
        await store.dispatch("register", {
          email: email.value,
          password: password.value,
          name: name.value,
        });
        router.push("/home");
      } catch (err) {
        error.value = err.message;
        console.log(error);
      }
    };

    // const signInWithGoogle = () => {
    //   const provider = new GoogleAuthProvider();
    //   signInWithPopup(getAuth(), provider)
    //     .then((result) => {
    //       console.log(result.user);
    //       router.push("/dashboard");
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error);
    //     });
    // };

    return { Register, name, email, password, error };
  },
};
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center items-center mt-6">
    <a href="/">
      <img src="/book.png" alt="logo" style="width: 62px; height: 62px" />
    </a>
    <div
      class="w-full mt-4 mb-6 max-w-sm p-4 bg-white border border-gray-400 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700"
    >
      <form class="space-y-6" action="#" @submit.prevent="Register">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Join HomeLib
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 autofill:!bg-yellow-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            v-model="email" 
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            v-model="password"
            autocomplete="off"
          />
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your name</label
          >
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Enter name..."
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            v-model="name"
          />
        </div>
        <div v-if="error" class="text-yellow-400">{{ error }}</div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember me</label
            >
          </div>
          <a
            href="#"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Lost Password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-blue-800"
        >
          Join HomeLib
        </button>
        <!-- 
        <button
          @click="signInWithGoogle"
          class="w-full text-white bg-indigo-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-blue-800"
        >
          Sign in With Google
        </button> -->
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already a member?
          <RouterLink
            to="/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Login to your account</RouterLink
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
