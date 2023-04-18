<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from "../firebase.config";

export default {
  name: "NavbarComponent",
  setup() {
    const store = useStore();
    const router = useRouter();

    auth.onAuthStateChanged((user) => {
      // fetch from store when user has been authenticated
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      // update the user object from the store getters:
      return store.getters.user;
    });

    const signOut = async () => {
      await store.dispatch("logout");
      console.log("User signed out");
      router.push("/");
    };

    return { user, signOut };
  },
  methods: {
    getUserInitials: function(displayName) {
      if(displayName){
        var parts = displayName.split(" ");
        var initials = "";
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0];
          }
        }
        return initials;
    }
  }
  },


};
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-900 dark:text-white sm:justify-left w-full border border-gray-700 flex flex-wrap items-center justify-between py-4 shadow-xl sticky top-0 z-20 ease-in-out duration-400 translate-y-0 navbar navbar-expand-lg navbar-light"
  >
    <div
      class="container-fluid w-full flex flex-wrap items-center justify-between px-4 text-white"
    >
      <!-- Website Logo and Title w/ home link -->
      <div v-if="user.isLoggedIn">
        <RouterLink to="/home" class="flex items-center">
          <img
            src="/book.png"
            alt="logo"
            style="width: 46px; height: 46px"
            class="mx-2"
          />
          <span
            class="font-bold text-xl font-sans hover:text-gray-600 text-black dark:hover:text-white dark:text-gray-200"
            >HomeLib</span
          >
        </RouterLink>
      </div>
      <div v-else>
        <RouterLink to="/" class="flex items-center">
          <img
            src="/book.png"
            alt="logo"
            style="width: 46px; height: 46px"
            class="mx-2"
          />
          <span
            class="font-bold text-xl font-sans hover:text-gray-600 text-black dark:hover:text-white dark:text-gray-200"
            >HomeLib</span
          >
        </RouterLink>
      </div>

      <!-- Left Navbar items -->
      <div class="mx-6 navbar-nav flex flex-row list-style-none mr-auto">
        <!--Add new navbar items here-->
      </div>
      <!-- Right Side Navbar items, login, join -->
      <div class="flex items-center relative text-white">
        <!--Dark mode toggle switch-->
        <div class="w-12 h-5">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            class="hidden"
            onchange="document.documentElement.classList.toggle('dark')"
          />

          <label
            for="dark-mode-toggle"
            class="w-11 h-6 bg-gray-400 dark:bg-gray-600 rounded-full p-1 flex justify-between cursor-pointer"
          >
            <span class="inline dark:hidden"></span>
            <span
              class="w-4 h-4 rounded-full bg-white text-gray-700 block float-right dark:float-left"
            ></span>
            <span
              class="hidden dark:inline transition ease-in-out duration-200"
            ></span>
          </label>
        </div>

        <RouterLink
          to="/register"
          v-if="!user.isLoggedIn"
          class="shadow-xl text-sm ml-2 py-2 px-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg border border-sky-400"
          >Join</RouterLink
        >
        <RouterLink
          to="/login"
          class="ml-1 shadow-xl text-sm py-2 px-2 font-bold rounded-lg bg-indigo-500 hover:bg-indigo-400 border border-indigo-400 text-white transition duration-300"
          v-if="!user.isLoggedIn"
          >Login</RouterLink
        >

        <button
          class="link ml-1 shadow-xl text-sm py-2 px-2 font-bold rounded-lg bg-indigo-500 hover:bg-indigo-400 border border-indigo-400 text-white transition duration-300"
          @click="signOut"
          v-if="user.isLoggedIn"
        >
          Logout
        </button>

        <div
          v-if="user.isLoggedIn"
          class="relative inline-flex ml-1 items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full border-2 border-gray-500 dark:bg-gray-600"
        >
          <RouterLink to="/profile">
            <span class="font-medium text-gray-600 dark:text-gray-200">
              {{ getUserInitials(user.data.displayName) }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
