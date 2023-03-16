<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-32 xl:mx-42 gap-2">
    <BookItem v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script>
import BookItem from "../components/BookItem.vue";

export default {
  name: "BookListComponent",
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  components: {
    BookItem,
  },
};
</script>