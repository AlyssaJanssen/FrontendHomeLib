<style>
body {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

<template>
  <div class="mb-20 h-full mx-auto container">
    <div class="pt-8 text-center">
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
        class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-sm mx-2 
        bg-blue-600 text-white font-bold py-2 px-2 rounded ">
        Create Your Account</button>
        </RouterLink>

      <p class="my-2 text-sm  dark:text-gray-300 font-extralight">
        Sign up to start managing your library today.
      </p>
    </div>
    <div class="mb-16 mx-auto pb-4 text-center">
      <!--Search Bar w/ results-->
      <div class="mb-16 mx-16">
        <form @submit.prevent="search" class="mx-auto container">
          <div>
            <input
              type="text"
              v-model="keyword"
              placeholder="Search for a book..."
              class="bg-white container dark:text-white dark:bg-transparent text-black w-4/12 border border-sky-600 py-2 px-2 rounded h-9 hover:border-sky-400"
              required
            />
            <button
              type="submit"
              class="link shadow-xl text-sm bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
            >
              Search
            </button>
          </div>
          <div>
            <select v-if="loadState == 'success'"
              name="order"
              class="inline-block rounded my-1 py-1 px-2 border border-gray-800 text-black  bg-gray-300  font-semibold hover:bg-slate-200"
              v-model="orderBy"
              @change="search"
            >
              <option class="font-bold" value="newest">newest</option>
              <option class="font-bold" value="relevance">most relevant</option>
            </select>
          </div>
        </form>
      </div>
      <div class="text-center container mx-auto flex flex-col justify-center items-center">
        <div role="status" v-if="loadState == 'loading'">
          <svg
            aria-hidden="true"
            class="inline w-14 h-14 text-gray-600 dark:fill-sky-600 animate-spin dark:text-gray-200 fill-sky-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>

        <BookList
          v-if="loadState == 'success'"
          :books="books"
          class="h-full font-bold text-black dark:bg-gray-800 dark:text-gray-100 p-0 mt-0 mb-60 mx-auto"
        />
      </div>
    </div>

    <a
      href="https://www.care.org/"
      target="_blank"
      class="hidden fixed lg:block z-30 bottom-8 right-8 bg-gray-300 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-800 border border-stone-300 dark:border-gray-700 dark:text-gray-200 rounded-lg px-2 py-1"
    >
      Support Ukraine</a
    >

  </div>
</template>
<script>
import BookList from "../components/BookList.vue";
import axios from "axios";


export default {
  data() {
    return {
      books: [],
      keyword: "",
      orderBy: "newest",
      maxResults: "20",
      loadState: "",
      countryName: "US",
      isLoggedIn: false,
 
    };
  },
  methods: {
    search() {
      this.loadState = "loading";
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${
            this.keyword
          }&orderBy=${this.orderBy}&maxResults=${this.maxResults}&key=${
            import.meta.env.VITE_GOOGLE_BOOK_API_KEY
          }&country=${this.countryName}`
        )
        .then((response) => {
          console.log(response.data.items);
          this.books = response.data.items;
          this.loadState = "success";
        });
    },
  },
  components: {
    BookList,
  },
};
</script>
