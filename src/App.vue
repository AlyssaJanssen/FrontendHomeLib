<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
//import BookList from './components/BookList.vue'

</script>

<template>
    <!-- <nav class="bg-gray-100 text-white flex sm:justify-left space-x-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add-book">Add Book</RouterLink>
      <RouterLink to="/books">Books</RouterLink>
    </nav> -->

    <Navigation />
    <RouterView /> <!--These are the page views-->
    <Footer />
  </template>
