<script>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "./firebase.config";

export default {
  data() {
    return {
      isDark: "",
    };
  },
  setup() {
    // Dark Mode: Detect in local storage
    // On page load or when changing themes
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");

    // // Top loading progress bar on initial page load
    // document.addEventListener("DOMContentLoaded", function () {
    //   let bar = document.getElementById("bar");
    //   bar.classList.remove("w-0");
    //   bar.classList.add("w-full");
    // });

    const store = useStore();
    //var user = firebase.auth().currentUser;

    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    return { user };
  },

  components: {
    Navigation,
    Footer,
    Sidebar
  },
};
</script>

<template>
  <!--Loading bar at top of page-->
  <!-- <div class="ml-0 h-1 relative w-full rounded-full overflow-hidden">
    <div class="w-full h-full bg-gray-200 absolute"></div>
    <div
      id="bar"
      class="transition-all ease-out duration-1000 h-full bg-indigo-500 relative w-0"
    ></div>
  </div> -->
<div>
  <div :class="isDark ? 'dark' : ''">
    <div class="bg-gray-300 text-black dark:bg-gray-800 dark:text-gray-100 ">
      <Navigation />
      <Sidebar v-if="user.isLoggedIn" />
      <div class="min-h-screen container mx-auto">
        <RouterView class="container justify-center items-center"/>
      </div>
      
      <Footer />
    </div>
  </div>
</div>
</template>
