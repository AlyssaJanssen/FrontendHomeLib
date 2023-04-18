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
  <div class="mt-8 text-center container grid justify-center mx-auto max-w-6xl">
    <div>
      <h2 class="text-4xl font-semibold font-serif">
        Manage Your Home Library
      </h2>
      <h3 class="m-0 text-lg font-serif">
        Keep track of your home library, catalog the books you own, and track the ones you are currently borrowing and lending.
      </h3>
    </div>
    <br />
    <div>
      <RouterLink to="/register">
        <button
          v-if="!user.isLoggedIn"
          class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm mx-2 bg-sky-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Create Your Account
        </button>
      </RouterLink>

      <p
        v-if="!user.isLoggedIn"
        class="mt-2 text-xs font-serif dark:text-gray-300 font-extralight"
      >
        Sign up to start managing your library today.
      </p>
    </div>

    <section class="pt-2 ">
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-2 mx-auto"
      >
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-2xl h-full"
        >
          <span><i class="fa-regular fa-credit-card"></i></span>
          <h2 class="font-serif text-lg my-3">HomeLib is Completely Free</h2>
          <p class="text-gray-800 dark:text-gray-300">
            Keep track of everything in one place for free.
          </p>
        </div>
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-2xl  h-full"
        >
          <span><i class="fa-solid fa-book"></i></span>
          <h2 class="font-serif text-lg my-3">Catalog your Entire Library</h2>
          <p class="text-gray-800 dark:text-gray-300">
            Track every book you own in one place, including ones are currently being borrowed or lent.
          </p>
        </div>
        <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-2xl  h-full"
        >
          <span><i class="fa-solid fa-magnifying-glass"></i></span>
          <h2 class="font-serif text-lg my-3">Discover New Books to Read</h2>
          <p class="text-gray-800 dark:text-gray-300">
            Search for and find new books to read.
          </p>
        </div>
        <!-- <div
          class="text-center sm:text-left border border-gray-600 bg-gray-400 text-black dark:bg-gray-800 dark:text-gray-100 rounded-md p-6 shadow-2xl  h-full"
          style="opacity: 1; transform: none"
        >
          <span><i class="fa-solid fa-list"></i></span>
          <h2 class="font-serif text-lg my-3">
            Create custom reading lists.
          </h2>
          <p class="text-gray-800 dark:text-gray-300">
            Do you love fantasy? Sci-fi? Are you more of a Western fan? Keep all
            of your lists here.
          </p>
        </div> -->
      </div>
    </section>
<h1 class="mt-4 text-2xl font-serif"> Discover New Books With HomeLib</h1>
    <h2 class="text-xl font-semibold font-serif mt-4">
      NYT Bestselling Books This Week
    </h2>

    <div
      v-if="responseAvailable == true"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 mb-48"
    >
      <div v-for="(result, index) in results" v-bind:key="index" class="py-2">
        <p class="text-2xl font-semibold  dark:text-gray-300 items-start justify-start text-left v-cloak">#{{ result.rank }}</p>
        <p class="text-sm font-semibold  dark:text-gray-500 items-start justify-start text-left v-cloak">Weeks On The List: {{ result.weeks_on_list }}</p>
        <img
          :src="result.book_image"
          :alt="result.title"
          class="rounded-lg inline-block-2 border border-gray-500 fade-in"
    
        />
      </div>
    </div>
  </div>
</template>
<style>
.fade-in {
  animation: fadeIn ease 3s;
  -webkit-animation: fadeIn ease 3s;
  -moz-animation: fadeIn ease 3s;
  -o-animation: fadeIn ease 3s;
  -ms-animation: fadeIn ease 3s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

img {
  width: 28vh;
  object-fit: fill;
  height: 38vh;
}

</style>