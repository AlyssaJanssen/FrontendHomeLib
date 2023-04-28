<template>
  <div class="text-end m-8 mb-16">
    <RouterLink to="#" title="Scroll to top"
      class="text-md transition px-3 py-2 bg-gray-400 dark:bg-gray-800 hover:opacity-50 hover:bg-gray-200 rounded-full">
      <i class="fa-solid fa-chevron-up"></i>
    </RouterLink>
  </div>
  <footer aria-label="Site Footer"
    class="bg-white z-40 dark:bg-gray-900 dark:text-white shadow-2xl lg:grid lg:grid-cols-5 border-t-2 border-t-gray-600">
    <!-- Website Logo and Title w/ home link -->
    <div v-if="user.isLoggedIn" class="mx-auto flex flex-col justify-center items-center p-4">
      <RouterLink to="/mylibrary" class="items-center">
        <img src="/book.png" alt="logo" style="width: 86px; height: 86px" class="mx-2" />
      </RouterLink>
    </div>
    <div v-else class="mx-auto flex flex-col justify-center items-center p-4">
      <RouterLink to="/" class="items-center">
        <img src="/book.png" alt="logo" style="width: 86px; height: 86px" class="mx-2" />
      </RouterLink>
    </div>
    <!--Right side footer links w/ social media-->
    <div class="px-8 py-12 sm:px-6 lg:col-span-3 lg:px-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p class="font-medium text-lg text-gray-900 dark:text-white">
              HomeLib
            </p>
            <i class="fa-solid fa-book mr-1 text-xl"> </i>
            <i class="fa-solid fa-mug-hot m-1 text-xl"></i>
            <i class="fa-solid fa-cat text-xl"></i>
            <nav aria-label="Footer Navigation - Company" class="mt-6">
              <ul class="space-y-4 text-sm">
                <li>
                  <div v-if="user.isLoggedIn">
                    <RouterLink to="/mylibrary" class="text-gray-900 dark:text-white transition hover:opacity-75">
                      Home
                    </RouterLink>
                  </div>
                  <div v-else>
                    <RouterLink to="/" class="text-gray-900 dark:text-white transition hover:opacity-75">
                      Home
                    </RouterLink>
                  </div>
                </li>
                <li>
                  <a href="/" class="text-gray-900 dark:text-white transition hover:opacity-75">
                    About
                  </a>
                </li>
                <li>
                  <a href="/search" class="text-gray-900 dark:text-white transition hover:opacity-75">
                    Discover
                  </a>
                </li>
                <li>
                  <a href="/" class="text-gray-900 dark:text-white transition hover:opacity-75">
                    Bestsellers
                  </a>
                </li>
                <li>
                  <RouterLink to="/register">
                    <button v-if="!user.isLoggedIn"
                      class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm bg-sky-600 border border-sky-500 text-white font-bold py-2 px-4 rounded-lg">
                      Sign Up
                    </button>
                  </RouterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="pt-12 mt-12 border-t border-gray-900 dark:border-white">
        <div class="sm:flex sm:items-center sm:justify-between">
          <nav aria-label="Footer Navigation - Support">
            <ul class="flex flex-wrap gap-4 text-xs">
              <li>
                <a href="#" class="text-gray-500 transition hover:opacity-75">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-500 transition hover:opacity-75">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
          <p class="mt-6 text-md text-gray-500 dark:text-white sm:mt-0">
            &copy; 2023 HomeLib LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "FooterComponent",
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.getters.user;
    });
    return { user };
  },
};
</script>
<style scoped>
footer,
div {
  position: relative;
  z-index: 1000;
}
</style>
