<script>
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  data() {
    return {
      books: [],
    };
  },
  created() {
    const getBooks = async () => {
      try {
        const resp = await axios.get(`http://localhost:3000/api/v1/books`);
        this.books = resp.data;
        console.log("GET books success", this.books);
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
    async deleteBook(book_id) {
      // delete it from the books object
      let i = this.books.map((book) => book.book_id).indexOf(book_id); // delete book at that index so vue updates page
      this.books.splice(i, 1);
      let x = window.confirm("You want to delete the book?");
      console.log(book_id); // its getting the correct id to delete by
      if (x) {
        try {
          const resp = await axios
            .delete(`http://localhost:3000/api/v1/books/${book_id}`)
            .then((resp) => {
              console.log(resp);
              this.getBooks();
              console.log("deleted book by id:", book_id);
              alert("Book deleted!");
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
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
      <div class="grid grid-col-10">
        <ul id="books" data-cy="books">
          <li
            v-for="book in this.books"
            :key="book.book_id"
            class="py-2 w-full border border-gray-500 rounded-lg p-2 my-1 hover:translate-y-0.5 transition duration-100 ease-in-out"
          >
            <div class="grid grid-cols-8">
              <RouterLink
                :to="{ name: 'Book', params: { id: book.book_id } }"
                class="link"
              >
                <div class="col-span-2">
                  <img
                    :src="book.image"
                    :alt="book.title"
                    title="Click to view details"
                    class="flex border border-gray-900 rounded-md hover:opacity-75"
                    width="100"
                    height="150"
                  />
                </div>
              </RouterLink>
              <div class="grid grid-cols-8 col-span-6">
                <div class="col-span-8 v-cloak">
                  <h4
                    class="text-xl text-sky-800 dark:text-sky-500 ml-2 mt-4 font-semibold font-serif overflow-hidden justify-start text-left"
                  >
                    {{ book.title }}
                  </h4>

                  <p
                    class="text-sm ml-2 justify-start text-left text-ellipsis overflow-hidden"
                  >
                    <span v-if="!book.authors">No authors to display</span>
                    <span class="ml-0 justify-start text-left" v-else>
                      By
                      <span
                        v-for="(author, index) in book.authors"
                        :key="index"
                      >
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
              <div class="flex justify-end items-end">
                <button
                  class="inline-flex justify-center items-center bg-sky-800 rounded-lg text-sm py-2 px-2"
                  @click="deleteBook(book.book_id)"
                >
                  <i class="fa-solid fa-trash-can"> </i> Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 10vh;
  object-fit: fill;
  height: 15vh;
}
</style>
