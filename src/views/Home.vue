<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";
import axios from "axios";

export default {
  data() {
    return {
      apiKey: "6vHwYKU4m6srA9NI1gXWwrFkVlnWfdQ7",
      responseAvailable: false,
      results: [],
    };
  },

  created() {
    this.responseAvailable = false;
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${this.apiKey}`
      )
      .then((response) => {
        console.log(response.data.results.books);
        this.results = response.data.results.books;
        // this.results.splice(10, 15)
        this.responseAvailable = true;
      });
  },

  //   computed: {
  //     bestSellers: function () {
  //       return this.responseAvailable
  //     },

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
  <div class="pt-8 text-center container grid justify-center mx-auto">
    <div>
      <h2 class="text-4xl font-semibold font-serif">
        Manage Your Home Library
      </h2>
      <h3 class="my-1 text-xl font-serif">
        Keep track of your home library, the books you own, your favorites, and
        personal readings lists.
      </h3>
    </div>
    <br />
    <div class="items-center justify-center text-center m-0">
      <RouterLink to="/register">
        <button
          v-if="!user.isLoggedIn"
          class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm mx-2 bg-blue-600 text-white font-bold py-4 px-4 rounded-md"
        >
          Create Your Account
        </button>
      </RouterLink>

      <p
        v-if="!user.isLoggedIn"
        class="my-2 text-sm font-serif dark:text-gray-300 font-extralight"
      >
        Sign up to start managing your library today.
      </p>
    </div>

    <section class="py-4">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-2 items-center justify-center mx-auto max-w-7xl"
      >
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-lg h-full"
        >
          <span><i class="fa-regular fa-credit-card"></i></span>
          <h2 class="font-serif text-xl my-3">HomeLib is Completely Free</h2>
          <p class="text-gray-800 dark:text-gray-400">
            Keep track of everything in one place, for free.
          </p>
        </div>
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-lg h-full"
        >
          <span><i class="fa-solid fa-book"></i></span>
          <h2 class="font-serif text-xl my-3">Catalog your Entire Library</h2>
          <p class="text-gray-800 dark:text-gray-400">
            Track every book you own, which ones you're currently reading, want
            to read, and did not finish.
          </p>
        </div>
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-lg h-full"
        >
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
          <h2 class="font-serif text-xl my-3">Discover New Books to Read</h2>
          <p class="text-gray-800 dark:text-gray-400">
            Search for and find new, bestselling books to read.
          </p>
        </div>
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-lg h-full"
          style="opacity: 1; transform: none"
        >
          <span><i class="fa-solid fa-list"></i></span>
          <h2 class="font-serif text-xl my-3">
            Create personalized reading lists.
          </h2>
          <p class="text-gray-800 dark:text-gray-400">
            Do you love fantasy? Sci-fi? Are you more of a Western fan? Keep all
            of your lists here.
          </p>
        </div>
      </div>
    </section>

    <h2 class="text-2xl font-semibold font-serif mt-8">
      Top NYT Bestselling Books
    </h2>

    <div
      v-if="responseAvailable == true"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 mb-48"
    >
      <div v-for="(result, index) in results" v-bind:key="index" class="py-2">
        <img
          :src="result.book_image"
          :alt="result.title"
          class="rounded-lg inline-block-2 border border-gray-500"
          height="300"
          width="200"
        />
      </div>
    </div>
  </div>
</template>
