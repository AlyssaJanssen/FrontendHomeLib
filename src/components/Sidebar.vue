<template>
  <div>
    <aside id="sidebar"
      class="hidden w-40 h-full text-white fixed inset-y-1 inset-x-0 z-0 overflow-x-hidden overflow-y-hidden shadow-2xl xl:block pt-28 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-700"
      aria-label="Sidebar">
      <div class="p-4 min-h-full px-3 pb-4 overflow-y-hidden bg-white dark:bg-gray-900">
        <ul class="space-y-2">
          <li>
            <RouterLink to="/mylibrary"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <span class="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-book"></i>
              </span>
              <span class="ml-3">My Library</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/search"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <span class="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-plus"></i>
              </span>
              <span class="ml-3">Add Books</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/profile"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              <span class="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-user"></i>
              </span>
              <span class="ml-3 ">Profile</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  name: "SidebarComponent",
};
</script>
<style scoped>
aside {
  z-index: 10;
}
</style>
