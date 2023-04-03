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
        console.log(displayName);
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
<template>
  <Sidebar />
  <div>
    <div
      v-if="user.isLoggedIn"
      class="text-center container grid justify-center mt-20"
    >
      <div
        class=" text-white rounded-full border-4 border-gray-500 sm:mt-4 sm:mx-auto"
      >
        <!-- <svg class="fill-current w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 24 24">
            <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" />
        </svg> -->
        
        <div
          class="relative inline-flex items-center justify-center w-20 h-20 w-overflow-hidden bg-gray-300 rounded-full dark:bg-gray-700"
        >
        
        <RouterLink to="/profile">
            <span class="font-bold text-gray-500 text-2xl dark:text-gray-100">
              {{ getUserInitials(user.data.displayName) }}
            </span>
          </RouterLink>
        </div>
      </div>

      <h5 class="mt-2 text-xl font-medium leading-tight v-cloak">
         {{ user.data.displayName }}
      </h5>
      <p class="mt-2 text-xl font-medium leading-tight v-cloak">
        {{ user.data.email }}
     </p>
      <div class="m-2 items-end mx-auto justify-end">
        <a class="items-end text-sm gap-2 dark:bg-gray-600 py-1 px-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-800" href="/editprofile"><span class="">Edit</span></a>
      </div> 
    </div>
  </div>
</template>
