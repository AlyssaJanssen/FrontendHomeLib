<script>
import axios from "axios";
export default {
  data() {
    return {
      book: null,
    };
  },
  created() {
    const sendGetReq = async () => {
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
    sendGetReq();
  },
};
</script>

<template>
  <div
    v-if="book"
    class="font-serif max-w-5xl mx-auto px-4 lg:px-0 py-4 mt-6 mb-44"
  >
    <div class="">
      <template v-if="book">
        <img
          :src="book.volumeInfo.imageLinks.thumbnail"
          :alt="book.volumeInfo.title"
          class="border inline-block border-gray-900 rounded"
          width="222"
          height="333"
        />
      
        <br> <br>
        <RouterLink
        to="/register"
        class="shadow-xl  text-sm bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
        >Add Book To Library</RouterLink
      >
        <!--Book Title and Author here-->
        <h4 class="mt-4 font-bold m-0 ">{{ book.volumeInfo.title }}</h4>
        <p>
          <span v-if="!book.volumeInfo.authors">No authors to display</span>
          <span v-else>
            By
            <span
              v-for="(author, index) in book.volumeInfo.authors"
              :key="index"
            >
              <em>
                {{
                  index + 1 !== book.volumeInfo.authors.length &&
                  index + 1 !== book.volumeInfo.authors.length - 1
                    ? author + ", "
                    : index + 1 == book.volumeInfo.authors.length &&
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
          <p v-html="book.volumeInfo.description"></p>
        </div>

      </template>
      <template v-else>
        <img
        src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
        :alt="book.volumeInfo.title"
        />
      </template>
    </div>
    <br>
   
  </div>
</template>
<style scoped>
img {
  width: 28vh;
  object-fit: fill;
  height: 35vh;
}
</style>