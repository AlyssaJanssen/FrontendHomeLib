<template>
  <div class="border border-gray-500 rounded dark:hover:bg-gray-700 hover:bg-gray-400">
    <RouterLink :to="{ name: 'Book', params: { id: book.id } }" class="link">
      <template v-if="volumeInfo.imageLinks" class="inline-block align-bottom">
        <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title" class="py-2 rounded inline-block align-bottom object-contain object-bottom h-52 w-42 " />
      </template>
      <template v-else>
        <img
          src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
          :alt="volumeInfo.title"
        />
      </template>
      <!--Book Title and Author here-->
      <div class="object-bottom align-bottom">
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
    </div>
    </RouterLink>
    
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