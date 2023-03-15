<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";

export default {
  name: "DashboardComponent",
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
  <div>
    <h1 class="container flex justify-center mt-8">
      Welcome to your dashboard
    </h1>
    <div v-if="user.isLoggedIn" class="text-center">
      <img
        src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
        class="mx-auto mb-4 w-32 rounded-lg"
        alt="Avatar"
      />
      <h5 class="mb-2 text-xl font-medium leading-tight">
        Welcome, {{ user.data.displayName }}
      </h5>

      <p class="text-neutral-500 dark:text-neutral-400">Home Lib user</p>
    </div>
  </div>
</template>
