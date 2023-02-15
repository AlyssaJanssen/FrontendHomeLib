<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add-book">Add Book</RouterLink>
      <RouterLink to="/books">Books</RouterLink>
    </nav>
   
 
    <RouterView />
  </template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0em;
  padding: 1em;;
  position: -webkit-sticky;
  background-color: black;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 0rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display:flex;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
