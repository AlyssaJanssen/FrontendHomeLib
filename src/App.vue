<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import {ref, computed }from 'vue'

const isDark = ref('');

</script>

<template>
  <div :class="isDark ? 'dark' : ''">
    <div class="bg-gray-300 text-black dark:bg-gray-800 dark:text-gray-100 ">

    <Navigation />
    <div class="min-h-screen">
    <RouterView />
  </div>
    <Footer />
  </div>
  </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
            body {
                background: #000;
            }
        }
        
        @media (prefers-color-scheme: light) {
            body {
                background: #fff;
            }
        }
</style>
