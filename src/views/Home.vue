<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";

export default {
  setup() {
    const store = useStore();

    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    return { user };
  },
};
</script>

<template>
  <div class="pt-8  text-center container grid justify-center">
    <div>
      <h2 class="text-4xl font-semibold font-serif">
        Manage Your Home Library
      </h2>
      <h3 class="my-1 text-xl font-mono">
        Keep track of your home library, the books you own, your favorites, and
        personal readings lists.
      </h3>
    </div>
    <div class="mt-2 items-center text-center font-sans place-content-center">
      <ul class="list-disc text-left inline-block">
        <li>Catalog your home library</li>
        <li>Discover new books to read</li>
        <li>Create personal reading Lists</li>
        <li>HomeLib is entirely free</li>
      </ul>
    </div>
    <br />
    <div class="items-center justify-center text-center m-0">
      <RouterLink to="/register">
        <button
          v-if="!user.isLoggedIn"
          class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm mx-2 bg-blue-600 text-white font-bold py-2 px-2 rounded"
        >
          Create Your Account
        </button>
      </RouterLink>

      <p
        v-if="!user.isLoggedIn"
        class="my-2 text-sm dark:text-gray-300 font-extralight"
      >
        Sign up to start managing your library today.
      </p>
    </div>
  </div>
</template>
