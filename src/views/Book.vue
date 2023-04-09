<script>
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
export default {
  data() {
    return {
      book: null,
      books: [],
      success: false,
      errorMsg: null,
      key: "",
    };
  },
  created() {
    const getBookById = async () => {
      const book_id = this.$route.params.id;
      try {
        const resp = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${book_id}`
        );
        console.log(resp.data);
        this.book = resp.data;
      } catch (err) {
        // Handle Error Here
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
        const resp = await axios.post(
          "http://localhost:3000/api/v1/book/create",
          {
            title: this.volumeInfo.title,
            authors: this.volumeInfo.authors,
            book_id: this.book.id,
            description: this.volumeInfo.description,
            image: this.volumeInfo.imageLinks.thumbnail,
            publisher: this.volumeInfo.publisher,
            publishedDate: this.volumeInfo.publishedDate,
            dateAdded: date,
          }
        );
        console.log("POST success", resp.data);
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
<template>
  <Sidebar />
  <div class="max-w-4xl mx-auto px-4 lg:px-0 py-4">
    <div v-if="book" class="grid col-span-3 mt-8">
      <template v-if="book">
        <div class="grid mx-auto">
          <div>
            <a :href="volumeInfo.previewLink" target="_blank">
              <img
                :src="volumeInfo.imageLinks.thumbnail"
                :alt="volumeInfo.title"
                title="Click to view preview on Google Books"
                class="border inline-block border-gray-900 rounded-md hover:opacity-75"
                width="300"
                height="200"
              />
            </a>
            <p class="text-gray-900 dark:text-gray-400 mt-2 text-xs font-light">
              Data from Google Books
            </p>

            <button
              @click="postBook"
              class="justify-center w-full shadow-xl mt-4 text-sm bg-gray-500 dark:bg-gray-700 hover:bg-gray-500 border-2 border-gray-500 text-white font-bold py-1 px-2 rounded-lg"
              v-if="!success"
            >
              Add Book To Library
            </button>

            <a
              href="https://bookshop.org/pages/bookstores"
              target="_blank"
              class="flex justify-center w-full shadow-xl mt-1 text-sm bg-gray-500 dark:bg-gray-700 hover:bg-gray-500 border-2 border-gray-500 text-white font-bold py-1 px-2 rounded-lg"
              >Support Local Bookshop</a
            >
            <!-- <a
              href="https://audible.com/"
              target="_blank"
              class="flex justify-center w-full shadow-xl mt-1 text-sm bg-gray-500 dark:bg-gray-700 hover:bg-gray-500 border-2 border-gray-500 text-white font-bold py-1 px-2 rounded-lg"
              >Listen to on Audible</a
            > -->

            <!--TOAST CONFIRMATION-->
            <div v-if="success" class="inline-flex mt-4">
              <div
                id="toast-interactive"
                class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-700 dark:text-gray-400"
                role="alert"
              >
                <div class="inline-flex">
                  <div
                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-400 bg-green-200 rounded-lg dark:bg-green-700 dark:text-green-200"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Check icon</span>
                  </div>

                  <div class="inline-flex text-sm">
                    <span
                      class="p-2 text-sm justify-start items-start font-semibold text-gray-900 dark:text-white"
                      >Book Added!</span
                    >
                  </div>

                  <button
                    type="button"
                    class="inline justify-end items-end ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-interactive"
                    aria-label="Close"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div class="mt-2">
                  <RouterLink
                    to="/mylibrary"
                    class="flex justify-center px-2 py-1.5 text-sm text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-blue-700"
                    >Go To Library</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Book description-->
          <div v-if="book" class="grid col-span-3 ml-4 p-4">
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
                <span
                  v-for="(author, index) in volumeInfo.authors"
                  :key="index"
                >
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
          <!-- <select name="shelfType"
          @change="postBook"
            class="form-control shadow-xl text-sm bg-gray-600 hover:bg-gray-500 border-2 border-gray-500 text-white font-bold py-2 px-2 rounded"
            v-model="key"
            v-if="!success">  
            <option value="1" class="bg-gray-700" selected> Want To Read</option>
            <option value="" class="bg-gray-700"> Currently Reading</option>
            <option value="" class="bg-gray-700"> Read</option>
            <option value="" class="bg-gray-700"> Did Not Finish</option>
            </select> -->

          <div class="grid col-span-4"></div>
        </div>
      </template>

      <template v-else>
        <img
          src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="volumeInfo.title"
        />
      </template>

      <br />
    </div>
  </div>
</template>
<style scoped>
img {
  width: 23vh;
  object-fit: fill;
  height: 32vh;
}
</style>
