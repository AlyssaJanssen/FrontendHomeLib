<script>
import BookList from "../components/BookList.vue";
import axios from "axios";
export default {
  data() {
    return {
      books: [],
      keyword: "",
      orderBy: "newest",
      maxResults: "40",
      loadState: "",
      countryName: "US",
    };
  },
  methods: {
    search() {
      this.loadState = "loading";
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${
            this.keyword
          }&orderBy=${this.orderBy}&maxResults=${this.maxResults}&key=${
            import.meta.env.VITE_GOOGLE_BOOK_API_KEY
          }&country=${this.countryName}`
        )
        .then((response) => {
          console.log(response.data.items);
          this.books = response.data.items;
          this.loadState = "success";
        });
    },
  },
  components: {
    BookList,
  },
};
</script>

<template>
  <div class="">
    <div class="mx-auto py-10">
      <h2 class="text-4xl font-semibold font-serif">
        Manage Your Home Library
      </h2>
      <h3 class="text-lg font-mono">
        Keep track of your home library, the books you own, your favorites, and
        personal readings lists.
      </h3>
      <br />
      <RouterLink
        to="/register"
        class="link shadow-xl text-sm mx-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
        >Create Your Account</RouterLink
      >
    </div>
    <div class="mb-16 py-16">
      <!--Search Bar w/ results-->
      <div class="query">
        <form @submit.prevent="search">
          <div>
            <input
              type="text"
              v-model="keyword"
              placeholder="Search for a book..."
              class="bg-transparent text-white w-4/12 border border-sky-700 py-2 px-2 rounded"
              required
            />
            <button
              type="submit"
              class="text-md bg-blue-600 hover:bg-blue-800 text-white py-2 px-2 rounded"
            >
              Search
            </button>
          </div>
          <div>
            <label for="order">Order by</label>&nbsp;
            <select name="order" v-model="orderBy" @change="search">
              <option value="newest">newest</option>
              <option value="relevance">relevance</option>
            </select>
          </div>
        </form>
      </div>
      <div class="content text-center  mx-14">
        
        <div role="status"  v-if="loadState == 'loading'">
          <svg aria-hidden="true" class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>




        <BookList v-if="loadState == 'success'" :books="books" />
      </div>
    </div>
  </div>
</template>
<style>
body,
html {
  position: relative;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.content {
  position: relative;
}

.input {
  border: 1px solid #eee;
  height: 40px;
  padding: 0;
  margin: 0;
  padding-left: 15px;
  font-size: 18px;
}

.button {
  border: 0;
  padding: 0 10px;
  margin: 0;
  background: #2c3e50;
  color: white;
  box-shadow: 0 0 0 transparent;
  height: 40px;
  vertical-align: top;
}

select {
  display: inline-block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c3e50%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin-top: 15px;
}
select::-ms-expand {
  display: none;
}
select:hover {
  border-color: #888;
}
select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
select option {
  font-weight: normal;
}

.query {
  margin-bottom: 30px;
}

.bookListDisplay {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(332px, 1fr));
  grid-gap: 1rem;
}
</style>
