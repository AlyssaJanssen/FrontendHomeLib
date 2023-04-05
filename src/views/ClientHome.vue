<script>
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
export default {
  data() {
    return {
      cat: {},
      loaded: false,
      apiKey:
        "live_460IGO811RMIiHKFXbvL31CfONblDN5h7n6hYOVcOB1pnTAAfqX22mFJ5jG5f1ci",
    };
  },
  created() {
    // const getCuteCatPicture = async () => {
    //   try {
    //     const resp = await axios.get(
    //       `https://api.thecatapi.com/v1/images/search`
    //     );
    //     console.log(resp.data);
    //     this.cat = resp.data[0];
    //     this.loaded = true;
    //   } catch (err) {
    //     // Handle Error Here
    //     console.error(err);
    //   }
    // };

    // getCuteCatPicture();
  },
  components: {
    Sidebar,
  },
};
</script>
<template>
  <Sidebar />
  <div class="container items-center">
    <div class="h-full mx-auto container mb-16 pt-4 text-center">
      <h1 class="my-2 text-xl font-semibold font-serif">Yearly Reading Goal</h1>
      <p>Set a reading Goal Now</p>
      <div class="">
        <form @submit.prevent="search" class="mx-auto container">
          <input
            type="number"
            placeholder="Enter # of books..."
            class="bg-white container dark:text-white dark:bg-transparent text-black w-3/12 border border-sky-600 py-2 px-2 rounded h-9 hover:border-sky-400"
            required
          />
          <button
            type="submit"
            class="link shadow-xl text-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-2 rounded"
          >
            Enter
          </button>
        </form>
      </div>

 
      <div v-if="loaded">
        <img
          :src="cat.url"
          class="mt-4 border inline-block border-gray-900 rounded-md"  
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
img{
  width: 42vh;
  object-fit: fill;
  height: 32vh;
}
</style>
