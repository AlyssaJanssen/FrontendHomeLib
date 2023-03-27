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
    };
    getBooks();
  },
  components: {
    Sidebar,
  },
};
</script>
<template>
  <Sidebar />
  <div>
    <div class="h-full max-w-5xl mx-auto container mb-16 pt-4 text-center">
      <h1 class="text-xl font-semibold font-serif"><span class="inline-flex justify-center items-center ml-4">
        <i class="fa-solid fa-book"></i>
      </span> My Library</h1>
      <div id="listBooks">
        <ul id="books" data-cy="books">
          <li
            v-for="(book, i) in this.books"
            :key="i"
            class="py-2 w-full border border-gray-500 rounded-lg p-2 my-1 hover:translate-y-0.5 transition duration-100 ease-in-out"
          >
            <div>
              <div class="flex">
                <RouterLink
                  :to="{ name: 'Book', params: { id: book.book_id } }"
                  class="link"
                >
                  <img
                    :src="book.image"
                    :alt="book.title"
                    title="Click to view details"
                    class="flex border border-gray-900 rounded-md hover:opacity-75"
                    width="100"
                    height="150"
                  />
                </RouterLink>
                <div class="grid">
                  <h4
                    class="text-xl text-sky-800 dark:text-sky-500 ml-4 mt-2 font-semibold font-serif v-cloak"
                  >
                    {{ book.title }}
                  </h4>
                  <p class="ml-4">
                    <span v-if="!book.authors">No authors to display</span>
                    <span class="" v-else>
                      By
                      <span
                        v-for="(author, index) in book.authors"
                        :key="index"
                      >
                        <em class="v-cloak">
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
            </div>
            <!-- <button type="button" class=" justify-end items-end bg-sky-700 rounded-lg text-sm py-2 px-2 "><i class="fa-solid fa-trash-can"></i> Delete </button> -->
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