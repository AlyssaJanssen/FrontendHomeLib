<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="bg-gray-200 dark:bg-gray-900 dark:text-white sm:justify-left w-full flex flex-wrap items-center justify-between py-4 shadow-2xl sticky top-0 z-20 ease-in-out duration-400 translate-y-0 navbar navbar-expand-lg navbar-light border border-gray-700"
  >
    <div
      class="container-fluid w-full flex flex-wrap items-center justify-between px-4 text-white"
    >
      <!-- Website Logo and Title w/ home link -->
      <RouterLink to="/" class="flex items-center hover:bg-blue-900 text-white">
        <img
          src="/book.png"
          alt="logo"
          style="width: 46px; height: 46px"
          class="mx-2"
        />
        <span class="font-bold text-xl font-sans text-black dark:text-white">HomeLib</span>
      </RouterLink>
      <!-- Left Navbar items -->
      <div class="mx-6 navbar-nav flex flex-col list-style-none mr-auto">
        <RouterLink
          to="/"
          class="flex items-center hover:bg-blue-900 text-white"
        >
          <span class="font-bold text-lg font-sans text-black dark:text-white">Home</span>
        </RouterLink>
      </div>
      <!-- Right Side Navbar items, login, join -->
      <div class="flex items-center relative text-white">
        <!--Dark mode toggle-->
        <div class="w-14 h-8">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            class="hidden"
            onchange="document.documentElement.classList.toggle('dark')"
          />
          <label
            for="dark-mode-toggle"
            class="w-full h-full bg-gray-400 dark:bg-gray-500 rounded-full p-1 flex justify-between cursor-pointer"
          >
            <span class="inline dark:hidden"></span>
            <span
              class="w-6 h-6 rounded-full bg-white text-gray-700 block float-right dark:float-left"
            ></span>
            <span class="hidden dark:inline transition ease-in-out duration-200"></span>
          </label>
        </div>

        <RouterLink
          to="/login"
          class="link ml-2 shadow-xl text-sm py-2 px-4 font-bold rounded bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300"
          >Login</RouterLink
        >
        <RouterLink
          to="/register"
          class="link shadow-xl text-sm mx-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
          >Join</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
<style></style>
