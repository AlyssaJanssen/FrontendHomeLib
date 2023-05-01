<template>
  <Sidebar />
  <div class="max-w-4xl mx-auto px-4 lg:px-0 py-4 h-full container pl-6 mt-2 mb-16 pt-10">
    <div v-if="book" class="grid col-span-3 mt-8">
      <template v-if="book">
        <div class="block sm:grid mx-auto ">
          <div class="ml-2">
            <a :href="volumeInfo.previewLink" target="_blank">
              <div v-if="volumeInfo.imageLinks">
              <img v-if="volumeInfo.imageLinks.thumbnail" :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title"
                title="Click to view preview on Google Books"
                class="border mx-auto container justify-center border-gray-900 rounded-md hover:opacity-75 grid sm:grid-cols-1 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8"
                width="300" height="200" />
              </div>
              <div v-else>
              <img src="https://books.google.co.kr/googlebooks/images/no_cover_thumb.gif" :alt="volumeInfo.title"
                title="Click to view preview on Google Books"
                class="border border-gray-900 rounded-md hover:opacity-75 grid sm:grid-cols-1 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8"
                width="300" height="200" />
              </div>
            </a>
            <p class="text-gray-900 dark:text-gray-400 mt-2 text-xs font-light mx-auto container text-center justify-center">
              Data from Google Books
            </p>
            <button @click="postBook"
              class="justify-center w-full shadow-xl mt-4 text-sm bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 border border-indigo-500 text-white font-bold py-1 px-2 rounded-md"
              v-if="!success">
              Add Book To Library
            </button>
          
            <!--TOAST CONFIRMATION-->
            <div v-if="success" class="grid mt-4">
              <div class="w-full grid mx-auto max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-700 dark:text-gray-400"
                role="alert">
                <div class="inline-flex">
                  <div
                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-400 bg-green-200 rounded-lg dark:bg-green-600 dark:text-green-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Check icon</span>
                  </div>
                  <div class="inline-flex text-sm">
                    <span class="p-2 text-sm justify-start items-start font-semibold text-gray-900 dark:text-white">Book
                      Added!</span>
                  </div>
                  <div class="inline-block">
                    <button type="button"
                      class="inline-flex justify-end items-end ml-5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                      data-dismiss-target="#toast-interactive" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-2 mx-2">
                  <RouterLink to="/mylibrary"
                    class="flex justify-center w-full shadow-xl mt-1 text-sm bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 border border-indigo-500 text-white font-bold py-1 px-2 rounded-md">
                    Go To Library
                  </RouterLink>
                  <RouterLink to="/search"
                    class="flex justify-center w-full shadow-xl mt-1 text-sm bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 border border-indigo-500 text-white font-bold py-1 px-2 rounded-md">
                    <span>
                      <i class="fa-solid fa-plus mr-1"></i>
                    </span>
                    <span>Add Books</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <a href="https://bookshop.org/pages/bookstores" target="_blank"
            class="flex justify-center mx-auto w-full container shadow-xl mt-1 text-sm bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 border border-indigo-500 text-white font-bold py-1 px-2 rounded-md">Support
            Local Bookshop</a>
          </div>
          <!-- Book description-->
          <div v-if="book" class="grid col-span-3 ml-4 mr-2">
            <!-- <p class="v-cloak">{{ volumeInfo.categories[0].toString() }}</p> -->
            <p class="v-cloak">{{ volumeInfo.publisher }}</p>
            <p class="v-cloak">{{ volumeInfo.publishedDate }}</p>
            <!--Book Title and Author here-->
            <h4 class="text-3xl font-semibold font-serif v-cloak">
              {{ volumeInfo.title }}
            </h4>
            <em class="font-light text-lg mb-4 v-cloak">{{
              volumeInfo.subtitle
            }}</em>
            <p>
              <span v-if="!volumeInfo.authors">No authors to display</span>
              <span class="" v-else>
                By
                <span v-for="(author, index) in volumeInfo.authors" :key="index">
                  <em class="v-cloak">
                    {{
                      index + 1 !== volumeInfo.authors.length &&
                      index + 1 !== volumeInfo.authors.length - 1
                      ? author + ", "
                      : index + 1 == volumeInfo.authors.length &&
                        index + 1 !== 1
                        ? " and " + author
                        : author
                    }}
                  </em>
                </span>
              </span>
            </p>
            <p v-html="volumeInfo.description"></p>
          </div>
          <div class="grid col-span-4"></div>
        </div>
      </template>
      <template v-else>
        <img src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="volumeInfo.title" />
      </template>
      <br />
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
import { auth } from "../firebase.config";
export default {
  data() {
    return {
      book: null,
      books: [],
      success: false,
      errorMsg: null,
      key: "",
      existsInDb: false,
    };
  },
  created() {
    const getBookById = async () => {
      const book_id = this.$route.params.id;
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${book_id}`
        );
        this.book = resp.data;
      } catch (err) {
        console.error(err);
      }
    };
    getBookById();
  },
  computed: {
    volumeInfo() {
      return this.book.volumeInfo;
    },
  },
  methods: {
    async postBook() {
      try {
        let date = new Date().toLocaleString("en-US");
        const idToken = await auth.currentUser.getIdToken(
          /* forceRefresh */ true
        );
        let currentUserId = auth.currentUser.uid;
        const resp = await axios.post(
          `https://backendhomelib-production.up.railway.app/api/v1/create/${currentUserId}`,
          {
            title: this.volumeInfo.title,
            authors: this.volumeInfo.authors,
            book_id: this.book.id,
            description: this.volumeInfo.description,
            image: this.volumeInfo.imageLinks.thumbnail,
            publisher: this.volumeInfo.publisher,
            publishedDate: this.volumeInfo.publishedDate,
            pageCount: this.volumeInfo.pageCount,
            dateAdded: date,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        this.success = true;
      } catch (error) {
        console.log(error);
        this.errorMsg = error;
      }
    },
  },
  components: {
    Sidebar,
  },
};
</script>
<style scoped>
img {
  width: 23vh;
  object-fit: fill;
  height: 32vh;
}
</style>
