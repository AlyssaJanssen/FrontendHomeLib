<template>
  <div class="book-item border border-gray-500">
    <RouterLink :to="{ name: 'Book', params: { id: book.id } }" class="link">
      <template v-if="volumeInfo.imageLinks">
        <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title" />
      </template>
      <template v-else>
        <img
          src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="volumeInfo.title"
        />
      </template>
      <!--Book Title and Author here-->
      <h4>{{ volumeInfo.title }}</h4>
      <p>
        <span v-if="!volumeInfo.authors">No authors to display</span>
        <span v-else>
          By
          <span v-for="(author, index) in volumeInfo.authors" :key="index">
            <em>
              {{
                index + 1 !== volumeInfo.authors.length &&
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
    </RouterLink>
    <button
      class="text-sm items-center mx-2 my-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
    >
      Add Book
    </button>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    volumeInfo() {
      return this.book.volumeInfo;
    },
  },
};
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  margin-top: 0.5rem;
  width: 40%;
}
</style>
