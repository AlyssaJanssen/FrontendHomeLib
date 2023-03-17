<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  setup() {},
  components: {
    Sidebar,
  },
};
</script>
<template>
  <div>
    <div class="grid mx-56 my-12">
       <h1 class=" my-2 text-xl font-semibold font-serif">Reading Goal</h1>
       <p>Set a reading Goal Now</p>
       <div>
         <form @submit.prevent="search" class="mx-auto container">
        <input
          type="number"
          placeholder="Enter # of books..."
          class="bg-white container dark:text-white dark:bg-transparent text-black w-3/12 border border-sky-600 py-2 px-2 rounded h-9 hover:border-sky-400"
          required
        />
        <button
          type="submit"
          class="link shadow-xl text-sm bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
        >
          Search
        </button>
        </form>
      </div>

       <h1 class=" my-2 text-xl font-semibold font-serif">Create a Reading List</h1>
       <button
       class=" w-1/12 shadow-xl text-sm bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
     >
       + New List
     </button>
    </div>
  </div>
</template>
