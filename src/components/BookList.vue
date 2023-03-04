<template>
  <div class="bookListDisplay">
    <BookItem v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script>
import BookItem from "../components/BookItem.vue";

export default {
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
