<template>
  <div>
    <div :class="isDark ? 'dark' : ''">
      <div
        class="bg-gradient-to-b from-gray-200 to-gray-400 text-black dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-700 dark:text-gray-100">
        <Navigation />
        <div class="min-h-screen container mx-auto">
          <RouterView />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
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
    // Dark Mode: Detect in local storage on page load or when changing themes
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
    const store = useStore();

    auth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch("fetchUser", user);
      }
    });
    const user = computed(() => {
      return store.getters.user;
    });
    return { user };
  },
  components: {
    Navigation,
    Footer,
    Sidebar,
  },
};
</script>