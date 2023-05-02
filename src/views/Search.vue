<template>
  <Sidebar />
  <div class="container grid mt-2 mb-16 pt-4 text-center">
    <div class="mb-16 mx-auto pb-4 text-center my-12">
      <!--Search Bar w/ results-->
      <div class="mb-8 mx-auto mr-auto pb-2 my-2 container max-w-4xl">
        <h1 class="text-3xl font-semibold font-serif my-2">
          Search for Books to Add to your Library
        </h1>
        <form @submit.prevent="search" class="mx-auto container grid">
          <div class="justify-start items-start content-start">
            <input type="text" v-model="keyword" placeholder="Search for a book to add to your library"
              class="bg-white container dark:text-white dark:bg-transparent text-black w-9/12 border border-sky-600 py-2 px-2 rounded h-8 hover:border-sky-400"
              required />
            <button type="submit"
              class="link align-top shadow-xl text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-2 rounded">
              Search
            </button>
            <p class="text-gray-900 dark:text-gray-400 m-1 text-xs font-light">
              Search Results from Google Books
            </p>
          </div>
          <div>
            <select v-if="loadState == 'success'" name="order"
              class="dark:bg-gray-700  rounded-sm border border-gray-500 hover:border-sky-400"
              v-model="orderBy" @change="search">
              <option class="font-bold" value="relevance">most relevant</option>
              <option class="font-bold" value="newest">newest</option>
            </select>
          </div>
        </form>
      </div>
      <div class="mx-auto container items-center text-center xl:hidden max-w-4xl pl-6 mt-2 mb-2">
        <RouterLink to="/mylibrary"
          class="flex items-center p-2 mx-16 text-lg font-normal justify-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="inline-flex justify-center items-center ">
            <i class="fa-solid fa-book text-lg"></i>
          </span>
          <span class="ml-2">Go To Library</span>
        </RouterLink>
      </div>
      <div class="text-center px-2 pl-4 mr-8 container mx-auto flex flex-col justify-center items-center">
        <div role="status" v-if="loadState == 'loading'">
          <svg aria-hidden="true"
            class="inline w-14 h-14 text-gray-600 dark:fill-sky-600 animate-spin dark:text-gray-200 fill-sky-500"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
        </div>
        <BookList v-if="loadState == 'success'" :books="books"
          class="h-full font-bold text-black dark:bg-gray-800 dark:text-gray-100 p-0 mt-0 mb-60 mx-auto fade-in" />
      </div>
    </div>
  </div>
</template>
<script>
import BookList from "../components/BookList.vue";
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";

export default {
  data() {
    return {
      books: [],
      keyword: "",
      orderBy: "relevance",
      maxResults: "28",
      loadState: "",
      countryName: "US",
    };
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
  methods: {
    search() {
      // set URL to search/searchTerm=${this.keyword}
      //let newUrl = 
      //document.location.href = newUrl;
      let form = this;
      form.action = `${window.location.href}/searchTerm=${this.keyword}`;
      
      this.loadState = "loading";
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.keyword
          }&orderBy=${this.orderBy}&maxResults=${this.maxResults}&key=${import.meta.env.VITE_GOOGLE_BOOK_API_KEY
          }&country=${this.countryName}`
        )
        .then((response) => {
          this.books = response.data.items;
          this.loadState = "success";
        });
    },
  },
  components: {
    BookList,
    Sidebar,
  },
};
</script>