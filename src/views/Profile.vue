<template>
  <Sidebar />
  <div>
    <div v-if="user.isLoggedIn" class="text-center container grid justify-center mt-12">
      <div class="mt-12">
        <div class="relative inline-flex border-4 border-gray-500 items-center justify-center w-20 h-20 w-overflow-hidden bg-gray-300 rounded-full dark:bg-gray-700">
            <span class="font-bold text-gray-700 text-2xl dark:text-gray-100">
              {{ getUserInitials(user.data.displayName) }}
            </span>
        </div>
      </div>

      <h5 class="mt-2 text-xl font-medium leading-tight v-cloak">
        {{ user.data.displayName }}
      </h5>
      <p class="mt-2 text-xl font-medium leading-tight v-cloak">
        {{ user.data.email }}
      </p>
      <div class="m-2 items-end mx-auto justify-end">
        <RouterLink to="/editprofile"
          class="flex items-center mt-4 px-2 py-1 text-base bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 border border-gray-500">
          <span class="inline-flex justify-center items-center">
            <i class="fa-solid fa-edit mr-1"></i>
            Edit
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../firebase.config";

export default {
  name: "ProfileComponent",
  setup() {
    const store = useStore();

    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    return { user };
  },
  components: {
    Sidebar,
  },
  methods: {
    getUserInitials: function (displayName) {
      if (displayName) {
        var parts = displayName.split(" ");
        var initials = "";
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0];
          }
        }
        return initials;
      }
    },
  },
};
</script>
