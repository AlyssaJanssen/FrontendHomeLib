<template>
  <div class="flex flex-col justify-center items-center">
    <br />
    <form class="w-full max-w-sm">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Full Name
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Enter Full Name"
          />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            placeholder="**************"
          />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow-xl link text-sm mx-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
