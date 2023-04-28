<template>
  <Sidebar />
  <div>
    <div class="h-full max-w-4xl mx-auto container pl-6 mt-2 mb-16 pt-4 text-center">
      <h1 class="text-xl font-semibold font-serif">
        <span class="inline-flex justify-center items-center ml-4">
          <i class="fa-solid fa-book"></i>
        </span>
        My Library
      </h1>
      <!--Search Bar, searches books in database, reads one-->
      <div class="mr-auto mb-2 pb-2 my-2 items-start justify-start">
        <form @submit.prevent="searchBooks()" class="justify-start items-start">
          <div class="flex justify-start items-start content-start w-full">
            <input type="text" required v-model="searchTerm" placeholder="Search for a book in your library..."
              class="bg-white dark:text-white dark:bg-transparent text-black border w-full border-sky-600 py-2 px-2 rounded h-8 hover:border-sky-400" />
            <button type="submit"
              class="inline-flex justify-center items-center bg-sky-600 hover:bg-sky-500 rounded-lg text-xs text-white py-2 px-2">
              <i class="fas fa-search mr-1"></i> Search
            </button>
          </div>
        </form>
      </div>
      <h1 v-if="!currSearching" class="flex text-lg font-serif font-semibold text-sky-600 dark:text-sky-500">
        Owned Books: {{ this.count }}
      </h1>
      <div class="mt-6 xl:hidden">
        <RouterLink to="/search"
          class="flex items-center p-2 text-lg font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-plus text-lg"></i>
          </span>
          <span class="ml-3">Add More Books</span>
        </RouterLink>
      </div>
      <h1 v-if="currSearching" class="flex text-lg font-medium text-sky-600 dark:text-sky-500">
        Search Result:
      </h1>
      <div class="grid grid-col-10">
        <ul>
          <li v-for="book in this.books" :key="book.book_id"
            class="py-2 w-full border border-gray-500 rounded-md p-2 my-1 hover:translate-y-0.5 transition duration-100 ease-in-out">
            <div class="grid sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8">
              <RouterLink :to="{ name: 'Book', params: { id: book.book_id } }" class="link">
                <div class="col-span-2">
                  <img :src="book.image" :alt="book.title" title="Click to view details"
                    class="object-fill border border-gray-900 dark:border-gray-500 rounded-md hover:opacity-75"
                    width="100" height="150" />
                </div>
              </RouterLink>
              <div class="grid grid-cols-8 col-span-6">
                <div class="col-span-8 v-cloak">
                  <h4
                    class="text-xl text-sky-600 dark:text-sky-500 ml-2 mt-4 font-semibold font-serif overflow-hidden justify-start text-left">
                    {{ book.title }}
                  </h4>

                  <p class="text-sm ml-2 justify-start text-left text-ellipsis overflow-hidden">
                    <span v-if="!book.authors">No authors to display</span>
                    <span class="ml-0 justify-start text-left" v-else>
                      By
                      <span v-for="(author, index) in book.authors" :key="index">
                        <em>
                          {{
                            index + 1 !== book.authors.length &&
                            index + 1 !== book.authors.length - 1
                            ? author + ", "
                            : index + 1 == book.authors.length &&
                              index + 1 !== 1
                              ? " and " + author
                              : author
                          }}
                        </em>
                      </span>
                    </span>
                  </p>
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
      book: null,
      count: "",
      searchTerm: "",
      currSearching: false,
      searchedBook: "",
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

  methods: {
    async searchBooks() {
      try {
        let currentUserId = auth.currentUser.uid;
        const idToken = await auth.currentUser.getIdToken(
          /* forceRefresh */ true
        );
        const resp = await axios.get(
          `https://backendhomelib-production.up.railway.app/api/v1/book/search/${currentUserId}/${this.searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        this.books = resp.data; // set all books = the one book so the array below displays the one book in books
        this.currSearching = true;
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
          let i = this.books.map((book) => book.book_id).indexOf(book_id); // delete book at that index so vue updates page
          this.books.splice(i, 1);
          this.count--;
          setTimeout(function () {
                            alert("Successfully deleted the book.");
                        }, 1);
        } catch (error) {
          console.log(error);
        }
      }
      return this.books;
    },
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
