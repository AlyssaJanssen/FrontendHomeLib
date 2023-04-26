<template>
  <div class="border border-gray-700 rounded dark:hover:bg-gray-700 hover:bg-slate-300 flex justify-center items-end ">
    <RouterLink :to="{ name: 'Book', params: { id: book.id } }" class="link">
      <div class="items-baseline align-bottom mx-6">
        <template v-if="volumeInfo.imageLinks">
          <img :src="volumeInfo.imageLinks.thumbnail" :alt="volumeInfo.title"
            class="rounded inline-block m-2 object-fill shadow-2xl" />
        </template>
        <template v-else>
          <img src="https://books.google.co.kr/googlebooks/images/no_cover_thumb.gif"
            class="rounded inline-block m-2 object-fill shadow-2xl" :alt="volumeInfo.title" />
        </template>
      </div>
      <!--Book Title and Author here-->
      <div class="flex flex-col ">
        <h3 class="text-lg flex flex-col h-14 justify-start text-ellipsis overflow-hidden">{{ volumeInfo.title }}</h3>
        <p class="text-sm flex flex-col h-10 justify-start m-2 text-ellipsis overflow-hidden">
          <span v-if="!volumeInfo.authors">No authors to display</span>
          <span v-else>
            By
            <span v-for="(author, index) in volumeInfo.authors" :key="index">
              <em class="v-cloak">
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
  name: "BookItemComponent",
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
  width: 18vh;
  object-fit: fill;
  height: 26vh;
}
</style>