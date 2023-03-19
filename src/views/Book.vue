<script>
import axios from "axios";
export default {
  data() {
    return {
      book: null,
      books: [],
      success: false,
      errorMsg: '',
      key: ""
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
        const resp = await axios.post("http://localhost:3000/api/v1/books", {
          title: this.volumeInfo.title,
          authors: this.volumeInfo.authors,
          description: this.volumeInfo.description,
          image: this.volumeInfo.imageLinks.thumbnail,
          publisher: this.volumeInfo.publisher,
          publishedDate: this.volumeInfo.publishedDate,
          dateAdded: date,
        });
        this.books.push(resp.data); // adds to Vues books[], vue is reactive and will update page. Not actually pushing?
        console.log("POST success", resp.data);
        this.success = true;
      } catch (error) {
        console.log(error);
        error = this.errorMsg;
      }
      // this is where you would clear the input if user is typing things into box on page
      // alert("Succesfully added book to the database!")
    },
  },
};
</script>

<template>
  <div class=" justify-center">
    <div
      v-if="book"
      class="font-serif container justify-center max-w-5xl mx-72 px-4 lg:px-0 py-4 mt-6 mb-44"
    >
      <div class="container">
        <template v-if="book">
          <a :href="volumeInfo.previewLink" target="_blank">
            <img
              :src="volumeInfo.imageLinks.thumbnail"
              :alt="volumeInfo.title"
              class="border inline-block border-gray-900 rounded"
              width="300"
              height="200"
            />
          </a>
          <br />
          <br />
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
            <button @click="postBook"
            class="form-control shadow-xl text-sm bg-gray-600 hover:bg-gray-500 border-2 border-gray-500 text-white font-bold py-2 px-2 rounded"
            v-if="!success">  Add Book To Library
            </button>
          <div v-if="success">
            <div id="toast-interactive" class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-700 dark:text-gray-400" role="alert">
              <div class="flex">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-400 bg-green-200 rounded-lg dark:bg-green-700 dark:text-green-200">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Check icon</span>
              </div>
                  <div class="ml-3 m-1 text-sm align-baseline">
                      <span class="mb-6 p-2 text-sm font-semibold text-gray-900 dark:text-white">Book Added To Library</span>
                      <div class="grid grid-cols-2 gap-2">  
                      </div>    
                    </div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                      <span class="sr-only">Close</span>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                  </div>
                  <div class="mt-4">
                      <RouterLink to="/mylibrary" class="flex justify-center px-2 py-1.5 text-sm text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-blue-800">Go To Library</RouterLink>
                  </div>
          </div>
          

          </div>
          <div v-else>
            <p> {{ errorMsg }} </p>
          </div>
          <p class="mt-2">{{ volumeInfo.categories[0].toString() }}</p>
          <p>{{ volumeInfo.publisher }}: {{ volumeInfo.publishedDate }}</p>
          <!--Book Title and Author here-->
          <h4 class="text-2xl font-bold">{{ volumeInfo.title }}</h4>
          <em class="font-light text-lg mb-4">{{ volumeInfo.subtitle }}</em>
          <p>
            <span v-if="!volumeInfo.authors">No authors to display</span>
            <span class="" v-else>
              By
              <span v-for="(author, index) in volumeInfo.authors" :key="index">
                <em>
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
          <!-- Book description-->
          <div v-if="book">
            <p v-html="volumeInfo.description"></p>
          </div>
        </template>
        <template v-else>
          <img
            src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
            :alt="volumeInfo.title"
          />
        </template>
      </div>
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
