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
<template>
  <div class="text-end m-8 mb-16 ">
    <RouterLink
      to="#"
      title="Scroll to top"
      class="text-md transition px-3 py-2 bg-gray-400 dark:bg-gray-800 hover:opacity-50 hover:bg-gray-200 rounded-full"
    >
      <i class="fa-solid fa-chevron-up"></i>
    </RouterLink>
  </div>

  <footer
    aria-label="Site Footer"
    class="bg-white z-40 dark:bg-gray-900 dark:text-white shadow-2xl lg:grid lg:grid-cols-5 border-t-2 border-t-gray-600"
  >
    <!-- <div class="relative block h-32 lg:col-span-2 lg:h-full">
     <p class="m-32"></p>
      <div
        class="text-gray-400 dark:text-gray-600 flex-shrink-0 flex justify-center items-center rounded-full sm:mt-4 sm:mx-auto"
      >
        <svg class="fill-current w-24 h-24 sm:w-24 sm:h-24" viewBox="0 0 24 24">
          <path
            d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z"
          />
        </svg>
      </div>
    </div> -->
 <!-- Website Logo and Title w/ home link -->
 <div v-if="user.isLoggedIn" class="mx-auto flex flex-col justify-center items-center p-4">
  <RouterLink to="/home" class="items-center">
    <img
      src="/book.png"
      alt="logo"
      style="width: 86px; height: 86px"
      class="mx-2"
    />
  </RouterLink>
</div>
<div v-else class=" mx-auto flex flex-col justify-center items-center p-4">
  <RouterLink to="/" class="items-center">
    <img
      src="/book.png"
      alt="logo"
      style="width: 86px; height: 86px"
      class="mx-2"
    />
  </RouterLink>
</div>

    <!--Right side footer links w/ social media-->
    <div class="px-8  py-12 sm:px-6 lg:col-span-3 lg:px-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p class="font-medium text-lg text-gray-900 dark:text-white">HomeLib</p>
              <i class="fa-solid fa-book mr-1 text-xl"> </i>  <i class="fa-solid fa-mug-hot m-1 text-xl"> </i> 
              <i class="fa-solid fa-cat m-1 text-xl"> </i>
            <nav aria-label="Footer Navigation - Company" class="mt-6">
              <ul class="space-y-4 text-sm">
                <li>
                  <div v-if="user.isLoggedIn">
                    <RouterLink
                      to="/home"
                      class="text-gray-900 dark:text-white transition hover:opacity-75"
                    >
                      Home
                    </RouterLink>
                  </div>
                  <div v-else>
                    <RouterLink
                      to="/"
                      class="text-gray-900 dark:text-white transition hover:opacity-75"
                    >
                      Home
                    </RouterLink>
                  </div>
                </li>
                <li>
                  <a
                    href="/"
                    class="text-gray-900 dark:text-white transition hover:opacity-75"
                  >
                    About
                  </a>
                </li>
                 <li>
                  <a
                    href="/search"
                    class="text-gray-900 dark:text-white transition hover:opacity-75"
                  >
                    Discover
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    class="text-gray-900 dark:text-white transition hover:opacity-75"
                  >
                    Bestsellers
                  </a>
                </li>
                <li>
                  <RouterLink to="/register">
                    <button
                      v-if="!user.isLoggedIn"
                      class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
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
            &copy; 2023. Home Lib LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>

</template>