<template>
  <Sidebar />
  <div>
    <div class="h-full max-w-4xl mx-auto container pl-6 mt-2 mb-16 pt-8 text-center">
      <h1 class="text-xl font-semibold font-serif">
        <span class="inline-flex justify-center items-center ml-4">
          <i class="fa-solid fa-book"></i>
        </span>
        My Library
      </h1>
      <!--Search Bar, searches books in database, reads one-->
      <div class="mr-auto mb-1 pb-2 my-2 items-start justify-start">
        <div class="flex justify-start items-start content-start w-full pr-6">
          <input type="text" v-model="searchTerm" placeholder="Search for a book in your library"
            class="bg-white dark:text-white dark:bg-transparent text-black border w-full border-sky-600 rounded h-9 hover:border-sky-400" />
          <button type="submit"
            class="inline-flex align-bottom bg-sky-600 hover:bg-sky-500 rounded-lg text-xs text-white py-3 px-2">
            <i class="fas fa-search mx-1"></i>
          </button>
        </div>
      </div>
      <div id="sort-bar">
        <label for="sortBy">Sort: </label>
        <select name="sortBy" id="select" v-model="this.sortBy"
          class=" dark:bg-gray-700  rounded-sm border border-gray-500 hover:border-sky-400">
          <option value="alphabetically">Alphabetically</option>
          <option value="pageCount">Page Count</option>
          <option value="publishedDate">Published Date</option>
          <option value="dateAdded">Date Added</option>
        </select>
        <button v-on:click="ascending = !ascending" class="ml-4">
          <i v-if="ascending" class="fa fa-sort-up"></i>
          <i v-else class="fa fa-sort-down"></i>
        </button>
      </div>
      <div class="mt-6 xl:hidden">
        <RouterLink to="/search"
          class="flex items-center justify-center p-2 mr-6 text-lg font-normal rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-plus text-lg"></i>
          </span>
          <span class="ml-2">Add Books</span>
        </RouterLink>
      </div>
      <h1 class="flex text-xl font-serif font-semibold text-gray-800 dark:text-sky-500">
        Owned Books: {{ this.count }}
      </h1>
      <div class="grid grid-col-10 mr-6">
        <ul class="">
          <li v-for="book in filteredBooks" :key="book.book_id"
            class="py-2 px-2 w-full border border-gray-500 rounded-md my-1 hover:translate-y-0.5 transition duration-100 ease-in-out">
            <div class="grid sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8">
              <RouterLink :to="{ name: 'Book', params: { id: book.book_id } }" class="link">
                <div class="col-span-2">
                  <img :src="book.image" :alt="book.title" title="Click to view details"
                    class="object-fill border border-gray-900 dark:border-gray-500 rounded-md hover:opacity-75" />
                </div>
              </RouterLink>
              <div class="grid grid-cols-8 col-span-6">
                <div class="col-span-8 v-cloak">
                  <h4
                    class="text-xl flex flex-col flex-wrap justify-between text-ellipsis text-gray-800 dark:text-sky-500 ml-2 font-bold font-serif overflow-hidden text-left">
                    {{ book.title }}
                  </h4>
                  <p class="text-md ml-2 justify-start text-left text-ellipsis overflow-hidden">
                    <span v-if="!book.authors">No authors to display</span>
                    <span class="ml-0 justify-start text-left" v-else>
                      By
                      <span v-for="(author, i) in book.authors" :key="i">
                          {{
                            i + 1 !== book.authors.length &&
                            i + 1 !== book.authors.length - 1
                            ? author + ", "
                            : i + 1 == book.authors.length && i + 1 !== 1
                              ? " and " + author
                              : author
                          }}
                      </span>
                    </span>
                  </p>
                  <p class="text-sm ml-2 justify-start text-left text-ellipsis overflow-hidden"> {{ book.pageCount }}
                    pages </p>
                  <p class="text-sm ml-2 justify-start text-left text-ellipsis overflow-hidden"> Year Published: {{
                    formatByYear(book.publishedDate) }} </p>
                    <p class="text-sm ml-2 justify-start text-left text-ellipsis overflow-hidden"> Date added: {{
                      displayDateAdded(book.dateAdded) }} </p>
                </div>
              </div>
              <div class="flex items-end">
                <button
                  class="flex justify-center items-center bg-sky-600 hover:bg-sky-500 rounded-lg text-sm text-white py-2 px-2 mt-2"
                  @click="deleteBook(book.book_id)">
                  <i class="fa-solid fa-trash-can mr-1"> </i> Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import "firebase/auth";
import { auth } from "../firebase.config";
import Sidebar from "../components/Sidebar.vue";
export default {
  data() {
    return {
      books: [],
      count: "",
      searchTerm: "",
      sortBy: "alphabetically",
      ascending: true,
    };
  },
  async created() {
    // sending ID token to the server for authentication, to test before getting users books
    const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
    const getBooks = async () => {
      try {
        let currentUserId = auth.currentUser.uid;
        // getting all books associated with the current user
        const resp = await axios.get(
          `https://backendhomelib-production.up.railway.app/api/v1/books/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        this.books = resp.data;
        this.count = this.books.length;
      } catch (error) {
        console.log(error);
      }
      return this.books;
    };
    getBooks();
  },
  components: {
    Sidebar,
  },
  computed: {
    filteredBooks() {
      let tempBooks = this.books;
      // search 
      if (this.searchTerm != "" && this.searchTerm) {
        tempBooks = tempBooks.filter((book) => {
          return book.title.toUpperCase().includes(this.searchTerm.toUpperCase());
        });
      }
      // Sort alphabetically by title
      tempBooks = tempBooks.sort((a, b) => {
        if (this.sortBy == 'alphabetically') {
          let fa = a.title.toLowerCase(), fb = b.title.toLowerCase()
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
          // else sort by pageCount
        } else if (this.sortBy == 'pageCount') {
          return a.pageCount - b.pageCount;
        }
        else if (this.sortBy == 'publishedDate') {
          return this.formatByYear(a.publishedDate) - this.formatByYear(b.publishedDate);
        }
        else if (this.sortBy == 'dateAdded') {
          return this.formatDateSortable(a.dateAdded) - this.formatDateSortable(b.dateAdded);
        }
      })

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        tempBooks.reverse();
      }
      return tempBooks;
    },
  },
  methods: {

    async getCurrBooks() {
      try {
        const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
        let currentUserId = auth.currentUser.uid;
        // getting all books associated with the current user
        const resp = await axios.get(
          `https://backendhomelib-production.up.railway.app/api/v1/books/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        this.books = resp.data;
        this.count = this.books.length;
      } catch (error) {
        console.log(error);
      }
      return this.books;
    },

    async deleteBook(book_id) {
      let currentUserId = auth.currentUser.uid;
      let x = window.confirm("Are you sure you want to delete this book?");
      if (x) {
        try {
          const idToken = await auth.currentUser.getIdToken(
            /* forceRefresh */ true
          );
          await axios.delete(
            `https://backendhomelib-production.up.railway.app/api/v1/books/${currentUserId}/${book_id}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          this.count--;
          await this.getCurrBooks();
        } catch (error) {
          console.log(error);
        }
      }
      return this.books;
    },
    formatByYear(date) {
      let formattedDate = new Date(date);
      return formattedDate.getFullYear();
    },
    formatDateSortable(date) {
      let formattedDate = new Date(date);
      return formattedDate;
    },
    displayDateAdded(date){
      let formattedDate = new Date(date);
      let year = formattedDate.getFullYear();
      let month = formattedDate.getMonth();
      let day = formattedDate.getDate();
      let fullDate = `${month}/${day}/${year}`;
      return fullDate;
    }
  },
};
</script>
<style scoped>
img {
  width: 13vh;
  object-fit: fill;
  height: 17vh;
}
</style>
